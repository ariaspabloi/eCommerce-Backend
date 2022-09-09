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

    getOrder = async (req, res) => {
        try {
            const orders = await this.#service.getAllOrders()
            return res.status(201).json(orders);
        } catch (error) {
            logger.error('Error getOrder')
            if (error.tipo === 'db not found') {
                res.status(404).json({error: error.message})
            } else {
                res.status(500).json({error: error.message})
            }
        }
    }

    postOrder = async (req, res) => {
        try {
            const {email, name, lastname, phone, id} = await this.#userService.getUserById((await req.user).id)
            const ordenAgregada = this.#service.registerOrder(id, email, name, lastname, phone)
            res.status(201).json(ordenAgregada)
        } catch (error) {
            logger.error('Error postOrder')
            res.status(404).json({error: error.message})
        }
    }
}