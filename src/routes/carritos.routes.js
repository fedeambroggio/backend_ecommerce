import { Router } from "express";
import {
    addCart,
    modifyCartById,
    deleteCartById,
    getCartById
} from "../controllers/carritos.controller.js";
import { authenticateAndRefreshJWT } from "../middleware/authenticateAndRefreshJWT.js";
const carritosRouter = Router();

carritosRouter.get("/:id", authenticateAndRefreshJWT, getCartById);
carritosRouter.post("/", authenticateAndRefreshJWT, addCart);
carritosRouter.put("/:id", authenticateAndRefreshJWT, modifyCartById);
carritosRouter.delete("/:id", authenticateAndRefreshJWT, deleteCartById);

export default carritosRouter;