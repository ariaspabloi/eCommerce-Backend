import Message from "../../models/Message.js";
import messageDao from "../indexMessage.js";

export default class MessageRepo {

    constructor() {
        this.dao = messageDao
    }

    async getAll() {
        const dtos = await this.dao.getAll()
        return dtos.map(dto => new Message(dto))
    }

    async getById(id) {
        const dto = await this.dao.getById(idProd)
        return new Message(dto)
    }

    async save(data) {
        const dto = new Message(data)
        const insertedDto = await this.dao.save(data);
        return new Message(insertedDto)
    }

    async deleteById(id) {
        await this.dao.deleteById(id)
    }
}