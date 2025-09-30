// VARIABLES GLOBALES

let loginActual = null;

//FUNCIONES

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
