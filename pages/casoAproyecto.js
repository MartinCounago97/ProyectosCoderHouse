let proyectos =
  JSON.parse(localStorage.getItem("proyectos"))?.map((p) => {
    let proy = new Proyecto(p.id, p.nombre, p.descripcion);
    proy.casosDePrueba = (p.casosDePrueba || []).map((c) => {
      let cp = new CasoDePrueba(c.id, c.nombre, c.descripcion);
      cp.estado = c.estado;
      cp.proyectoId = c.proyectoId || null;
      return cp;
    });
    return proy;
  }) || [];

let casosDePrueba =
  JSON.parse(localStorage.getItem("casosDePrueba"))?.map((c) => {
    let caso = new CasoDePrueba(c.id, c.nombre, c.descripcion);
    caso.estado = c.estado;
    caso.proyectoId = c.proyectoId != null ? c.proyectoId : null;
    return caso;
  }) || [];

let formulario = document.getElementById("formAsignarCaso");
let selectProyecto = document.getElementById("selectProyecto");
let selectCaso = document.getElementById("selectCaso");

function listarProyectos() {
  if (proyectos.length > 0) {
    selectProyecto.innerHTML += proyectos
      .map((p) => `<option value="${p.id}">${p.nombre}</option>`)
      .join("");
  }
}

function listarCasos() {
  let casosPendientes = casosDePrueba.filter((c) => c.estado === "Pendiente");

  if (casosPendientes.length > 0) {
    selectCaso.innerHTML =
      `<option value="" disabled selected>Seleccione un caso de prueba</option>` +
      casosPendientes
        .map((c) => `<option value="${c.id}">${c.nombre}</option>`)
        .join("");
  } else {
    selectCaso.innerHTML = `<option disabled selected>No hay casos sin asignar</option>`;
  }
}

function asignarCasoAProyecto(casoId, proyectoId) {
  const caso = casosDePrueba.find((c) => c.id === casoId);
  const proyecto = proyectos.find((p) => p.id === proyectoId);

  if (caso && proyecto) {
    caso.proyectoId = proyectoId;
    caso.setEstado("Asignado");
    proyecto.casosDePrueba.push(caso);
    localStorage.setItem("proyectos", JSON.stringify(proyectos));
    localStorage.setItem("casosDePrueba", JSON.stringify(casosDePrueba));
    formulario.reset();
    alert("Caso asignado al proyecto correctamente");
    listarCasos();
  } else {
    alert("Caso o proyecto no encontrado");
    formulario.reset();
  }
}

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  let proyectoId = parseInt(selectProyecto.value);
  let casoId = parseInt(selectCaso.value);
  asignarCasoAProyecto(casoId, proyectoId);
});

listarCasos();
listarProyectos();
