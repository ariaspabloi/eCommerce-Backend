import {Router} from "express";

export class AuthRouter {
    #router

    constructor(controller) {
        this.#router = new Router()
            .post('/login', controller.loginController)
            .get('/logout', controller.logoutController);
    }

    get() {
        return this.#router
    }
}
