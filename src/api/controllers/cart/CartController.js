import logger from "../../../util/logger.js";
import Api400Error from "../../../util/errors/Api400Error.js";

export default class CartController {
    #service

    constructor(service) {
        this.#service = service
    }

    postAddProduct = async (req, res, next) => {
        try {
            const cartId = (await req.user).id
            const productId = req.body.productId
            if (!productId) throw new Api400Error('Falta campo productId')
            await this.#service.addProduct(cartId, productId)
            res.status(201).json()
        } catch (e) {
            logger.error(`Error postAddProduct: ${e}`)
            next(e)
        }
    }

    getProducts = async (req, res, next) => {
        try {
            const cartId = (await req.user).id
            const products = await this.#service.getCartProducts(cartId)
            res.status(201).json(products)
        } catch (e) {
            logger.error(`Error getProducts: ${e}`)
            next(e)
        }
    }

    deleteProduct = async (req, res, next) => {
        try {
            const cartId = (await req.user).id
            const productId = req.params.productId
            await this.#service.deleteProduct(cartId, productId)
            res.status(201).json()
        } catch (e) {
            logger.error(`Error deleteProduct: ${e}`)
            next(e)
        }
    }

    deleteEmptyCart = async (req, res, next) => {
        try {
            const cartId = await req.user.id
            await this.#service.emptyCart(cartId)
            res.status(204).json()
        } catch (e) {
            logger.error(`Error deleteEmptyCart: ${e}`)
            next(e)
        }
    }
}