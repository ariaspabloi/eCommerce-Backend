const {MongoDbContainer} = require("../containers/MongoDbContainer")

class CartDaoMongoDb extends MongoDbContainer {
    constructor() {
        super('carts', 'db')
    }
}

module.exports = CartDaoMongoDb