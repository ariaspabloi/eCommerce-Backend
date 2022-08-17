const { DBMODE, mongodb } = require('../config.js')

const cartDao = {
    mongodb: () => {
        mongodb.connect()
        const CartDaoMongoDb = require('./daos/CartDaoMongoDb.js')
        return new CartDaoMongoDb()
    },
    firebase: async () => {
        const CartDaoFirebase = require('./daos/CartDaoFirebase.js')
        return new CartDaoFirebase()
    }
}

module.exports = cartDao[DBMODE]()