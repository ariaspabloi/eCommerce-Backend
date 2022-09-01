export default class Cart {
    #_id
    #products

    constructor({_id, products}) {
        this.#setId(_id);
        this.#setProducts(products)
        this._products = products;
    }

    addProduct(product) {
        if (!product._id)
            throw new Error('el producto debe tener id');
        this.#products.push(product._id)
    }

    removeProduct(product) {
        if (!product._id)
            throw new Error('el producto debe tener id');
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

    get _id() {
        return this.#_id;
    }

    get products() {
        return this.#products;
    }

    dto() {
        return Object.freeze({
            ...((this.#_id) && {_id: this.#_id}),
            products: this.#products
        })
    }
}