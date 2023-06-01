import { UsuariosModel } from "../usuarios/usuarios.schema.js";
import { UsuariosDTO, InputUsuariosDTO } from "../DTOs/usuarios.dto.js";

export class UsuariosMongoDAO {
    async create(data) {
        const userDTO = new InputUsuariosDTO(data.email, data.password, data.name, data.phone)
        const entity = new UsuariosModel(userDTO);
        return entity.save();
    }

    async findById(id) {
        try {
            const user = await UsuariosModel.findById(id);
            return new UsuariosDTO(user.id, user.email, user.password, user.name, user.phone);
        } catch (error) {
        return null;
        }
    }

    async find(query) {
        const usuarios = await UsuariosModel.find(query);
        const usuariosDTO = usuarios.map(user => {
            return new UsuariosDTO(user.id, user.email, user.password, user.name, user.phone)
        })
        return usuariosDTO
    }

    async update(id, data) {
        const userDTO = new UsuariosDTO(id, data.email, data.password, data.name, data.phone)
        return UsuariosModel.findByIdAndUpdate(id, userDTO, { new: true });
    }

    async delete(id) {
        return UsuariosModel.findByIdAndDelete(id);
    }
}
