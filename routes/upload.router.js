import { Router } from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../uploads"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.get("/", (req, res) => {
  res.render("upload", {
    title: "Subir archivo",
  });
});

router.post("/", upload.single("miArchivo"), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.render("upload", {
      title: "Subir archivo",
      msg: `Error al subir el archivo: ${
        req.fileValidationError || "Archivo no válido"
      }`,
    });
  }
  res.render("upload", {
    title: "Subir archivo",
    msg: `Archivo "${file.originalname}" subido exitosamente como "${file.filename}"`,
    fileUrl: `/uploads/${file.filename}`,
    isImage: file.mimetype.startsWith("image/"),
  });
});

export default router;
