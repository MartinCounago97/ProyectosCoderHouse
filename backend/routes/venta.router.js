import { Router } from "express";
import Venta from "../models/venta.model.js";
import Carrito from "../models/carrito.model.js";
import Producto from "../models/producto.model.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { carritoId, usuarioId } = req.body;

    if (!carritoId || !usuarioId) {
      return res
        .status(400)
        .json({ error: "carritoId y usuarioId son requeridos" });
    }

    const carrito = await Carrito.findById(carritoId).populate(
      "productos.producto"
    );

    if (!carrito)
      return res.status(404).json({ error: "Carrito no encontrado" });

    if (!carrito.productos.length)
      return res.status(400).json({ error: "El carrito está vacío" });

    const productos = carrito.productos.map((item) => ({
      producto: item.producto._id,
      cantidad: item.cantidad,
      precioUnitario: item.producto.precio,
    }));

    const total = productos.reduce(
      (sum, p) => sum + p.cantidad * p.precioUnitario,
      0
    );

    for (const item of carrito.productos) {
      const prod = await Producto.findById(item.producto._id);
      if (prod.stock < item.cantidad) {
        return res.status(400).json({
          error: `Stock insuficiente para "${prod.titulo}". Stock disponible: ${prod.stock}, solicitado: ${item.cantidad}.`,
        });
      }
      prod.stock -= item.cantidad;
      await prod.save();
    }

    const venta = await Venta.create({ usuario: usuarioId, productos, total });

    carrito.productos = [];
    await carrito.save();

    res.status(201).json(venta);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la venta" });
  }
});

router.get("/", async (req, res) => {
  try {
    const ventas = await Venta.find()
      .populate("usuario")
      .populate("productos.producto")
      .sort({ fecha: -1 })
      .lean();

    res.json(ventas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener ventas" });
  }
});

router.get("/:vid", async (req, res) => {
  try {
    const venta = await Venta.findById(req.params.vid)
      .populate("usuario")
      .populate("productos.producto")
      .lean();

    if (!venta) return res.status(404).json({ error: "Venta no encontrada" });

    res.json(venta);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la venta" });
  }
});

export default router;
