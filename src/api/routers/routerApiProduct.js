import {Router} from 'express';
import {productController} from '../controllers/productController.js';
import requireAuthorization from '../middlewares/authorizationMiddleware.js';

const routerApiProduct = new Router()

routerApiProduct.get('/', productController.getProducts)
routerApiProduct.get('/:id', productController.getProduct)
routerApiProduct.post('/', requireAuthorization, productController.postProduct)
routerApiProduct.put('/:id', requireAuthorization, productController.putProduct)
routerApiProduct.delete('/:id', requireAuthorization, productController.deleteProduct)

export {routerApiProduct};