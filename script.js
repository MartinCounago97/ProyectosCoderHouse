// VARIABLES GLOBALES
let proyectoId = 1;
let casoId = 1;
let proyectos = [];
let casosDePrueba = [];

//CLASES
class Proyecto {
  constructor(id, nombre, descripcion) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.casosDePrueba = [];
  }

  getCasos() {
    return this.casosDePrueba;
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

  getEstado() {
    return this.estado;
  }

  actualizarEstado(nuevoEstado) {
    this.estado = nuevoEstado;
  }

  descripcionCompleta() {
    return `${this.id} - ${this.nombre} - ${this.descripcion} - Estado: ${this.estado}`;
  }
}

//FUNCIONES
function crearProyecto(nombre, descripcion) {
  if (!nombre || !descripcion) {
    alert("Nombre y descripción son obligatorios");
    return;
  }
  let proyecto = new Proyecto(proyectoId, nombre, descripcion);
  proyectoId++;
  proyectos.push(proyecto);
}

function crearCasoDePrueba(nombre, descripcion) {
  if (!nombre || !descripcion) {
    alert("Nombre y descripción son obligatorios");
    return;
  }
  let casoDePrueba = new CasoDePrueba(casoId, nombre, descripcion);
  casoId++;
  casosDePrueba.push(casoDePrueba);
}

function asignarCasoAProyecto(casoId, proyectoId) {
  const caso = casosDePrueba.find((c) => c.id === casoId);
  const proyecto = proyectos.find((p) => p.id === proyectoId);
  if (caso && proyecto) {
    caso.proyectoId = proyectoId;
    proyecto.casosDePrueba.push(caso);
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

function listarProyectos() {
  if (proyectos.length === 0) {
    alert("No hay proyectos creados");
    return;
  }
  let listado = "Proyectos:\n";
  proyectos.forEach((proyecto) => {
    listado += proyecto.descripcionCompleta() + "\n";
  });
  alert(listado);
}

function listarCasos() {
  if (casosDePrueba.length === 0) {
    alert("No hay casos de prueba creados");
    return;
  }
  let lista = "Casos de pruebas:\n";
  casosDePrueba.forEach((caso) => {
    lista += caso.descripcionCompleta() + "\n";
  });
  alert(lista);
}

function menu() {
  let opcion;
  do {
    opcion = prompt(
      "Seleccione una opción:\n1. Crear Proyecto\n2. Crear Caso de Prueba\n3. Asignar Caso a Proyecto\n4. Mostrar Resumen de Proyecto\n5. Listado proyectos\n6. Listado casos\n7. Salir"
    );
    switch (opcion) {
      case "1":
        let nombreProyecto = prompt("Ingrese el nombre del proyecto:");
        let descripcionProyecto = prompt(
          "Ingrese la descripción del proyecto:"
        );
        crearProyecto(nombreProyecto, descripcionProyecto);
        break;
      case "2":
        let nombreCaso = prompt("Ingrese el nombre del caso de prueba:");
        let descripcionCaso = prompt(
          "Ingrese la descripción del caso de prueba:"
        );
        crearCasoDePrueba(nombreCaso, descripcionCaso);
        break;
      case "3":
        let idProyecto = parseInt(prompt("Ingrese el ID del proyecto:"));
        let idCaso = parseInt(prompt("Ingrese el ID del caso de prueba:"));
        asignarCasoAProyecto(idCaso, idProyecto);
        break;
      case "4":
        let idProj = parseInt(prompt("Ingrese el ID del proyecto:"));
        mostrarResumenProyecto(idProj);
        break;
      case "5":
        listarProyectos();
        break;
        break;
      case "6":
        listarCasos();
        break;
        break;
      case "7":
        console.log("Saliendo...");
        break;
      default:
        console.log("Opción no válida");
    }
  } while (opcion !== "7");
}

menu();
