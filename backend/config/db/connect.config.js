import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log("🔌 Conectando a MongoDB...");
    await mongoose.connect("mongodb+srv://martincounago97_db_user:coderback1@cluster0.z24mlvf.mongodb.net/productosDb?appName=Cluster0");

    console.log("✅ Conectado a MongoDB");
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error);
    process.exit(1);
  }
};
