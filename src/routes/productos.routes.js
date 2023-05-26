import { Router } from "express";
import {
    getAllProducts,
    getProductByCategory,
    addProduct,
    deleteProductById,
    modifyProductById,
} from "../controllers/productos.controller.js";
import { authenticateAndRefreshJWT } from "../middleware/authenticateAndRefreshJWT.js";
const productosRouter = Router();

productosRouter.get("/", authenticateAndRefreshJWT, getAllProducts);
productosRouter.get("/:categoria", authenticateAndRefreshJWT, getProductByCategory);

productosRouter.post("/", authenticateAndRefreshJWT, addProduct);
productosRouter.put("/:id", authenticateAndRefreshJWT, modifyProductById);
productosRouter.delete("/:id", authenticateAndRefreshJWT, deleteProductById);

export default productosRouter;