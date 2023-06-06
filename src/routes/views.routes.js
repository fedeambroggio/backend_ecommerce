import { Router } from "express";
import {
    showConfiguration,
    showChat,
    showIndex
} from "../controllers/views.controller.js";
const viewsRouter = Router();


viewsRouter.get("/", showIndex);
viewsRouter.get("/configuracion", showConfiguration);
viewsRouter.get("/web-chat", showChat);

export default viewsRouter;