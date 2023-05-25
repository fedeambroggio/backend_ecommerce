import { CarritosModel } from "../carritos/carritos.schema.js";
import { CarritosDTO, InputCarritosDTO } from "../DTOs/carritos.dto.js";

export class CarritosMongoDAO {
    async create(data) {
        const carritoDTO = new InputCarritosDTO(data.email, data.items, data.direccion, data.fecha)
        const entity = new CarritosModel(carritoDTO);
        return entity.save();
    }

    async findById(id) {
        try {
            const cart = await CarritosModel.find({ _id: id });
            return new CarritosDTO(cart[0].id, cart[0].email, cart[0].items, cart[0].direccion, cart[0].fecha)
        } catch (error) {
            return null;
        }
    }

    async find(query) {
        const carritos = await CarritosModel.find(query);
        const carritosDTO = carritos.map(cart => {
            return new CarritosDTO(cart.id, cart.email, cart.items, cart.direccion, cart.fecha)
        })
        return carritosDTO
    }

    async update(id, data) {
        const cartDTO = new CarritosDTO(id, data.email, data.items, data.direccion, data.fecha)
        return CarritosModel.findByIdAndUpdate(id, cartDTO, { new: true });
    }

    async delete(id) {
        return CarritosModel.findByIdAndDelete(id);
    }
}
