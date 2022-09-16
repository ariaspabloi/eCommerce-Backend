import Message from "../../models/Message.js";

export default class MessageRepo {
    #dao

    constructor(dao) {
        this.#dao = dao
    }

    async getAll() {
        try {
            const dtos = await this.dao.getAll()
            return dtos.map(dto => new Message(dto))
        } catch (e) {
            throw e;
        }
    }

    async getById(id) {
        try {
            const dto = await this.dao.getById(idProd)
            return new Message(dto)
        } catch (e) {
            throw e;
        }
    }

    async save(data) {
        try {
            const dto = new Message(data)
            const insertedDto = await this.dao.save(data);
            return new Message(insertedDto)

        } catch (e) {
            throw e;
        }
    }

    async deleteById(id) {
        try {
            await this.dao.deleteById(id)
        } catch (e) {
            throw e;
        }
    }
}