const { Router } = require('express')
const {infoGetController} = require('../controllers/infoController')
const requireAuthorization = require('../middlewares/authorizationMiddleware')
const routerApiInfo = new Router()

routerApiInfo.get('/', requireAuthorization ,infoGetController)

module.exports = routerApiInfo