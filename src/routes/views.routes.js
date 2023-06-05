import { Router } from "express";
import {
    showConfiguration,
    showChat
} from "../controllers/views.controller.js";
const viewsRouter = Router();


viewsRouter.get("/configuracion", showConfiguration);
viewsRouter.get("/chat", showChat);

export default viewsRouter;