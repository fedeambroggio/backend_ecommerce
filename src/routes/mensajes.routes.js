import { Router } from "express";
import {
    addMessage,
    getOwnMessages,
    getAllMessages
} from "../controllers/mensajes.controller.js";
import { authenticateAndRefreshJWT } from "../middleware/authenticateAndRefreshJWT.js";
const mensajesRouter = Router();

mensajesRouter.get("/", authenticateAndRefreshJWT, getAllMessages);
mensajesRouter.post("/", authenticateAndRefreshJWT, addMessage);
mensajesRouter.get("/:email", authenticateAndRefreshJWT, getOwnMessages);

export default mensajesRouter;