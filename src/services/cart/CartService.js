import Cart from '../../models/Cart.js'
import BaseError from "../../util/errors/BaseError.js";
import Api500Error from "../../util/errors/Api500Error.js";

export default class CartService {
    #dao
    #productService

    constructor(dao, productService) {
        this.#dao = dao
        this.#productService = productService
    }

    async newCartId(id) {
        try {
            const cart = new Cart({id})
            await this.#dao.save(cart.dto())
            return cart
        } catch (e) {
            if (e instanceof BaseError) throw e;
            throw new Api500Error(`Error al registrar carro de id ${id}`)
        }
    }

    async addProduct(cartId, productId) {
        try {
            const data = await this.#dao.getById(cartId)
            const cart = new Cart(data)
            const product = await this.#productService.getProductById(productId)
            cart.addProduct(product.dto())
            await this.#dao.update(cart.dto(), cartId)
        } catch (e) {
            if (e instanceof BaseError) throw e;
            throw new Api500Error(`Error al agregar producto de id ${productId} al carrito de id ${cartId}`)
        }
    }

    async getCartProducts(cartId) {
        try {
            const cart = await this.#dao.getById(cartId)
            return cart.products
        } catch (e) {
            if (e instanceof BaseError) throw e;
            throw new Api500Error(`Error al recuperar productos del carrito de id ${cartId}`)
        }
    }

    async deleteProduct(cartId, productId) {
        try {
            const cartData = await this.#dao.getById(cartId)
            const cart = new Cart(cartData)
            cart.removeProduct(productId)
            await this.#dao.update(cart.dto(), cartId)
        } catch (e) {
            if (e instanceof BaseError) throw e;
            throw new Api500Error(`Error al borrar producto de id ${productId} del carrito de id ${cartId}`)
        }
    }

    async emptyCart(cartId) {
        try {
            const cart = await this.#dao.getById(cartId)
            cart.products = []
            await this.#dao.update(cart, cartId)
        } catch (e) {
            if (e instanceof BaseError) throw e;
            throw new Api500Error(`Error al vaciar carrito de id ${cartId}`)
        }
    }
}