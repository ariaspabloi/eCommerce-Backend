import {Router} from "express";

export class AuthRouter {
    #router

    constructor(controller) {
        this.#router = new Router()
            .post('/successRegister', controller.successRegisterController)
            .post('/failRegister', controller.failRegisterController)
            .post('/login', controller.loginController)
            .get('/successLogin', controller.successLoginController)
            .get('/failLogin', controller.failLoginController)
            .get('/logout', controller.logoutController);
    }

    get() {
        return this.#router
    }
}