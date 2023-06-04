import { Router } from "express";
import {
    showConfiguration
} from "../controllers/views.controller.js";
const viewsRouter = Router();


viewsRouter.get("/configuracion", showConfiguration);
// viewsRouter.post("/mensajes", userRegister);

export default viewsRouter;