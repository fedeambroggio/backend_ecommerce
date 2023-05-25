import { Router } from "express";
import {
    addCart,
    modifyCartById,
    deleteCartById,
    getCartById
} from "../controllers/carritos.controller.js";
const carritosRouter = Router();

carritosRouter.get("/:id", getCartById);
carritosRouter.post("/", addCart);
carritosRouter.put("/:id", modifyCartById);
carritosRouter.delete("/:id", deleteCartById);

export default carritosRouter;