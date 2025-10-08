let proyectoId = parseInt(localStorage.getItem("proyectoId")) || 1;
let proyectos =
  JSON.parse(localStorage.getItem("proyectos"))?.map((p) => {
    let proyecto = new Proyecto(p.id, p.nombre, p.descripcion);
    proyecto.casosDePrueba = p.casosDePrueba || [];
    return proyecto;
  }) || [];

const formProyecto = document.getElementById("formProyecto");
const listaProyecto = document.getElementById("listaProyectos");

function renderizarProyectos() {
  listaProyecto.innerHTML = "";
  proyectos.forEach((p) => {
    const div = document.createElement("div");
    div.classList.add("proyecto");

    div.innerHTML = `
      <strong>${p.nombre}</strong>
      <p>${p.descripcion}</p>
    `;
    const btnVerCasos = document.createElement("button");
    btnVerCasos.textContent = "Ver casos";
    btnVerCasos.onclick = () => {
      mostrarCasosDeProyecto(p);
    };

    div.appendChild(btnVerCasos);
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

function mostrarCasosDeProyecto(proyecto) {
  if (!proyecto.casosDePrueba || proyecto.casosDePrueba.length === 0) {
    Swal.fire({
      icon: "info",
      title: "Sin casos de prueba",
      text: `El proyecto "${proyecto.nombre}" no tiene casos de prueba.`,
      confirmButtonColor: "#3085d6",
    });
    return;
  }

  let casosTexto = proyecto.casosDePrueba
    .map(
      (c, i) => `${i + 1}. ${c.nombre || "Sin nombre"} - ${c.descripcion || ""}`
    )
    .join("<br>");

  Swal.fire({
    title: `Casos de prueba del proyecto "${proyecto.nombre}"`,
    html: `<div style="text-align: left">${casosTexto}</div>`,
    icon: "info",
    confirmButtonText: "Cerrar",
    confirmButtonColor: "#3085d6",
    width: 600,
  });
}

renderizarProyectos();
