import Api400Error from "../util/errors/Api400Error.js";

export default class Cart {
    #id
    #products

    constructor({id, products}) {
        this.#setId(id);
        this.#setProducts(products)
    }

    get id() {
        return this.#id;
    }

    get products() {
        return this.#products;
    }

    addProduct(product) {
        if (!product.id)
            throw new Api400Error('El producto debe tener id.');
        const index = this.#products.findIndex(p => p.product?.id === product.id)
        if (index !== -1) {
            this.#products[index].cant++
            return;
        }
        this.#products.push({product, cant: 1})
    }

    removeProduct(productId) {
        if (!productId)
            throw new Api400Error('El producto debe tener id.');
        const index = this.#products.findIndex(p => p.product?.id === productId)
        if (index === -1) {
            throw new Api400Error('El producto no esta en el carrito.');
        }
        this.#products[index].cant--
        if (this.#products[index].cant <= 0) {
            if (this.#products[index].cant > 1) {
                this.#products.splice(index, 1)
            } else {
                this.#products = []
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

    dto() {
        return Object.freeze({
            ...((this.#id) && {id: this.#id}),
            products: this.#products
        })
    }
}