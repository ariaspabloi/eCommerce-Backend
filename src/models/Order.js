import Api400Error from "../util/errors/Api400Error.js";

export default class Order {
    #id
    #products
    #email
    #name
    #lastname

    constructor({id, products, email, name, lastname}) {
        this.#setId(id);
        this.#setProducts(products)
        this.#setEmail(email)
        this.#setName(name)
        this.#setLastname(lastname)
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

    #setEmail(value) {
        if (!value)
            throw new Api400Error('El campo email no esta.');
        if (typeof value !== 'string')
            throw new Api400Error('El email debe estar formado por caracteres.');
        if (value.length < 6)
            throw new Api400Error('El email debe tener al menos 6 caracteres.');
        this.#email = value
    }

    #setName(value) {
        if (!value)
            throw new Api400Error('El campo name no esta.');
        if (typeof value !== 'string')
            throw new Api400Error('El name debe estar formado por caracteres.');
        if (value.length < 6)
            throw new Api400Error('El name debe tener al menos 6 caracteres.');
        this.#name = value
    }

    #setLastname(value) {
        if (!value)
            throw new Api400Error('El campo lastname no esta.');
        if (typeof value !== 'string')
            throw new Api400Error('El lastname debe estar formado por caracteres.');
        if (value.length < 6)
            throw new Api400Error('El lastname debe tener al menos 6 caracteres.');
        this.#lastname = value
    }

    get id() {
        return this.#id;
    }

    get products() {
        return this.#products;
    }

    get email() {
        return this.#email;
    }

    get name() {
        return this.#name;
    }

    get lastname() {
        return this.#lastname;
    }

    dto() {
        return Object.freeze({
            ...((this.#id) && {id: this.#id}),
            products: this.#products,
            email: this.#email,
            name: this.#name,
            lastname: this.#lastname,
        })
    }
}