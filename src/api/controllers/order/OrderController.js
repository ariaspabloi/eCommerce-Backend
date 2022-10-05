import logger from '../../../util/logger.js';

export default class OrderController {
    #service

    constructor(orderService) {
        this.#service = orderService
    }

    getOrder = async (req, res, next) => {
        try {
            const orders = await this.#service.getAllOrders()
            return res.status(201).json(orders);
        } catch (e) {
            logger.error('Error getOrder')
            next(e)
        }
    }

    postOrder = async (req, res, next) => {
        try {
            const cartId = (await req.user).id
            const newOrder = await this.#service.registerOrder(cartId)
            res.status(201).json(newOrder)
        } catch (e) {
            logger.error('Error postOrder')
            next(e)
        }
    }
}