const { Router } = require('express')
const express = require('express')
const { apiControllers } = require('../controllers/apiControllers.js')

const routerApiProducts = new Router()

routerApiProducts.use(express.json())
routerApiProducts.use(express.urlencoded({ extended: true }))

routerApiProducts.get('/', apiControllers.getProducts)
routerApiProducts.get('/:id', apiControllers.getProduct)
routerApiProducts.post('/', apiControllers.postProduct)
routerApiProducts.put('/:id', apiControllers.putProduct)
routerApiProducts.delete('/:id', apiControllers.deleteProduct)

module.exports = { routerApiProducts }