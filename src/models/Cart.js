import Api400Error from "../util/errors/Api400Error.js";

export default class Cart {
    #id
    #products

    constructor({id, products}) {
        this.#setId(id);
        this.#setProducts(products)
        this._products = products;
    }

    addProduct(product) {
        if (!product.id)
            throw new Api400Error('El producto debe tener id.');
        this.#products.push(product.id)
    }

    removeProduct(product) {
        if (!product.id)
            throw new Api400Error('El producto debe tener id.');
        for (let i = 0; i < this.#products.length; i++) {
            if (this.#products[i] === productId._id) {
                this.#products.splice(i, 1)
                break
            }
        }
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
            throw new Api400Error('Los productos debe estar formado por un array.');
        this.#products = value
    }

    get id() {
        return this.#id;
    }

    get products() {
        return this.#products;
    }

    dto() {
        return Object.freeze({
            ...((this.#id) && {id: this.#id}),
            products: this.#products
        })
    }
}