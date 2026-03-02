// src/config/db.js
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log("🔌 Conectando a MongoDB...");
    await mongoose.connect("mongodb://localhost:27017/qa-manager");

    console.log("✅ Conectado a MongoDB");
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error);
    process.exit(1);
  }
};
