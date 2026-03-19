import mongoose from "mongoose";

const ventaSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    productos: [
      {
        producto: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Producto",
          required: true,
        },
        cantidad: { type: Number, default: 1, min: 1 },
        precioUnitario: { type: Number, min: 0, required: true },
      },
    ],
    total: { type: Number, min: 0, required: true },
    fecha: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Venta", ventaSchema);
