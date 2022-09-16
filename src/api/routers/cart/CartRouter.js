import {Router} from 'express';

export default class CartRouter {
    #router

    constructor(controller) {
        this.#router = new Router()
            .post('/', controller.postAddProduct)
            .get('/', controller.getProducts)
            .delete('/:productId', controller.deleteProduct)
            .delete('/empty', controller.deleteEmptyCart);
    }

    get() {
        return this.#router
    }
}