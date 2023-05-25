import { Schema, model } from "mongoose";

export const ProductosSchema = new Schema({
    foto: {type: String, required: true, default: ""},
    descripcion: {type: String, required: true},
    precio: {type: Number, required: true},
    categoria: {type: String, required: true},
    timestamp: {type: Date, required: true, default: Date.now()},
  });

export const ProductosModel = model("productos", ProductosSchema);