import { Router } from "express";
import {
    getAllProducts,
    getProductByCategory,
    addProduct,
    deleteProductById,
    modifyProductById,
} from "../controllers/productos.controller.js";
const productosRouter = Router();

productosRouter.get("/", getAllProducts);
productosRouter.get("/:categoria", getProductByCategory);

productosRouter.post("/", addProduct);
productosRouter.put("/:id", modifyProductById);
productosRouter.delete("/:id", deleteProductById);

export default productosRouter;