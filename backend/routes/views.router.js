import { Router } from "express";
import Producto from "../models/producto.model.js";
import Carrito from "../models/carrito.model.js";

const router = Router();

router.get("/", async (req, res) => {
  const productos = await Producto.find().lean();
  res.render("home", { productos });
});

router.get("/realtimeproducts", async (req, res) => {
  const productos = await Producto.find().lean();
  res.render("realTimeProducts", { productos });
});

router.get("/carrito", (req, res) => {
  res.render("carrito", { titulo: "Carrito" });
});

export default router;
