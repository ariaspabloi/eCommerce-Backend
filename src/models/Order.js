import Api400Error from "../util/errors/Api400Error.js";

export default class Order {
    #id
    #date
    #clientId
    #products

    constructor(id, date, clientId, products) {
        this.#setId(id);
        this.#setDate(date)
        this.#setClientId(clientId)
        this.#setProducts(products)
    }

    get id() {
        return this.#id;
    }

    get products() {
        return this.#products;
    }

    get clientId() {
        return this.#clientId;
    }

    get date() {
        return this.#date;
    }

    #setId(value) {
        if (!value) return
        if (typeof value !== 'string')
            throw new Api400Error('El id debe estar formado por caracteres.');
        this.#id = value
    }

    #setProducts(value) {
        if (!value) {
            this.#products = []
            return
        }
        if (!Array.isArray(value))
            throw new Api400Error('Los productos debe estar formado por caracteres.');
        this.#products = value
    }

    #setClientId(value) {
        if (!value)
            throw new Api400Error('El campo clientId no esta.');
        if (typeof value !== 'string')
            throw new Api400Error('El clientId debe estar formado por caracteres.');
        if (value.length < 6)
            throw new Api400Error('El clientId debe tener al menos 6 caracteres.');
        this.#clientId = value
    }

    #setDate(value) {
        if (!value)
            throw new Api400Error('El campo date no esta.');
        this.#date = value
    }

    dto() {
        return Object.freeze({
            ...((this.#id) && {id: this.#id}),
            products: this.#products,
            clientId: this.#clientId,
            date: this.#date
        })
    }
}