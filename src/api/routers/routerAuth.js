const {Router} = require('express')

const {
    failLoginController,
    successLoginController,
    failRegisterController,
    successRegisterController,
    registerController,
    loginController,
    logoutController
} = require('../controllers/authController.js')

const routerAuth = new Router()
// register
routerAuth.post('/register', registerController)
routerAuth.post('/successRegister', successRegisterController)
routerAuth.post('/failRegister', failRegisterController)

// login
routerAuth.post('/login', loginController)
routerAuth.post('/successLogin', successLoginController)
routerAuth.post('/failLogin', failLoginController)

// logout
routerAuth.get('/logout', logoutController)

module.exports = routerAuth