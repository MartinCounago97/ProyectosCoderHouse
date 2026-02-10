import express from "express";
import { engine } from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";

import homeRouter from "./routes/home.router.js";
import uploadRouter from "./routes/upload.router.js";
import { Server } from "socket.io";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const PORT = 3030;
const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("🟢 Nuevo usuario conectado:", socket.id);

  socket.on("join", (username) => {
    socket.username = username;
    console.log(`👤 ${username} se unió al chat`);

    socket.broadcast.emit("message", {
      username: "Sistema",
      message: `${username} se unió al chat`,
    });
  });

  socket.on("message", (data) => {
    io.emit("message", data);
  });

  socket.on("disconnect", () => {
    if (socket.username) {
      io.emit("message", {
        username: "Sistema",
        message: `${socket.username} salió del chat`,
      });
    }
    console.log("🔴 Usuario desconectado");
  });
});

//Motor de plantillas
app.engine(
  "hbs",
  engine({
    extname: "hbs",
  })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

//Carpeta de archivos estaticos
app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Rutas
app.use("/", homeRouter);
app.use("/upload", uploadRouter);

//Seteo error 404
app.use((req, res) => {
  res.status(404).render("404", {
    title: "Error 404",
  });
});

httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
