const { faker } = require('@faker-js/faker')
const { Router } = require('express')

const routerApiMockup = new Router()

routerApiMockup.get('/', (req, res) => {
    try {
        res.json(generateProducts(5))
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})

const generateProducts = (cantity) => {
    const products = []
    let id=0;
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
module.exports = { routerApiMockup }