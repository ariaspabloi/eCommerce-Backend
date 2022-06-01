const { Router } = require('express')
const express = require('express')
const { productController } = require('../controllers/productController')
const { onlyAdmin } = require('../middlewares/adminMiddleware')

const routerApiProduct = new Router()

routerApiProduct.use(express.json())
routerApiProduct.use(express.urlencoded({ extended: true }))

routerApiProduct.get('/', productController.getProducts)
routerApiProduct.get('/:id', productController.getProduct)
routerApiProduct.post('/', onlyAdmin, productController.postProduct)
routerApiProduct.put('/:id', onlyAdmin, productController.putProduct)
routerApiProduct.delete('/:id', onlyAdmin, productController.deleteProduct)

module.exports = { routerApiProduct }