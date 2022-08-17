const {Router} = require('express')

const {
    failRegisterController,
    successRegisterController,
    registerController
} = require('../controllers/authController.js')

const routerApiUser = new Router()

// register
routerApiUser.post('/', registerController)
routerApiUser.post('/successRegister', successRegisterController)
routerApiUser.post('/failRegister', failRegisterController)

module.exports = routerApiUser