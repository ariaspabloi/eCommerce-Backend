const {Router} = require('express')

const {
    failLoginController,
    successLoginController,
    loginController,
    logoutController
} = require('../controllers/authController.js')

const routerAuth = new Router()

// login
routerAuth.post('/login', loginController)
routerAuth.post('/successLogin', successLoginController)
routerAuth.post('/failLogin', failLoginController)

// logout
routerAuth.get('/logout', logoutController)

module.exports = routerAuth