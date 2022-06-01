const { Router } = require('express')
const { webGetController } = require('../controllers/web/webController.js')

const router = new Router()

router.get('/', webGetController)

module.exports = router