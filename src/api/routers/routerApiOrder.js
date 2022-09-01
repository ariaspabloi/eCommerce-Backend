import {Router} from 'express';
import {orderController} from '../controllers/orderController.js';
import requireAuthorization from '../middlewares/authorizationMiddleware.js';

const routerApiOrder = new Router()

routerApiOrder.get('/', requireAuthorization, orderController.getOrder)
routerApiOrder.post('/', requireAuthorization, orderController.postOrder)


export default routerApiOrder;