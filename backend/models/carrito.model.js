import mongoose from "mongoose";

const carritoSchema = new mongoose.Schema(
  {
    productos: [
      {
        producto: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Producto",
          required: true,
        },
        cantidad: { type: Number, default: 1, min: 1 },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Carrito", carritoSchema);
