import logger from '../../../util/logger.js';

const testMSG = "API Test /";

export default class OrderController {
    #service
    #userService

    constructor(orderService, userService) {
        this.#service = orderService
        this.#userService = userService
    }

    info = async (req, res) => {
        res.json(testMSG)
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
            const {email, name, lastname, phone, id} = await this.#userService.getUserById((await req.user).id)
            const ordenAgregada = this.#service.registerOrder(id, email, name, lastname, phone)
            res.status(201).json(ordenAgregada)
        } catch (e) {
            logger.error('Error postOrder')
            next(e)
        }
    }
}