import { Router } from "express";
import {
    showConfiguration
} from "../controllers/views.controller.js";
const viewsRouter = Router();


viewsRouter.get("/configuracion", showConfiguration);

export default viewsRouter;