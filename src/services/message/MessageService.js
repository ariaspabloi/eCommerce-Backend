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
        let msgs = await this.#messageRepo.getAll()
        return this.#normalize(msgs, [this.#message]);
    }

    async saveMessage(msg) {
        await this.#messageRepo.save(msg);
    }
}