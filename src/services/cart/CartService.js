import Cart from '../../models/Cart.js'

export default class CartService {
    #dao
    #productService

    constructor(dao, productService) {
        this.#dao = dao
        this.#productService = productService
    }

    async newCartId(id) {
        const cart = new Cart({id})
        await this.#dao.save(cart.dto())
        return cart
    }

    async addProduct(cartId, productId) {
        try {
            const data = await this.#dao.getById(cartId)
            const cart = new Cart(data)
            const product = await this.#productService.getProductById(productId)
            cart.addProduct(product.dto())
            await this.#dao.update(cart.dto(), cartId)
        } catch (error) {
            throw error
        }
    }

    async getCartProducts(cartId) {
        try {
            const cart = await this.#dao.getById(cartId)
            return cart.products
        } catch (error) {
            throw error;
        }
    }

    async deleteProduct(cartId, productId) {
        try {
            const cart = await this.#dao.getById(cartId)
            for (let i = 0; i < cart.products.length; i++) {
                if (cart.products[i] == productId) {
                    cart.products.splice(i, 1)
                    break
                }
            }
            await this.#dao.update(cart, cartId)
        } catch (error) {
            throw error;
        }
    }

    async emptyCart(cartId) {
        try {
            const cart = await this.#dao.getById(cartId)
            cart.products = []
            await this.#dao.update(cart, cartId)
        } catch (error) {
            throw error;
        }
    }

    async getCartById(id) {
        return await this.#dao.getById(id)
    }
}