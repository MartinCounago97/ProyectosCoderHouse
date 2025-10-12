// ==== INICIALIZACIÓN DE DATOS ====
async function inicializarDatos() {
  try {
    // Leer datos locales
    const datosLocales = {
      usuarios: JSON.parse(localStorage.getItem("usuarios")) || [],
      proyectos: JSON.parse(localStorage.getItem("proyectos")) || [],
      casosDePrueba: JSON.parse(localStorage.getItem("casosDePrueba")) || [],
    };

    // Cargar datos del JSON
    const response = await fetch("../data/data.json");
    const datosJson = await response.json();

    // ---- Fusionar sin duplicar ----
    const fusionar = (local, json, clave) => {
      const clavesLocales = local.map((e) => e[clave]);
      const nuevos = json.filter((e) => !clavesLocales.includes(e[clave]));
      return [...local, ...nuevos];
    };

    const usuariosFusionados = fusionar(
      datosLocales.usuarios,
      datosJson.usuarios,
      "username"
    );
    const proyectosFusionados = fusionar(
      datosLocales.proyectos,
      datosJson.proyectos,
      "id"
    );
    const casosFusionados = fusionar(
      datosLocales.casosDePrueba,
      datosJson.casosDePrueba,
      "id"
    );

    // Guardar en localStorage
    localStorage.setItem("usuarios", JSON.stringify(usuariosFusionados));
    localStorage.setItem("proyectos", JSON.stringify(proyectosFusionados));
    localStorage.setItem("casosDePrueba", JSON.stringify(casosFusionados));

    // Actualizar contador de ID
    const maxId = Math.max(...casosFusionados.map((cp) => cp.id), 0);
    localStorage.setItem("casoId", maxId + 1);
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error al cargar datos",
      text: "No se pudieron obtener los datos del archivo JSON.",
      confirmButtonColor: "#d33",
    });
  }
}

// ==== FLUJO PRINCIPAL ====
inicializarDatos().then(() => {
  let casoId = parseInt(localStorage.getItem("casoId")) || 1;
  let casosDePrueba =
    JSON.parse(localStorage.getItem("casosDePrueba"))?.map((cp) => {
      let casoDePrueba = new CasoDePrueba(cp.id, cp.nombre, cp.descripcion);
      casoDePrueba.estado = cp.estado;
      casoDePrueba.proyectoId = cp.proyectoId || null;
      return casoDePrueba;
    }) || [];

  let form = document.getElementById("formCaso");
  let lista = document.getElementById("listaCasos");

  // ==== RENDERIZAR CASOS ====
  function renderizarCasos() {
    lista.innerHTML = "";

    const proyectosCaso = JSON.parse(localStorage.getItem("proyectos")) || [];

    casosDePrueba.forEach((c) => {
      const div = document.createElement("div");
      div.classList.add("caso");

      // Buscar proyecto asociado
      let proyectoNombre = "Sin proyecto";
      if (c.proyectoId != null) {
        const elProyecto = proyectosCaso.find(
          (p) => parseInt(p.id) === parseInt(c.proyectoId)
        );
        if (elProyecto) {
          proyectoNombre = elProyecto.nombre;
        }
      }

      div.innerHTML = `
        <strong>${c.nombre}</strong>
        <p>${c.descripcion}</p>
        <p>Estado: ${c.estado}</p>
        <p><em>Proyecto: ${proyectoNombre}</em></p>
      `;
      lista.prepend(div);
    });
  }

  // ==== CREAR NUEVO CASO ====
  function crearCasoDePrueba(nombre, descripcion) {
    if (!nombre || !descripcion) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Nombre y descripción son obligatorios",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    let casoDePrueba = new CasoDePrueba(casoId++, nombre, descripcion);
    casosDePrueba.push(casoDePrueba);

    localStorage.setItem("casosDePrueba", JSON.stringify(casosDePrueba));
    localStorage.setItem("casoId", casoId);
    renderizarCasos();
    form.reset();

    Swal.fire({
      icon: "success",
      title: "Caso de prueba creado",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  // ==== EVENTO DE FORMULARIO ====
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombreCaso").value;
    const descripcion = document.getElementById("descripcionCaso").value;
    crearCasoDePrueba(nombre, descripcion);
  });

  renderizarCasos();
});

// ==== OPCIONAL: REINICIAR DATOS ====
document.getElementById("resetDatos")?.addEventListener("click", () => {
  Swal.fire({
    title: "¿Reiniciar datos?",
    text: "Se borrarán todos los datos locales y se recargarán desde el JSON.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, reiniciar",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.clear();
      inicializarDatos().then(() => location.reload());
    }
  });
});
