const { Router } = require('express')
const { cartController } = require('../controllers/cartController')

const routerApiCart = new Router()

routerApiCart.post('/',cartController.postNewCart)
routerApiCart.post('/:cartId/productos',cartController.postAddProduct)
routerApiCart.get('/:cartId/productos',cartController.getProducts)
routerApiCart.delete('/:cartId/productos/:productId',cartController.deleteProduct)
routerApiCart.delete('/:cartId',cartController.deleteEmptyCart)

module.exports = { routerApiCart }