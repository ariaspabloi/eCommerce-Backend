const { Router } = require('express')
const express = require('express')
const { cartController } = require('../controllers/cartController')

const routerApiCart = new Router()

routerApiCart.use(express.json())
routerApiCart.use(express.urlencoded({ extended: true }))

routerApiCart.post('/',cartController.postNewCart)
routerApiCart.post('/:cartId/productos',cartController.postAddProduct)
routerApiCart.get('/:cartId/productos',cartController.getProducts)
routerApiCart.delete('/:cartId/productos/:productId',cartController.deleteProduct)
routerApiCart.delete('/:cartId',cartController.deleteEmptyCart)

module.exports = { routerApiCart }