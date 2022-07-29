const { Router } = require('express')
const { productController } = require('../controllers/productController')

const routerApiProduct = new Router()

routerApiProduct.get('/', productController.getProducts)
routerApiProduct.get('/:id', productController.getProduct)
routerApiProduct.post('/', productController.postProduct)
routerApiProduct.put('/:id', productController.putProduct)
routerApiProduct.delete('/:id', productController.deleteProduct)

module.exports = { routerApiProduct }