import { Schema, model } from "mongoose";

export const MensajesSchema = new Schema({
    email: {type: String, required: true},
    tipo: {type: String, required: true},
    cuerpo: {type: String, required: true},
    fecha: {type: Date, required: true, default: Date.now()},
  });

export const MensajesModel = model("mensajes", MensajesSchema);