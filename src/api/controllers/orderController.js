import {getUserById} from '../../services/userService.js';
import {getAllOrders} from '../../services/orderService.js';
import logger from '../../util/logger.js';
import {registerOrder} from '../../services/orderService.js';

const testMSG = "API Test /";

export const orderController = {
    info: (req, res) => {
        res.json(testMSG)
    },
    getOrder: async (req, res) => {
        try {
            const orders = await getAllOrders()
            return res.json(orders);
        } catch (error) {
            logger.error('Error getOrder')
            if (error.tipo === 'db not found') {
                res.status(404).json({error: error.message})
            } else {
                res.status(500).json({error: error.message})
            }
        }
    },
    postOrder: async (req, res) => {
        try {
            const {email, name, lastname, phone, id} = await getUserById((await req.user).id)
            const ordenAgregada = registerOrder(id, email, name, lastname, phone)
            res.status(201).json(ordenAgregada)
        } catch (error) {
            logger.error('Error postOrder')
            res.status(404).json({error: error.message})
        }
    }
}