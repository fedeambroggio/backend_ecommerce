import { Schema, model } from "mongoose";

const OrdenesSchema = new Schema({
    email: { type: String, required: true },
    items: [
        {
            id: { type: String, required: true },
            cantidad: { type: Number, required: true, default: 1 },
            precio: { type: Number, required: true },
        },
    ],
    numeroOrden: { type: Number },
    estado: { type: String, required: true, default: "generada" },
    fecha: { type: Date, required: true, default: Date.now() },
});

OrdenesSchema.pre("save", async function (next) {
    try {
        if (!this.numeroOrden) {
            const count = await this.model("ordenes").countDocuments();
            this.numeroOrden = count + 1;
        }
        next();
    } catch (error) {
        next(error);
    }
});

export const OrdenesModel = model("ordenes", OrdenesSchema);
