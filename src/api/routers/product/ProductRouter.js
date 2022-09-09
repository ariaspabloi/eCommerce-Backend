import {Router} from 'express';
import requireAuthorization from '../../middlewares/authorizationMiddleware.js';


export default class ProductRouter {
    #router

    constructor(controller) {
        this.#router = new Router()
            .get('/', controller.getProducts)
            .get('/:id', controller.getProduct)
            .post('/', requireAuthorization, controller.postProduct)
            .put('/:id', requireAuthorization, controller.putProduct)
            .delete('/:id', requireAuthorization, controller.deleteProduct);
    }

    get() {
        return this.#router
    }
}