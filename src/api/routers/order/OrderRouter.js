import {Router} from 'express';
import {requireAuthorization} from '../../middlewares/authorizationMiddleware.js';

export default class OrderRouter {
    #router

    constructor(controller) {
        this.#router = new Router()
            .get('/', requireAuthorization, controller.getOrder)
            .post('/', requireAuthorization, controller.postOrder);
    }

    get() {
        return this.#router
    }
}