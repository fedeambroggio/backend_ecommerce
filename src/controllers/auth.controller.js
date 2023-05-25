import { InputUsuariosDTO } from "../schemas/DTOs/usuarios.dto.js";
import { usuariosRepository } from "../schemas/usuarios/usuarios.repository.js";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../../config/index.js";

//ADD LOGGERS
//TEST USER LOGIN

export const userRegister = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            res.status(400).send("Es requerido ingresar todos los campos");
        }

        // Check if user already exist
        const alreadyExistingUser = await usuariosRepository.find({
            email: { $eq: email },
        });


        if (alreadyExistingUser.length > 0) {
            return res.status(409).send("El usuario ya existe");
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const nuevoUsuarioData = new InputUsuariosDTO(
            email, encryptedPassword
        );
        let createdUser = await usuariosRepository.create(nuevoUsuarioData);

        // Create token
        const token = jwt.sign({ user_id: createdUser._id, email }, TOKEN_SECRET, {
            expiresIn: "2h",
        });

        createdUser.token = token;

        return res
            .status(201)
            .json({ data: createdUser, message: "El usuario ha sido creado" });
    } catch (err) {
        return res.status(500).json({
            data: [],
            message: `El usuario no ha podido ser registrado`,
        });
    }
};

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await usuariosRepository.find({
            email: { $eq: email },
        });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ user_id: user._id, email }, TOKEN_SECRET, {
                expiresIn: "2h",
            });

            // save user token
            user.token = token;

            // user
            return res
                .status(201)
                .json({ data: user, message: "Login existoso" });
        }
        return res
            .status(400)
            .json({ data: user, message: "Credenciales no validas" });
    } catch (err) {
        return res.status(500).json({
            data: [],
            message: `El usuario no ha podido ser logueado`,
        });
    }
};
