const { Router } = require('express')
const { orderController } = require('../controllers/orderController')
const requireAuthorization = require('../middlewares/authorizationMiddleware')

const routerApiOrder = new Router()

routerApiOrder.get('/', requireAuthorization, orderController.getOrder)
routerApiOrder.post('/', requireAuthorization, orderController.postOrder)


module.exports = routerApiOrder