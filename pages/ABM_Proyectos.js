let proyectoId = parseInt(localStorage.getItem("proyectoId")) || 1;
let proyectos = [];

const proyectosLocal =
  JSON.parse(localStorage.getItem("proyectos"))?.map((p) => {
    let proyecto = new Proyecto(p.id, p.nombre, p.descripcion);
    proyecto.casosDePrueba = p.casosDePrueba || [];
    return proyecto;
  }) || [];

const casosLocal = JSON.parse(localStorage.getItem("casosDePrueba")) || [];

function actualizarEstadoCaso(idCaso, nuevoEstado) {
  let casos = JSON.parse(localStorage.getItem("casosDePrueba")) || [];
  let proyectos = JSON.parse(localStorage.getItem("proyectos")) || [];

  const caso = casos.find((c) => parseInt(c.id) === parseInt(idCaso));
  if (!caso) return;

  // Actualizar el estado
  caso.estado = nuevoEstado;

  // Si el nuevo estado es "Pendiente", eliminar relación con proyecto
  if (nuevoEstado === "Pendiente") {
    caso.proyectoId = null;

    // También quitarlo del array de casos del proyecto, si existiera
    proyectos.forEach((p) => {
      if (p.casosDePrueba) {
        p.casosDePrueba = p.casosDePrueba.filter(
          (cp) => parseInt(cp.id) !== parseInt(caso.id)
        );
      }
    });
  }

  // Guardar todo nuevamente
  localStorage.setItem("casosDePrueba", JSON.stringify(casos));
  localStorage.setItem("proyectos", JSON.stringify(proyectos));

  // Refrescar vista si aplica
  renderizarCasos();
}

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

    // 🟢 Ajustar el contador para evitar IDs duplicados
    const maxId = proyectos.length
      ? Math.max(...proyectos.map((p) => parseInt(p.id)))
      : 0;
    proyectoId = maxId + 1;
    localStorage.setItem("proyectoId", proyectoId);

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

  // Listado de casos con posibilidad de modificar su estado
  const casosHTML = casosFiltrados
    .map(
      (c, i) => `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <span>${i + 1}. <strong>${c.nombre}</strong> - ${c.estado}</span>
          <select id="estado-${c.id}" style="padding: 4px; border-radius: 6px;">
            <option value="">Cambiar estado...</option>
            <option value="Asignado">Asignado</option>
            <option value="Completado">Completado</option>
            <option value="Fallido">Fallido</option>
            <option value="Pendiente">Pendiente</option>
          </select>
        </div>
      `
    )
    .join("");

  Swal.fire({
    title: `Casos de prueba (${elEstado}) del proyecto "${proyecto.nombre}"`,
    html: `<div style="text-align: left">${casosHTML}</div>`,
    icon: "info",
    confirmButtonText: "Guardar cambios",
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#3085d6",
    width: 600,
    preConfirm: () => {
      // Recorrer los selects para ver si hubo cambios
      let cambios = 0;
      casosFiltrados.forEach((c) => {
        const nuevoEstado = document.getElementById(`estado-${c.id}`).value;
        if (nuevoEstado && nuevoEstado !== c.estado) {
          if (nuevoEstado === "Pendiente") {
            // Quitar del proyecto si pasa a Pendiente
            c.proyectoId = null;
          }
          c.estado = nuevoEstado;
          cambios++;
        }
      });

      if (cambios > 0) {
        // Guardar cambios en localStorage
        localStorage.setItem("proyectos", JSON.stringify(proyectos));
        const todosCasos = proyectos.flatMap((p) => p.casosDePrueba);
        localStorage.setItem("casosDePrueba", JSON.stringify(todosCasos));
      }

      return cambios;
    },
  }).then((result) => {
    if (result.isConfirmed && result.value > 0) {
      Swal.fire({
        icon: "success",
        title: "Cambios guardados",
        text: `${result.value} caso(s) actualizado(s) correctamente.`,
        timer: 2000,
        showConfirmButton: false,
      });
    } else if (result.isConfirmed) {
      Swal.fire({
        icon: "info",
        title: "Sin cambios",
        text: "No se modificó ningún estado.",
        timer: 1500,
        showConfirmButton: false,
      });
    }
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
