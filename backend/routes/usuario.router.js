import { Router } from "express";
import Usuario from "../models/usuario.model.js";
import { Mongoose } from "mongoose";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { username, nombre, email } = req.body;
    const nuevoUsuario = new Usuario({ username, nombre, email });
    await nuevoUsuario.save();
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(500).json({ error: "Error al crear usuario" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener usuario" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { username, nombre, email } = req.body;
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      req.params.id,
      { username, nombre, email },
      { new: true }
    );
    if (!usuarioActualizado) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json(usuarioActualizado);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const usuarioEliminado = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuarioEliminado) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
});

export default router;
