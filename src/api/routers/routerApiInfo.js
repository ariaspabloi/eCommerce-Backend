import {Router} from 'express';
import {infoGetController} from '../controllers/infoController.js';
import requireAuthorization from '../middlewares/authorizationMiddleware.js';

const routerApiInfo = new Router()

routerApiInfo.get('/', requireAuthorization, infoGetController)

export default routerApiInfo;