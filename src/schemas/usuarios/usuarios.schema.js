import { Schema, model } from "mongoose";

export const UsuariosSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
  });

export const UsuariosModel = model("usuarios", UsuariosSchema);