// ==== INICIALIZACIÓN DE DATOS ====
async function inicializarDatos() {
  try {
    const datosLocales = {
      usuarios: JSON.parse(localStorage.getItem("usuarios")) || [],
      proyectos: JSON.parse(localStorage.getItem("proyectos")) || [],
      casosDePrueba: JSON.parse(localStorage.getItem("casosDePrueba")) || [],
    };

    const response = await fetch("../data/data.json");
    const datosJson = await response.json();

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

    localStorage.setItem("usuarios", JSON.stringify(usuariosFusionados));
    localStorage.setItem("proyectos", JSON.stringify(proyectosFusionados));
    localStorage.setItem("casosDePrueba", JSON.stringify(casosFusionados));

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

// ==== VARIABLES ====
let form = document.getElementById("formCaso");
let lista = document.getElementById("listaCasos");
const filtroCasoInput = document.getElementById("filtroCaso");
const btnCasosSinAsignar = document.getElementById("casosSinAsignarBtn");

// ==== FLUJO PRINCIPAL ====
inicializarDatos().then(() => {
  let casoId = parseInt(localStorage.getItem("casoId")) || 1;
  let casosDePrueba =
    JSON.parse(localStorage.getItem("casosDePrueba"))?.map((cp) => {
      let caso = new CasoDePrueba(cp.id, cp.nombre, cp.descripcion);
      caso.estado = cp.estado;
      caso.proyectoId = cp.proyectoId || null;
      return caso;
    }) || [];

  // ==== RENDERIZAR CASOS ====
  function renderizarCasos(casos = casosDePrueba) {
    lista.innerHTML = "";

    const proyectosCaso = JSON.parse(localStorage.getItem("proyectos")) || [];

    casos.forEach((c) => {
      const div = document.createElement("div");
      div.classList.add("caso");

      let proyectoNombre = "Sin proyecto";
      if (c.proyectoId != null) {
        const elProyecto = proyectosCaso.find(
          (p) => parseInt(p.id) === parseInt(c.proyectoId)
        );
        if (elProyecto) proyectoNombre = elProyecto.nombre;
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

    let caso = new CasoDePrueba(casoId++, nombre, descripcion);
    casosDePrueba.push(caso);

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

  // ==== FILTRO AUTOMÁTICO ====
  filtroCasoInput.addEventListener("input", () => {
    const texto = filtroCasoInput.value.toLowerCase();
    let casosFiltrados;

    if (texto.length >= 2) {
      casosFiltrados = casosDePrueba.filter((c) =>
        c.nombre.toLowerCase().includes(texto)
      );
    } else {
      casosFiltrados = casosDePrueba;
    }

    renderizarCasos(casosFiltrados);
  });

  // ==== EVENTO DE FORMULARIO ====
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombreCaso").value;
    const descripcion = document.getElementById("descripcionCaso").value;
    crearCasoDePrueba(nombre, descripcion);
  });

  renderizarCasos();
});

// ==== BOTÓN CASOS SIN ASIGNAR ====
btnCasosSinAsignar.addEventListener("click", () => {
  const casosSinAsignar =
    JSON.parse(localStorage.getItem("casosDePrueba")) || [];
  const casosPendientes = casosSinAsignar.filter(
    (c) => c.estado === "Pendiente"
  );

  if (casosPendientes.length === 0) {
    Swal.fire({
      icon: "info",
      title: "No hay casos sin asignar",
      text: "Todos los casos de prueba están asignados a proyectos.",
      confirmButtonColor: "#3085d6",
    });
    return;
  }

  // Armar el listado en HTML
  const listado = casosPendientes
    .map((caso) => `<li><strong>${caso.nombre}</strong> (ID: ${caso.id})</li>`)
    .join("");

  Swal.fire({
    title: "Casos sin asignar",
    html: `<ul style="text-align:left;">${listado}</ul>`,
    icon: "warning",
    confirmButtonText: "Cerrar",
  });
});
