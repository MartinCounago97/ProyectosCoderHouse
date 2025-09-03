// VARIABLES
let proyectoId = 1;
let casoId = 1;
let proyectos = [];
let casosDePrueba = [];

// CLASES
class Proyecto {
  constructor(id, nombre, descripcion) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.casosDePrueba = [];
  }

  descripcionCompleta() {
    return `${this.id} - ${this.nombre} - ${this.descripcion}`;
  }
}

class CasoDePrueba {
  constructor(id, nombre, descripcion) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.estado = "Pendiente";
    this.proyectoId = null;
  }

  actualizarEstado(nuevoEstado) {
    this.estado = nuevoEstado;
  }

  descripcionCompleta() {
    return `${this.id} - ${this.nombre} - ${this.descripcion} - Estado: ${this.estado}`;
  }
}

// FUNCIONES
function crearProyecto(nombre, descripcion) {
  const proyecto = new Proyecto(proyectoId, nombre, descripcion);
  proyectoId++;
  proyectos.push(proyecto);

  console.log("Proyecto creado:", proyecto);
  alert("Proyecto: " + proyecto.descripcionCompleta() + " creado con éxito");
  guardarDatos();
}

// Funciones de casos de prueba (quedan, no se usan desde HTML por ahora)
function crearCasoDePrueba(nombre, descripcion, proyectoId) {
  const casoDePrueba = new CasoDePrueba(casoId, nombre, descripcion);
  casoDePrueba.proyectoId = proyectoId;
  casoId++;

  casosDePrueba.push(casoDePrueba);
  const proyecto = proyectos.find((p) => p.id === proyectoId);
  if (proyecto) {
    proyecto.casosDePrueba.push(casoDePrueba);
  }
  alert(
    "Caso de prueba:" + casoDePrueba.descripcionCompleta() + "creado con éxito"
  );
  guardarDatos();
}

function asignarCasoAProyecto(casoId, proyectoId) {
  const caso = casosDePrueba.find((c) => c.id === casoId);
  const proyecto = proyectos.find((p) => p.id === proyectoId);
  if (caso && proyecto) {
    caso.proyectoId = proyectoId;
    proyecto.casosDePrueba.push(caso);
    guardarDatos();
  } else {
    alert("Caso o proyecto no encontrado");
  }
}

function mostrarResumenProyecto(proyectoId) {
  const proyecto = proyectos.find((p) => p.id === proyectoId);
  if (!proyecto) {
    alert("Proyecto no encontrado");
    return;
  }
  let resumen = `Proyecto: ${proyecto.nombre}\nDescripción: ${proyecto.descripcion}\n\nCasos:\n`;

  proyecto.casosDePrueba.forEach((caso) => {
    resumen += `${caso.descripcionCompleta()}\n`;
  });

  alert(resumen);
}

// ---------------- PERSISTENCIA ----------------
function guardarDatos() {
  localStorage.setItem("proyectos", JSON.stringify(proyectos));
  localStorage.setItem("casosDePrueba", JSON.stringify(casosDePrueba));
  localStorage.setItem("proyectoId", proyectoId);
  localStorage.setItem("casoId", casoId);
}

function cargarDatos() {
  proyectos = JSON.parse(localStorage.getItem("proyectos")) || [];
  casosDePrueba = JSON.parse(localStorage.getItem("casosDePrueba")) || [];
  proyectoId = parseInt(localStorage.getItem("proyectoId")) || 1;
  casoId = parseInt(localStorage.getItem("casoId")) || 1;
  console.log("Proyectos cargados:", proyectos);
  console.log("Casos cargados:", casosDePrueba);
}

// ---------------- EVENTOS ----------------
document.addEventListener("DOMContentLoaded", () => {
  cargarDatos();

  const formProyecto = document.getElementById("formProyecto");
  if (formProyecto) {
    formProyecto.addEventListener("submit", (e) => {
      e.preventDefault();
      const nombre = document.getElementById("nombreProyecto").value;
      const descripcion = document.getElementById("descripcionProyecto").value;
      crearProyecto(nombre, descripcion);

      formProyecto.reset();
    });
  }
});
