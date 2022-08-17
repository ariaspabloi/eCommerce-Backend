const { Router } = require('express')
const { cartController } = require('../controllers/cartController')

const routerApiCart = new Router()
//id del carrito en la sesion
routerApiCart.post('/',cartController.postAddProduct)
routerApiCart.get('/',cartController.getProducts)
routerApiCart.delete('/:productId',cartController.deleteProduct)
routerApiCart.delete('/empty',cartController.deleteEmptyCart)

module.exports = { routerApiCart }