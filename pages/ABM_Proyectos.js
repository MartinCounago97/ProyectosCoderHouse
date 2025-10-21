let proyectoId = parseInt(localStorage.getItem("proyectoId")) || 1;
let proyectos = [];

const proyectosLocal =
  JSON.parse(localStorage.getItem("proyectos"))?.map((p) => {
    let proyecto = new Proyecto(p.id, p.nombre, p.descripcion);
    proyecto.casosDePrueba = p.casosDePrueba || [];
    return proyecto;
  }) || [];

const casosLocal = JSON.parse(localStorage.getItem("casosDePrueba")) || [];

fetch("../data/data.json")
  .then((response) => response.json())
  .then((data) => {
    const proyectosJSON = data.proyectos || [];
    const casosJSON = data.casosDePrueba || [];

    // 🔹 Función para fusionar sin duplicar
    const fusionar = (local, json, clave) => {
      const clavesLocales = local.map((e) => e[clave]);
      const nuevos = json.filter((e) => !clavesLocales.includes(e[clave]));
      return [...local, ...nuevos];
    };

    const proyectosFinales = fusionar(proyectosLocal, proyectosJSON, "id");
    const casosFinales = fusionar(casosLocal, casosJSON, "id");

    proyectos = proyectosFinales.map((p) => {
      let proyecto = new Proyecto(p.id, p.nombre, p.descripcion);
      proyecto.casosDePrueba = casosFinales.filter(
        (c) => parseInt(c.proyectoId) === parseInt(p.id)
      );
      return proyecto;
    });

    renderizarProyectos();
  })
  .catch((error) => {
    Swal.fire({
      icon: "error",
      title: "Error al cargar datos",
      text: "No se pudieron cargar los datos del archivo JSON.",
      confirmButtonColor: "#3085d6",
    });
    console.error(error);
  });

const formProyecto = document.getElementById("formProyecto");
const listaProyecto = document.getElementById("listaProyectos");
const filtroProyecto = document.getElementById("filtroProyecto");

function renderizarProyectos(listaProyectosRender = proyectos) {
  listaProyecto.innerHTML = "";
  listaProyectosRender.forEach((p) => {
    const div = document.createElement("div");
    div.classList.add("proyecto");

    div.innerHTML = `
      <strong>${p.nombre}</strong>
      <p>${p.descripcion}</p>
    `;

    const btnVerCasos = document.createElement("button");
    btnVerCasos.textContent = "Ver casos asignados";
    btnVerCasos.onclick = () => {
      mostrarCasosDeProyecto(p, "Asignado");
    };

    div.appendChild(btnVerCasos);

    const btnVerCasosCompletados = document.createElement("button");
    btnVerCasosCompletados.textContent = "Ver casos completados";
    btnVerCasosCompletados.onclick = () => {
      mostrarCasosDeProyecto(p, "Completado");
    };

    div.appendChild(btnVerCasosCompletados);

    const btnVerCasosFallidos = document.createElement("button");
    btnVerCasosFallidos.textContent = "Ver casos fallidos";
    btnVerCasosFallidos.onclick = () => {
      mostrarCasosDeProyecto(p, "Fallido");
    };

    div.appendChild(btnVerCasosFallidos);
    listaProyecto.prepend(div);
  });
}

function crearProyecto(nombre, descripcion) {
  if (!nombre || !descripcion) {
    Swal.fire({
      icon: "warning",
      title: "Campos incompletos",
      text: "Nombre y descripción son obligatorios",
      confirmButtonColor: "#3085d6",
    });
    return;
  }

  let proyecto = new Proyecto(proyectoId++, nombre, descripcion);
  proyectos.push(proyecto);

  localStorage.setItem("proyectos", JSON.stringify(proyectos));
  localStorage.setItem("proyectoId", proyectoId);
  renderizarProyectos();
  formProyecto.reset();

  Swal.fire({
    icon: "success",
    title: "Proyecto creado",
    text: "El proyecto se creó correctamente",
    timer: 2000,
    showConfirmButton: false,
  });
}

formProyecto.addEventListener("submit", (e) => {
  e.preventDefault();
  const nombre = document.getElementById("nombreProyecto").value;
  const descripcion = document.getElementById("descripcionProyecto").value;
  crearProyecto(nombre, descripcion);
});

function mostrarCasosDeProyecto(proyecto, elEstado) {
  if (!proyecto.casosDePrueba || proyecto.casosDePrueba.length === 0) {
    Swal.fire({
      icon: "info",
      title: "Sin casos de prueba",
      text: `El proyecto "${proyecto.nombre}" no tiene casos de prueba.`,
      confirmButtonColor: "#3085d6",
    });
    return;
  }

  // Filtrar los casos por estado
  const casosFiltrados = proyecto.casosDePrueba.filter(
    (c) => c.estado === elEstado
  );

  if (casosFiltrados.length === 0) {
    Swal.fire({
      icon: "info",
      title: "Sin casos en ese estado",
      text: `El proyecto "${proyecto.nombre}" no tiene casos con estado "${elEstado}".`,
      confirmButtonColor: "#3085d6",
    });
    return;
  }

  // Mapear correctamente a texto
  const casosTexto = casosFiltrados
    .map(
      (c, i) =>
        `${i + 1}. ${c.nombre || "Sin nombre"} - ${c.estado || "Sin estado"}`
    )
    .join("<br>");

  Swal.fire({
    title: `Casos de prueba (${elEstado}) del proyecto "${proyecto.nombre}"`,
    html: `<div style="text-align: left">${casosTexto}</div>`,
    icon: "info",
    confirmButtonText: "Cerrar",
    confirmButtonColor: "#3085d6",
    width: 600,
  });
}

// ==== FILTRO DE PROYECTOS ====
filtroProyecto.addEventListener("input", () => {
  const texto = filtroProyecto.value.toLowerCase();
  let proyectosFiltrados;

  if (texto.length >= 2) {
    proyectosFiltrados = proyectos.filter((p) =>
      p.nombre.toLowerCase().includes(texto)
    );
  } else {
    proyectosFiltrados = proyectos;
  }

  renderizarProyectos(proyectosFiltrados);
});
