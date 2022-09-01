import {Router} from 'express';
import {cartController} from '../controllers/cartController.js';

const routerApiCart = new Router()
//id del carrito en la sesion
routerApiCart.post('/', cartController.postAddProduct)
routerApiCart.get('/', cartController.getProducts)
routerApiCart.delete('/:productId', cartController.deleteProduct)
routerApiCart.delete('/empty', cartController.deleteEmptyCart)

export {routerApiCart};