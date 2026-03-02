import { Router } from "express";
import Carrito from "../models/carrito.model.js";
import Producto from "../models/producto.model.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const carrito = await Carrito.create({ productos: [] });
    res.status(201).json({ id: carrito._id });
  } catch (error) {
    res.status(500).json({ error: "Error al crear carrito" });
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const carrito = await Carrito.findById(req.params.cid)
      .populate("productos.producto")
      .lean();

    if (!carrito)
      return res.status(404).json({ error: "Carrito no encontrado" });

    res.json(carrito);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener carrito" });
  }
});

router.post("/:cid/productos/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const cantidadSolicitada = Number(req.body?.cantidad ?? 1);

    if (!Number.isFinite(cantidadSolicitada) || cantidadSolicitada < 1) {
      return res.status(400).json({ error: "Cantidad inválida" });
    }

    const prod = await Producto.findById(pid);
    if (!prod) return res.status(404).json({ error: "Producto no existe" });

    const carrito = await Carrito.findById(cid);
    if (!carrito) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    const item = carrito.productos.find((p) => p.producto.toString() === pid);

    const cantidadActual = item ? item.cantidad : 0;
    const nuevaCantidad = cantidadActual + cantidadSolicitada;

    if (nuevaCantidad > prod.stock) {
      return res.status(400).json({
        error: `Stock insuficiente. Stock disponible: ${prod.stock}. En carrito: ${cantidadActual}. Intentaste sumar: ${cantidadSolicitada}.`,
      });
    }

    if (item) item.cantidad = nuevaCantidad;
    else
      carrito.productos.push({ producto: pid, cantidad: cantidadSolicitada });

    await carrito.save();

    const populated = await Carrito.findById(cid)
      .populate("productos.producto")
      .lean();

    res.json(populated);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar producto" });
  }
});

router.delete("/:cid/productos/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const carrito = await Carrito.findById(cid);
    if (!carrito)
      return res.status(404).json({ error: "Carrito no encontrado" });

    carrito.productos = carrito.productos.filter(
      (p) => p.producto.toString() !== pid
    );

    await carrito.save();

    const populated = await Carrito.findById(cid)
      .populate("productos.producto")
      .lean();

    res.json(populated);
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar producto" });
  }
});

router.delete("/:cid", async (req, res) => {
  try {
    const carrito = await Carrito.findById(req.params.cid);
    if (!carrito)
      return res.status(404).json({ error: "Carrito no encontrado" });

    carrito.productos = [];
    await carrito.save();

    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: "Error al vaciar carrito" });
  }
});

export default router;
