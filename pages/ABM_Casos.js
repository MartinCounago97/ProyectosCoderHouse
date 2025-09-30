let casoId = parseInt(localStorage.getItem("casoId")) || 0;
let casosDePrueba =
  JSON.parse(localStorage.getItem("casosDePrueba"))?.map((cp) => {
    let casoDePrueba = new CasoDePrueba(cp.id, cp.nombre, cp.descripcion);
    casoDePrueba.estado = cp.estado;
    casoDePrueba.proyectoId = cp.proyectoId || null;
    return casoDePrueba;
  }) || [];

let form = document.getElementById("formCaso");
let lista = document.getElementById("listaCasos");

function renderizarCasos() {
  lista.innerHTML = "";
  casosDePrueba.forEach((c) => {
    const div = document.createElement("div");
    div.classList.add("caso");
    div.innerHTML = `<strong>${c.nombre}</strong><p>${c.descripcion}</p><p>Estado: ${c.estado}</p>`;
    lista.prepend(div);
  });
}

function crearCasoDePrueba(nombre, descripcion) {
  if (!nombre || !descripcion) {
    alert("Nombre y descripción son obligatorios");
    return;
  }
  let casoDePrueba = new CasoDePrueba(casoId++, nombre, descripcion);
  casosDePrueba.push(casoDePrueba);

  localStorage.setItem("casosDePrueba", JSON.stringify(casosDePrueba));
  localStorage.setItem("casoId", casoId);
  renderizarCasos();
  form.reset();
  alert("Caso de prueba creado correctamente");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nombre = document.getElementById("nombreCaso").value;
  const descripcion = document.getElementById("descripcionCaso").value;
  crearCasoDePrueba(nombre, descripcion);
});

renderizarCasos();
