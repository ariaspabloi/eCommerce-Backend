import logger from "../../../util/logger.js";

const testMSG = "API Test /";

export default class CartController {
    #service

    constructor(service) {
        this.#service = service
    }

    info = async (req, res) => {
        res.json(testMSG)
    }


    postAddProduct = async (req, res, next) => {
        try {
            const cartId = (await req.user).id
            await this.#service.addProduct(cartId, req.body.productId)
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