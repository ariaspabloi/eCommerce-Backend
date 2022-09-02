import Author from "./Author.js";

export default class Message {
    #_id
    #author
    #text
    #date
    #id

    constructor({_id, author, text, date, id}) {
        this.#set_Id(_id)
        this.#setAuthor(author)
        this.#setText(text)
        this.#setDate(date)
        this.#setId(id)
    }

    #set_Id(value) {
        if (!value) return
        if (typeof value !== 'string')
            throw new Error('el _id debe estar formado por caracteres');
        this.#_id = value
    }

    #setAuthor(value) {
        if (!value) return
        if (typeof yourVariable === 'object')
            throw new Error('el author no tiene datos');
        this.#author = new Author(value)
    }

    #setText(value) {
        if (!value) return
        if (typeof value !== 'string')
            throw new Error('el mensaje debe estar formado por caracteres');
        if (value.length < 1)
            throw new Error('el mensaje debe tener al menos 1 caracteres');
        this.#text = value
    }

    #setDate(value) {
        if (!value) return
        if (typeof value !== 'string')
            throw new Error('la fecha debe estar formado por caracteres');
        if (value.length < 6)
            throw new Error('la fecha debe tener al menos 6 caracteres');
        this.#date = value
    }

    #setId(value) {
        if (!value) throw new Error('el id debe estar');
        this.#id = value
    }


    get _id() {
        return this.#_id;
    }

    get author() {
        return this.#author;
    }

    get text() {
        return this.#text;
    }

    get date() {
        return this.#date;
    }

    get id() {
        return this.#id;
    }

    dto() {
        return Object.freeze({
            ...((this.#_id) && {_id: this.#_id}),
            author: this.#author.dto(),
            text: this.#text,
            date: this.#date,
            id: this.#id,
        })
    }
}