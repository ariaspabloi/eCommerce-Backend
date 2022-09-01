import { Router } from 'express';

import {
    failLoginController,
    successLoginController,
    loginController,
    logoutController,
} from '../controllers/authController.js';

const routerAuth = new Router()

// login
routerAuth.post('/login', loginController)
routerAuth.post('/successLogin', successLoginController)
routerAuth.post('/failLogin', failLoginController)

// logout
routerAuth.get('/logout', logoutController)

export default routerAuth;