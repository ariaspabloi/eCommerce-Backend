export default class Order {
    #_id
    #products
    #email
    #name
    #lastname

    constructor({_id, products, email, name, lastname}) {
        this.#setId(_id);
        this.#setProducts(products)
        this.#setEmail(email)
        this.#setName(name)
        this.#setLastname(lastname)
    }

    #setId(value) {
        if (!value) return
        if (typeof value !== 'string')
            throw new Error('el _id debe estar formado por caracteres');
        this.#_id = value
    }

    #setProducts(value) {
        if (!value) {
            this.#products = []
            return
        }
        if (!Array.isArray(value))
            throw new Error('los productos debe estar formado por caracteres');
        this.#products = value
    }

    #setEmail(value) {
        if (!value) return
        if (typeof value !== 'string')
            throw new Error('el email debe estar formado por caracteres');
        if (value.length < 6)
            throw new Error('el email debe tener al menos 6 caracteres');
        this.#email = value
    }

    #setName(value) {
        if (!value) return
        if (typeof value !== 'string')
            throw new Error('el name debe estar formado por caracteres');
        if (value.length < 6)
            throw new Error('el name debe tener al menos 6 caracteres');
        this.#name = value
    }

    #setLastname(value) {
        if (!value) return
        if (typeof value !== 'string')
            throw new Error('el lastname debe estar formado por caracteres');
        if (value.length < 6)
            throw new Error('el lastname debe tener al menos 6 caracteres');
        this.#lastname = value
    }

    get _id() {
        return this.#_id;
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
            ...((this.#_id) && {_id: this.#_id}),
            products: this.#products,
            email: this.#email,
            name: this.#name,
            lastname: this.#lastname,
        })
    }
}