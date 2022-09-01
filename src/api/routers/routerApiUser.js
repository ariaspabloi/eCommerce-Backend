import { Router } from 'express';
import { failRegisterController, successRegisterController, registerController } from '../controllers/authController.js';

const routerApiUser = new Router()

// register
routerApiUser.post('/', registerController)
routerApiUser.post('/successRegister', successRegisterController)
routerApiUser.post('/failRegister', failRegisterController)

export default routerApiUser;