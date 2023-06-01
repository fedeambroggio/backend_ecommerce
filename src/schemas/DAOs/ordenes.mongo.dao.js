import { OrdenesModel } from "../ordenes/ordenes.schema.js";
import { OrdenesDTO, InputOrdenesDTO } from "../DTOs/ordenes.dto.js";

export class OrdenesMongoDAO {
    async create(data) {
        const orderDTO = new InputOrdenesDTO(data.email, data.items, data.estado)
        const entity = new OrdenesModel(orderDTO);
        return entity.save();
    }

    async findById(id) {
        try {
            const order = await OrdenesModel.findById(id);
            return new OrdenesDTO(order.id, order.email, order.items, order.estado);
        } catch (error) {
        return null;
        }
    }

    async find(query) {
        const ordenes = await OrdenesModel.find(query);
        const ordenesDTO = ordenes.map(order => {
            return new OrdenesDTO(order.id, order.email, order.items, order.estado)
        })
        return ordenesDTO
    }

    async update(id, data) {
        const orderDTO = new OrdenesDTO(id, data.email, data.items, data.estado)
        return OrdenesModel.findByIdAndUpdate(id, orderDTO, { new: true });
    }

    async delete(id) {
        return OrdenesModel.findByIdAndDelete(id);
    }
}
