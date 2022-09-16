import { Router } from 'express';
import { webGetController, loginGetController, byeGetController } from '../controllers/web/webController.js';

const router = new Router()

router.get('/', webGetController)
router.get('/login', loginGetController)
router.get('/bye', byeGetController)


export default router;