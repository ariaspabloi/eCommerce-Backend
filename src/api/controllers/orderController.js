const {getUserById} = require("../../services/userService")
const {saveOrder, getAllOrders} = require("../../services/orderService")
const logger = require('../../util/logger')
const {registerOrder} = require('../../services/orderService')
const testMSG = "API Test /";

const orderController = {
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
            const ordenAgregada = await saveOrder(req.body);
            const {email, name, lastname, phone, _id} = await getUserById((await req.user)._id)
            registerOrder(_id, email, name, lastname, phone)
            res.status(201).json(ordenAgregada)
        } catch (error) {
            logger.error('Error postOrder')
            res.status(404).json({error: error.message})
        }
    }
}

module.exports = {orderController}