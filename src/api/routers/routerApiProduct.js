const { Router } = require('express')
const { productController } = require('../controllers/productController')
const requireAuthorization = require('../middlewares/authorizationMiddleware')

const routerApiProduct = new Router()

routerApiProduct.get('/', productController.getProducts)
routerApiProduct.get('/:id', productController.getProduct)
routerApiProduct.post('/', requireAuthorization, productController.postProduct)
routerApiProduct.put('/:id', requireAuthorization, productController.putProduct)
routerApiProduct.delete('/:id', requireAuthorization, productController.deleteProduct)

module.exports = { routerApiProduct }