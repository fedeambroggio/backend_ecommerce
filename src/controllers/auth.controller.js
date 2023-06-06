import { InputUsuariosDTO } from "../schemas/DTOs/usuarios.dto.js";
import { usuariosRepository } from "../schemas/usuarios/usuarios.repository.js";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
    TOKEN_SECRET,
    SESSION_LENGTH_MINUTES,
    ADMIN_EMAIL,
} from "../../config/index.js";
import { logger } from "../utils/logger.js";
import { sendEmail } from "../middleware/emailSender.js";

export const userRegister = async (req, res, next) => {
    try {
        const { email, password, name, phone, passwordCheck } = req.body;

        if (!(email && password && name && phone && passwordCheck)) {
            return res
                .status(400)
                .send("Es requerido ingresar todos los campos");
        }

        if (password !== passwordCheck) {
            return res.status(400).send("Las contraseñas no coinciden");
        }

        // Check if user already exists
        const alreadyExistingUser = await usuariosRepository.find({
            email: { $eq: email },
        });

        if (alreadyExistingUser.length > 0) {
            return res.status(409).send("El usuario ya existe");
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const nuevoUsuarioData = new InputUsuariosDTO(
            email,
            encryptedPassword,
            name,
            phone
        );
        let createdUser = await usuariosRepository.create(nuevoUsuarioData);

        // Create token
        const token = jwt.sign(
            { user_id: createdUser._id, email },
            TOKEN_SECRET,
            {
                expiresIn: SESSION_LENGTH_MINUTES * 60,
            }
        );

        logger.log({
            level: "info",
            message: `Nuevo usuario registrado: ${createdUser}`,
        });

        createdUser.token = token;

        if (createdUser["_id"]) {
            const mailOptions = {
                from: "My ecommerce",
                to: ADMIN_EMAIL,
                subject: "Nuevo usuario registrado",
                html: `
                <p>Los detalles del mismo se presentan a continuación:</p>
                <ul>
                    <li>Email: ${createdUser.email}</li>
                    <li>Nombre: ${createdUser.name}</li>
                    <li>Telefono: ${createdUser.phone}</li>
                </ul>
                `,
            };
            sendEmail(mailOptions);
        }

        return res
            .status(201)
            .json({ data: createdUser, message: "El usuario ha sido creado" });
    } catch (error) {
        next(error);
    }
};

export const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        let user = await usuariosRepository.find({
            email: { $eq: email },
        });
        user = user[0]; //User data is received in array

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ user_id: user._id, email }, TOKEN_SECRET, {
                expiresIn: SESSION_LENGTH_MINUTES * 60,
            });

            // save user token
            user.token = token;

            // return res.redirect("/productos");
            // To test with postman
            return res
                .status(201)
                .json({ data: user, message: "Login existoso" });
        }

        return res
            .status(400)
            .json({ data: [], message: "Credenciales no validas" });
    } catch (error) {
        next(error);
    }
};
