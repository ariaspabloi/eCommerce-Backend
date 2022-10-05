import {Router} from 'express';
import {webGetController, webServerInfoController} from '../controllers/web/webController.js';

const router = new Router()

router.get('/', webGetController)
router.get('/server-info', webServerInfoController)

export default router;