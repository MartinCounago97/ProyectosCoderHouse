let btnLogin = document.getElementById("btnLogin");
let usernameInput = document.getElementById("inputUsuario");
let passwordInput = document.getElementById("inputPassword");

// Ejecutar login (ahora async para poder await)
async function ejecutarLogin() {
  let username = usernameInput.value;
  let password = passwordInput.value;

  // esperá el resultado (login puede ser una promesa ahora)
  if (await login(username, password)) {
    localStorage.setItem("loginActual", JSON.stringify(loginActual));
    usernameInput.value = "";
    passwordInput.value = "";

    // Redirigir (ya esperamos al Swal en autenticar)
    window.location.href = "pages/inicio.html";
  } else {
    usernameInput.value = "";
    passwordInput.value = "";
  }
}

btnLogin.onclick = ejecutarLogin;
[usernameInput, passwordInput].forEach((input) => {
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      ejecutarLogin();
    }
  });
});

// login pasa a ser async y delega a autenticar
async function login(username, password) {
  if (username && password) {
    return await autenticar(username, password);
  } else {
    await Swal.fire({
      icon: "warning",
      title: "Campos incompletos",
      text: "Por favor, ingrese usuario y contraseña",
      confirmButtonColor: "#3085d6",
    });
    return false;
  }
}

// autenticar ahora espera al Swal antes de devolver el resultado
async function autenticar(username, password) {
  let loginValido = logines.find(
    (l) => l.username === username && l.password === password
  );

  if (loginValido) {
    loginActual = loginValido;

    // Espera aquí a que el SweetAlert termine (timer o cierre)
    await Swal.fire({
      icon: "success",
      title: "Login exitoso",
      text: "Bienvenido " + loginValido.getCliente().nombre,
      timer: 2000,
      showConfirmButton: false,
      timerProgressBar: true,
    });

    return true;
  } else {
    // Para credenciales incorrectas también esperamos el Swal
    await Swal.fire({
      icon: "warning",
      title: "Credenciales incorrectas",
      text: "Por favor, ingrese usuario y contraseña válidos",
      confirmButtonColor: "#3085d6",
    });
    return false;
  }
}
