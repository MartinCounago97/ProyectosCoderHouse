import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

usuarioSchema.methods.descripcionCompleta = function () {
  return `${this.username} - ${this.nombre} - ${this.email}`;
};

usuarioSchema.methods.toPublic = function () {
  return {
    id: this._id,
    username: this.username,
    nombre: this.nombre,
    email: this.email,
  };
};

export default mongoose.model("Usuario", usuarioSchema);
