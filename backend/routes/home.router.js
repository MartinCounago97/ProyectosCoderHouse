import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({ ok: true, message: "Gestor de QA funcionando" });
});

export default router;
