import { mensajesRepository } from "../schemas/mensajes/mensajes.repository.js";

export const getAllMessages = async (req, res, next) => {
    try {
        const mensajes = await mensajesRepository.find();
        if (res)
            res.status(200).json({ data: mensajes });
        else
            return { data: mensajes }
    } catch (error) {
        console.log("error", error)
        next(error);
    }
};

export const getOwnMessages = async (req, res, next) => {
    try {
        const { email } = req.params;

        const mensaje = await mensajesRepository.find({
            email: { $eq: email },
        });
        if (mensaje) {
            res.status(200).json({ data: mensaje });
        } else {
            res.status(200).json({
                data: [],
                message: `El email ${email} no posee mensajes`,
            });
        }
    } catch (error) {
        next(error);
    }
};

export const addMessage = async (req, res, next) => {
    try {
        const { email, cuerpo, tipo = "sistema" } = req.body;
        const nuevoMensajeData = { email, tipo, fecha: Date.now(), cuerpo };

        const mensaje = await mensajesRepository.create(nuevoMensajeData);
        return res
            .status(201)
            .json({ data: mensaje, message: "El mensaje ha sido creado" });
    } catch (error) {
        next(error);
    }
};

export const addMessageNoHTTP = async (email, cuerpo, tipo = "usuario") => {
    try {
        const nuevoMensajeData = { email, tipo, fecha: Date.now(), cuerpo };

        const mensaje = await mensajesRepository.create(nuevoMensajeData);
        return { data: mensaje, message: "El mensaje ha sido creado" };
    } catch (error) {
        throw error;
    }
};
