const { MODE, mongodb } = require('../config.js')

const cartDao = {
    mongodb: () => {
        mongodb.connect()
        const CartDaoMongoDb = require('./daos/CartDaoMongoDb.js')
        return new CartDaoMongoDb()
    },
    firebase: async() => {
        const { default: PersonasDaoMem } = await import('./PersonasDaoMem.js')
        return new PersonasDaoMem()
    }
}

module.exports = cartDao[MODE] 