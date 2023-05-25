/**
 * productos.repository toma los métodos definidos en el repostory general
 * y los implementa según sus necesidades particulares. 
 */

import { Repository } from "../repository.js"
import productosFactory from "./productos.factory.js";

export class ProductosRepository extends Repository { 

    constructor() {
        super()
        this.productosDAO = productosFactory.getDAO();
    }

    async find(query) {
        const productos = await this.productosDAO.find(query);  
        return productos;
    };
    async findById(id) {
        const producto = await this.productosDAO.findById(id);
        return producto;
    };
    async create(data) {
        const producto = await this.productosDAO.create(data);
        return producto; 
    };
    async update(id, data) {
        const producto = await this.productosDAO.update(id, data);
        return producto;
    };
    async delete(id) {
        const producto = await this.productosDAO.delete(id);
        return producto;
    };
}

export const productosRepository = new ProductosRepository();