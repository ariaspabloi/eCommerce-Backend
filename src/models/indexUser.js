const { MODE, mongodb } = require('../config.js')

const userDao = {
    mongodb: () => {
        mongodb.connect()
        const UserDaoMongoDb = require('./daos/UserDaoMongoDb.js')
        return new UserDaoMongoDb()
    },
    firebase: async () => {
        //const ProductDaoFirebase = require('./daos/ProductDaoFirebase.js')
        //return new ProductDaoFirebase()
    }
}


module.exports = userDao[MODE]()