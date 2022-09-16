import {Router} from "express";

export class UserRouter {
    #router

    constructor(controller) {
        this.#router = new Router()
            .post('/', controller.registerController)
    }

    get() {
        return this.#router
    }
}