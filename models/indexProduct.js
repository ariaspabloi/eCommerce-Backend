const {MODE,mongodb} = require('../config.js')

const productDao = {
    firebase: async() => {
        const ProductDaoFirebase =  require('./daos/ProductDaoFirebase.js')
        return new ProductDaoFirebase()
    },
    mongodb: () => {
        mongodb.connect()
        const ProductsDaoMongoDb =  require('./daos/ProductDaoMongoDb.js')
        return ProductsDaoMongoDb()
    }
}


module.exports = {productDao}