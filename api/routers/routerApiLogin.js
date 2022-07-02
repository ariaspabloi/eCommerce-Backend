const { Router } = require('express')
const express = require('express')
const { loginController } = require('../controllers/loginController')
const routerApiLogin = new Router()
routerApiLogin.use(express.json())
routerApiLogin.use(express.urlencoded({ extended: true }))
routerApiLogin.post('/login', loginController.postLogin)
routerApiLogin.get('/logout', loginController.getLogout)
routerApiLogin.get('/logininfo', loginController.getInfo)

module.exports = { routerApiLogin }