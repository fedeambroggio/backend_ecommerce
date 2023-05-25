import { Schema, model } from "mongoose";

export const CarritosSchema = new Schema({
    email: {type: String, required: true, default: ""},
    items: [
      {
        id: { type: String, required: true },
        cantidad: { type: Number, required: true, default: 0 },
      },
    ],
    direccion: {type: String, required: true},
    fecha: {type: Date, required: true, default: Date.now()},
  });

export const CarritosModel = model("carritos", CarritosSchema);