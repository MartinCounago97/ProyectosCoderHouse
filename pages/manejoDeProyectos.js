let proyectoId = parseInt(localStorage.getItem("proyectoId")) || 0;
let proyectos =
  JSON.parse(localStorage.getItem("proyectos"))?.map((p) => {
    let proyecto = new Proyecto(p.id, p.nombre, p.descripcion);
    proyecto.casosDePrueba = p.casosDePrueba || [];
    return proyecto;
  }) || [];

const form = document.getElementById("formProyecto");
const lista = document.getElementById("listaProyectos");

function renderizarProyectos() {
  lista.innerHTML = "";
  proyectos.forEach((p) => {
    const div = document.createElement("div");
    div.classList.add("proyecto");
    div.innerHTML = `<strong>${p.nombre}</strong><p>${p.descripcion}</p>`;
    lista.prepend(div);
  });
}

function crearProyecto(nombre, descripcion) {
  if (!nombre || !descripcion) {
    alert("Nombre y descripción son obligatorios");
    return;
  }

  let proyecto = new Proyecto(proyectoId++, nombre, descripcion);
  proyectos.push(proyecto);

  localStorage.setItem("proyectos", JSON.stringify(proyectos));
  localStorage.setItem("proyectoId", proyectoId);
  renderizarProyectos();
  form.reset();
  alert("Proyecto creado correctamente");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nombre = document.getElementById("nombreProyecto").value;
  const descripcion = document.getElementById("descripcionProyecto").value;
  crearProyecto(nombre, descripcion);
});

renderizarProyectos();
