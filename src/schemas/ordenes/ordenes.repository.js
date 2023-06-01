/**
 * ordenes.repository toma los métodos definidos en el repostory general
 * y los implementa según sus necesidades particulares. 
 */

import { Repository } from "../repository.js"
import ordenesFactory from "./ordenes.factory.js";

export class OrdenesRepository extends Repository { 

    constructor() {
        super()
        this.ordenesDAO = ordenesFactory.getDAO();
    }

    async find(query) {
        const ordenes = await this.ordenesDAO.find(query);  
        return ordenes;
    };
    async findById(id) {
        const orden = await this.ordenesDAO.findById(id);
        return orden;
    };
    async create(data) {
        const orden = await this.ordenesDAO.create(data);
        return orden; 
    };
    async update(id, data) {
        const orden = await this.ordenesDAO.update(id, data);
        return orden;
    };
    async delete(id) {
        const orden = await this.ordenesDAO.delete(id);
        return orden;
    };
}

export const ordenesRepository = new OrdenesRepository();