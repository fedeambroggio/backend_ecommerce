import { ordenesRepository } from "../schemas/ordenes/ordenes.repository.js";
import { sendEmail } from "../middleware/emailSender.js";
import { ADMIN_EMAIL } from "../../config/index.js";

export const getAllOrders = async (req, res) => {
    const { id } = req.query;

    if (id) {
        const orden = await ordenesRepository.findById(id);
        if (orden) {
            res.status(200).json({ data: orden });
        } else {
            res.status(200).json({
                data: [],
                message: `La orden ${id} no ha sido encontrado`,
            });
        }
    } else {
        const ordenes = await ordenesRepository.find();
        res.status(200).json({ data: ordenes });
    }
};

export const addOrder = async (req, res) => {
    const { email, items } = req.body;

    const nuevaOrdenData = { email, items };

    const ordenes = await ordenesRepository.create(nuevaOrdenData);

    if (ordenes['_id']) { 
        const itemsHTML = ordenes.items.map(item => (
            `<li>Item ID: ${ item.id }. Cantidad: ${ item.cantidad }</li>`
        )).join('')
    
        const mailOptions = {
            from: "My ecommerce",
            to: ordenes.email,
            subject: "Su orden ha sido registrada",
            html: `
            <p>Los detalles de su orden se presentan a continuación:</p>
            <ul>
                ${itemsHTML}
            </ul>
            <p>Muchas gracias por su compra</p>
            `,
        }
        sendEmail(mailOptions)

        const adminMailOptions = {
            from: "My ecommerce",
            to: ADMIN_EMAIL,
            subject: "Una nueva orden ha sido registrada",
            html: `
            <p>Los detalles de la misma se presentan a continuación:</p>
            <ul>
                <li>Email del comprador: ${ordenes.email}</li>
                ${itemsHTML}
            </ul>
            <p>Muchas gracias por su compra</p>
            `,
        }
        sendEmail(adminMailOptions)
    }

    return res
        .status(201)
        .json({ data: ordenes, message: "La orden ha sido creada" });
};

export const deleteOrderById = async (req, res) => {
    const { id } = req.params;
    const ordenDeleted = await ordenesRepository.delete(id);
    if (ordenDeleted) {
        return res.status(201).json({
            data: ordenDeleted,
            message: "La orden ha sido eliminada",
        });
    } else {
        return res.status(200).json({
            data: [],
            message: `La orden ${id} no ha sido encontrada`,
        });
    }
};
