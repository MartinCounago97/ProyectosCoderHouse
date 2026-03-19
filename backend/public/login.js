function mostrarError(msg) {
  const el = document.getElementById("msgError");
  el.textContent = msg;
  setTimeout(() => { el.textContent = ""; }, 4000);
}

document.getElementById("btnLogin").addEventListener("click", async () => {
  const username = document.getElementById("loginUsername").value.trim();
  if (!username) return mostrarError("Ingresá un username");

  try {
    const res = await fetch("/api/usuarios/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });

    if (!res.ok) {
      const data = await res.json();
      return mostrarError(data.error || "Usuario no encontrado");
    }

    const usuario = await res.json();
    localStorage.setItem("userId", usuario._id);
    localStorage.setItem("userName", usuario.username);
    window.location.href = "/";
  } catch (e) {
    mostrarError("Error de conexión");
  }
});

document.getElementById("btnRegistrar").addEventListener("click", async () => {
  const username = document.getElementById("regUsername").value.trim();
  const nombre = document.getElementById("regNombre").value.trim();
  const email = document.getElementById("regEmail").value.trim();

  if (!username || !nombre || !email) return mostrarError("Completá todos los campos");

  try {
    const res = await fetch("/api/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, nombre, email }),
    });

    if (!res.ok) {
      const data = await res.json();
      return mostrarError(data.error || "Error al crear cuenta");
    }

    const usuario = await res.json();
    localStorage.setItem("userId", usuario._id);
    localStorage.setItem("userName", usuario.username);
    window.location.href = "/";
  } catch (e) {
    mostrarError("Error de conexión");
  }
});
