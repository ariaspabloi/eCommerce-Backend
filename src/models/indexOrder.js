const { DBMODE, mongodb } = require('../config.js')

const orderDao = {
    mongodb: () => {
        mongodb.connect()
        const OrderDaoMongoDb = require('./daos/OrderDaoMongoDb.js')
        return new OrderDaoMongoDb()
    },
    firebase: async () => {
        //const ProductDaoFirebase = require('./daos/ProductDaoFirebase.js')
        //return new ProductDaoFirebase()
    }
}


module.exports = orderDao[DBMODE]()