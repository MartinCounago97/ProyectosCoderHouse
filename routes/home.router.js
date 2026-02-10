import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.render("home", {
    title: "Home",
  });
});

router.get("/chat", (req, res) => {
  res.render("chat", {
    title: "Chat en tiempo real",
  });
});

export default router;
