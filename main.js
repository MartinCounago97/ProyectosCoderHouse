// VARIABLES GLOBALES

let loginActual = null;

//FUNCIONES

function asignarCasoAProyecto(casoId, proyectoId) {
  const caso = casosDePrueba.find((c) => c.id === casoId);
  const proyecto = proyectos.find((p) => p.id === proyectoId);
  if (caso && proyecto) {
    caso.proyectoId = proyectoId;
    caso.setEstado("Asignado");
    proyecto.casosDePrueba.push(caso);
    alert("Caso asignado al proyecto correctamente");
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
