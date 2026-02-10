const socket = io();
let username = null;
const hora = Date.now();
const fecha = new Date(hora);

Swal.fire({
  title: "Bienvenido al chat",
  input: "text",
  inputLabel: "Ingresa tu nombre de usuario",
  inputValidator: (value) => {
    if (!value) {
      return "Por favor, ingresa un nombre de usuario";
    }
  },
  allowOutsideClick: false,
}).then((result) => {
  username = result.value;
  socket.emit("join", username);
});

const chatForm = document.getElementById("chatForm");
const messageInput = document.getElementById("messageInput");
const messages = document.getElementById("messages");
const disconnectBtn = document.getElementById("disconnectBtn");

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (messageInput.value.trim()) {
    socket.emit("message", {
      username,
      message: messageInput.value,
    });
    messageInput.value = "";
  }
});

socket.on("message", (data) => {
  const li = document.createElement("li");
  li.innerHTML = `<strong>${data.username}:</strong> ${data.message}`;
  messages.appendChild(li);
});

disconnectBtn.addEventListener("click", () => {
  socket.disconnect();
  Swal.fire({
    title: "Desconectado",
    text: "Has sido desconectado del chat.",
    icon: "info",
    confirmButtonText: "Aceptar",
  });
  messageInput.value = "";
  messages.innerHTML = "";
});
