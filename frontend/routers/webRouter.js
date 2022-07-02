const { Router } = require('express')
const { webGetController, loginGetController, byeGetController } = require('../controllers/web/webController.js')

const router = new Router()

router.get('/', webGetController)
router.get('/login', loginGetController)
router.get('/bye', byeGetController)


module.exports = router