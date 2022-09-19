import BaseError from "../../util/errors/BaseError.js";
import Api500Error from "../../util/errors/Api500Error.js";
import {generateId} from "../../util/helpers.js";

export default class MessageService {
    #messageRepo
    #author
    #schema
    #message
    #normalize

    constructor(messageRepo, schema, normalize) {
        this.#messageRepo = messageRepo
        this.#schema = schema
        this.#normalize = normalize
        this.#author = new this.#schema.Entity('authors', {}, {idAttribute: 'email'});
        this.#message = new this.#schema.Entity('messages', {
            author: this.#author
        });
    }

    async getMessages() {
        try {
            let msgs = await this.#messageRepo.getAll()
            return this.#normalize(msgs, [this.#message])
        } catch (e) {
            if (e instanceof BaseError) throw e;
            throw new Api500Error(`Error conseguir mensajes`)
        }
    }

    async saveMessage(msg) {
        try {
            if (!msg.id) msg.id = generateId()
            await this.#messageRepo.save(msg);
        } catch (e) {
            if (e instanceof BaseError) throw e;
            throw new Api500Error(`Error al guardar mensaje`)
        }
    }
}