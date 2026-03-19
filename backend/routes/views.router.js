import { Router } from "express";
import Producto from "../models/producto.model.js";
import Carrito from "../models/carrito.model.js";

const router = Router();

router.get("/", async (req, res) => {
  const productos = (await Producto.find().lean()).map((p) => ({ ...p, _id: String(p._id) }));
  res.render("home", { productos });
});

router.get("/realtimeproducts", async (req, res) => {
  const productos = (await Producto.find().lean()).map((p) => ({ ...p, _id: String(p._id) }));
  res.render("realTimeProducts", { productos });
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/carrito", (req, res) => {
  res.render("carrito", { titulo: "Carrito" });
});

router.get("/ventas", (req, res) => {
  res.render("ventas");
});

export default router;
