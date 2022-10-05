import {Router} from 'express';
import {requireAdminAuthorization} from '../../middlewares/authorizationMiddleware.js';


export default class ProductRouter {
    #router

    constructor(controller) {
        this.#router = new Router()
            .get('/', controller.getProducts)
            .get('/:id', controller.getProduct)
            .post('/', requireAdminAuthorization, controller.postProduct)
            .put('/:id', requireAdminAuthorization, controller.putProduct)
            .delete('/:id', requireAdminAuthorization, controller.deleteProduct);
    }

    get() {
        return this.#router
    }
}