import { Router } from "express";
import {
    getAllOrders,
    addOrder,
    deleteOrderById
} from "../controllers/ordenes.controller.js";
import { authenticateAndRefreshJWT } from "../middleware/authenticateAndRefreshJWT.js";
const ordenesRouter = Router();

ordenesRouter.get("/", authenticateAndRefreshJWT, getAllOrders);
ordenesRouter.post("/", authenticateAndRefreshJWT, addOrder);
ordenesRouter.delete("/:id", authenticateAndRefreshJWT, deleteOrderById);

export default ordenesRouter;