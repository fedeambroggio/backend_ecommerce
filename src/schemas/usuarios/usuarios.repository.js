/**
 * usuarios.repository toma los métodos definidos en el repostory general
 * y los implementa según sus necesidades particulares. 
 */

import { Repository } from "../repository.js"
import usuariosFactory from "./usuarios.factory.js";

export class UsuariosRepository extends Repository { 

    constructor() {
        super()
        this.usuariosDAO = usuariosFactory.getDAO();
    }

    async find(query) {
        const usuarios = await this.usuariosDAO.find(query);  
        return usuarios;
    };
    async findById(id) {
        const usuario = await this.usuariosDAO.findById(id);
        return usuario;
    };
    async create(data) {
        const usuario = await this.usuariosDAO.create(data);
        return usuario; 
    };
    async update(id, data) {
        const usuario = await this.usuariosDAO.update(id, data);
        return usuario;
    };
    async delete(id) {
        const usuario = await this.usuariosDAO.delete(id);
        return usuario;
    };
}

export const usuariosRepository = new UsuariosRepository();