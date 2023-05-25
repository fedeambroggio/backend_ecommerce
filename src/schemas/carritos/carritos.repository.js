import { Repository } from "../repository.js"
import carritosFactory from "./carritos.factory.js";

export class CarritosRepository extends Repository { 

    constructor() {
        super()
        this.carritosDAO = carritosFactory.getDAO();
    }

    async find(query) {
        const carritos = await this.carritosDAO.find(query);  
        return carritos;
    };
    async findById(id) {
        const carrito = await this.carritosDAO.findById(id);
        return carrito;
    };
    async create(data) {
        const carrito = await this.carritosDAO.create(data);
        return carrito; 
    };
    async update(id, data) {
        const carrito = await this.carritosDAO.update(id, data);
        return carrito;
    };
    async delete(id) {
        const carrito = await this.carritosDAO.delete(id);
        return carrito;
    };
}

export const carritosRepository = new CarritosRepository();