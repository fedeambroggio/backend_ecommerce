import { Router } from "express";
import {
    userLogin,
    userRegister
} from "../controllers/auth.controller.js";
const usuariosRouter = Router();


usuariosRouter.post("/ingresar", userLogin);
usuariosRouter.post("/registrar", userRegister);

export default usuariosRouter;