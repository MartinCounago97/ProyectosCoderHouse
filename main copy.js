//btn.addEventListener("click", iniciar);
/*
function iniciar() {
  alert("BIENVENIDO AL SIMULADOR DE GESTIÓN DE PROYECTOS Y CASOS DE PRUEBA");

  if (login()) {
    localStorage.setItem("loginActual", JSON.stringify(loginActual));
    menu();
  } else {
    alert("No se pudo iniciar sesión. Saliendo del programa.");
  }
}*/

function login() {
  let username = prompt("Ingrese su nombre de usuario:");
  let password = prompt("Ingrese su contraseña:");
  if (username && password) {
    return autenticar(username, password);
  } else {
    alert("Credenciales incorrectas");
    return false;
  }
}

function autenticar(username, password) {
  let loginValido = logines.find(
    (l) => l.username === username && l.password === password
  );
  if (loginValido) {
    alert("BIENVENIDO " + loginValido.getCliente().nombre);
    loginActual = loginValido;
    return true;
  } else {
    alert("Credenciales incorrectas");
    return false;
  }
}

//FUNCIONES
function crearProyecto(nombre, descripcion) {
  if (!nombre || !descripcion) {
    alert("Nombre y descripción son obligatorios");
    return;
  }

  let proyecto = new Proyecto(proyectoId++, nombre, descripcion);

  proyectos.push(proyecto);
  localStorage.setItem("proyectos", JSON.stringify(proyectos));
  localStorage.setItem("proyectoId", proyectoId);
  alert("Proyecto creado correctamente");
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
  alert("Caso de prueba creado correctamente");
}

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

function listarProyectos() {
  if (proyectos.length == 0) {
    alert("No hay proyectos creados");
    return;
  }
  let listado = "Proyectos:\n";
  proyectos.forEach((p) => {
    listado += p.descripcionCompleta() + "\n";
  });
  alert(listado);
}

function listarCasos() {
  if (casosDePrueba.length == 0) {
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
      case "6":
        listarCasos();
        break;
      case "7":
        console.log("Saliendo...");
        break;
      default:
        console.log("Opción no válida");
    }
  } while (opcion !== "7");
}
