import {faker} from '@faker-js/faker';
import {Router} from 'express';

const generateProducts = (cantity) => {
    const products = []
    let id = 0;
    for (let i = 0; i < cantity; i++) {
        products.push({
            id: ++id,
            title: faker.commerce.product(),
            price: faker.datatype.number(),
            thumbnail: faker.image.imageUrl(640, 480, 'item')
        })
    }
    return products
}

export default class MockupRouter {
    #router

    constructor() {
        this.#router = new Router().get('/', (req, res) => {
            try {
                res.json(generateProducts(5))
            } catch (error) {
                res.status(404).json({error: error.message})
            }
        });
    }

    get() {
        return this.#router
    }
}