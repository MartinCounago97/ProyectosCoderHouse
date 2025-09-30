let btnLogin = document.getElementById("btnLogin");
let usernameInput = document.getElementById("inputUsuario");
let passwordInput = document.getElementById("inputPassword");

function ejecutarLogin() {
  let username = usernameInput.value;
  let password = passwordInput.value;
  if (login(username, password)) {
    localStorage.setItem("loginActual", JSON.stringify(loginActual));
    usernameInput.value = "";
    passwordInput.value = "";
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

function login(username, password) {
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
