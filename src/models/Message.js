import Author from "./Author.js";
import Api400Error from "../util/errors/Api400Error.js";

export default class Message {
    #id
    #author
    #text
    #date

    constructor({id, author, text, date,}) {
        this.#setId(id)
        this.#setAuthor(author)
        this.#setText(text)
        this.#setDate(date)
    }

    get id() {
        return this.#id;
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

    #setId(value) {
        if (!value) return
        if (typeof value !== 'string')
            throw new Api400Error('el id debe estar formado por caracteres');
        this.#id = value
    }

    #setAuthor(value) {
        if (!value)
            throw new Api400Error('El campo author no esta.');
        //if (typeof value === 'object')
        //    throw new Api400Error('el author no tiene datos');
        this.#author = new Author(value)
    }

    #setText(value) {
        if (!value)
            throw new Api400Error('El campo text no esta.');
        if (typeof value !== 'string')
            throw new Api400Error('El mensaje debe estar formado por caracteres.');
        if (value.length < 1)
            throw new Api400Error('El mensaje debe tener al menos 1 caracteres.');
        this.#text = value
    }

    #setDate(value) {
        if (!value)
            throw new Api400Error('El campo date no esta.');
        if (typeof value !== 'string')
            throw new Api400Error('La fecha debe estar formado por caracteres.');
        if (value.length < 6)
            throw new Api400Error('La fecha debe tener al menos 6 caracteres.');
        this.#date = value
    }

    dto() {
        return Object.freeze({
            ...((this.#id) && {id: this.#id}),
            author: this.#author.dto(),
            text: this.#text,
            date: this.#date,
        })
    }
}