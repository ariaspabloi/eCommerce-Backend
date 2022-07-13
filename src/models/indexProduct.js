const { MODE, mongodb } = require('../config.js')

const productDao = {
    mongodb: () => {
        mongodb.connect()
        const ProductsDaoMongoDb = require('./daos/ProductDaoMongoDb.js')
        return new ProductsDaoMongoDb()
    },
    firebase: async () => {
        const ProductDaoFirebase = require('./daos/ProductDaoFirebase.js')
        return new ProductDaoFirebase()
    }
}


module.exports = productDao[MODE]()