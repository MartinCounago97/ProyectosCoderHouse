import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { create } from "express-handlebars";

import { connectDB } from "./config/db/connect.config.js";

import homeRouter from "./routes/home.router.js";
import userRouter from "./routes/usuario.router.js";
import viewsRouter from "./routes/views.router.js";
import carrito from "./routes/carrito.router.js";

import Producto from "./models/producto.model.js";

const app = express();
const port = 3000;

const server = http.createServer(app);
const io = new Server(server);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const hbs = create({ extname: ".handlebars" });
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use("/api", homeRouter);
app.use("/api/usuarios", userRouter);
app.use("/api/carritos", carrito);

app.use("/", viewsRouter);

// 404
app.use((req, res) => res.status(404).json({ error: "Not found" }));

io.on("connection", async (socket) => {
  const productos = await Producto.find().lean();
  socket.emit("productos:list", productos);

  socket.on("productos:create", async (payload) => {
    await Producto.create(payload);
    const updated = await Producto.find().lean();
    io.emit("productos:list", updated);
  });

  socket.on("productos:update", async ({ id, changes }) => {
    await Producto.findByIdAndUpdate(id, changes, { runValidators: true });
    const updated = await Producto.find().lean();
    io.emit("productos:list", updated);
  });

  socket.on("productos:delete", async (id) => {
    await Producto.findByIdAndDelete(id);
    const updated = await Producto.find().lean();
    io.emit("productos:list", updated);
  });
});

const startServer = async () => {
  try {
    console.log("Iniciando servidor...");
    await connectDB();
    server.listen(port, () => console.log(`API en http://localhost:${port}`));
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
    process.exit(1);
  }
};

startServer();
