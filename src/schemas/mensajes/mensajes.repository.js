/**
 * mensajes.repository toma los métodos definidos en el repostory general
 * y los implementa según sus necesidades particulares. 
 */

import { Repository } from "../repository.js"
import mensajesFactory from "./mensajes.factory.js";

export class MensajesRepository extends Repository { 

    constructor() {
        super()
        this.mensajesDAO = mensajesFactory.getDAO();
    }

    async find(query) {
        const mensajes = await this.mensajesDAO.find(query);  
        return mensajes;
    };
    async findById(id) {
        const mensaje = await this.mensajesDAO.findById(id);
        return mensaje;
    };
    async create(data) {
        const mensaje = await this.mensajesDAO.create(data);
        return mensaje; 
    };
    async update(id, data) {
        const mensaje = await this.mensajesDAO.update(id, data);
        return mensaje;
    };
    async delete(id) {
        const mensaje = await this.mensajesDAO.delete(id);
        return mensaje;
    };
}

export const mensajesRepository = new MensajesRepository();