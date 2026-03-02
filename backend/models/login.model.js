import mongoose from "mongoose";

const loginSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true, unique: true },

    passwordHash: { type: String, required: true },

    cliente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      default: null,
    },
  },
  { timestamps: true }
);

loginSchema.methods.setCliente = function (usuarioId) {
  this.cliente = usuarioId;
};

loginSchema.methods.getCliente = function () {
  return this.cliente;
};

export default mongoose.model("Login", loginSchema);
