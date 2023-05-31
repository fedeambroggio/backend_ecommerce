import { MensajesModel } from "../mensajes/mensajes.schema.js";
import { MensajesDTO, InputMensajesDTO } from "../DTOs/mensajes.dto.js";

export class MensajesMongoDAO {
    async create(data) {
        const messageDTO = new InputMensajesDTO(data.email, data.tipo, data.fecha, data.cuerpo)
        const entity = new MensajesModel(messageDTO);
        return entity.save();
    }

    async findById(id) {
        try {
            const msg = await MensajesModel.findById(id);
            return new MensajesDTO(msg.id, msg.email, msg.tipo, msg.fecha, msg.cuerpo);
        } catch (error) {
        return null;
        }
    }

    async find(query) {
        const mensajes = await MensajesModel.find(query);
        const mensajesDTO = mensajes.map(msg => {
            return new MensajesDTO(msg.id, msg.email, msg.tipo, msg.fecha, msg.cuerpo)
        })
        return mensajesDTO
    }

    async update(id, data) {
        const messageDTO = new MensajesDTO(id, data.email, data.tipo, data.fecha, data.cuerpo)
        return MensajesModel.findByIdAndUpdate(id, messageDTO, { new: true });
    }

    async delete(id) {
        return MensajesModel.findByIdAndDelete(id);
    }
}
