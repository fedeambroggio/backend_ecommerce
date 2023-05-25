import { ProductosModel } from "../productos/productos.schema.js";
import { ProductosDTO, InputProductosDTO } from "../DTOs/productos.dto.js";

export class ProductosMongoDAO {
    async create(data) {
        const productDTO = new InputProductosDTO(data.foto, data.descripcion, data.precio, data.categoria)
        const entity = new ProductosModel(productDTO);
        return entity.save();
    }

    async findById(id) {
        try {
            const prod = await ProductosModel.findById(id);
            return new ProductosDTO(prod.id, prod.foto, prod.descripcion, prod.precio, prod.categoria);
        } catch (error) {
        return null;
        }
    }

    async find(query) {
        const productos = await ProductosModel.find(query);
        const productosDTO = productos.map(prod => {
            return new ProductosDTO(prod.id, prod.foto, prod.descripcion, prod.precio, prod.categoria)
        })
        return productosDTO
    }

    async update(id, data) {
        const productDTO = new ProductosDTO(id, data.foto, data.descripcion, data.precio, data.categoria)
        return ProductosModel.findByIdAndUpdate(id, productDTO, { new: true });
    }

    async delete(id) {
        return ProductosModel.findByIdAndDelete(id);
    }
}
