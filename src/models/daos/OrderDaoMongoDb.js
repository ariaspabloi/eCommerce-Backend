const {MongoDbContainer} = require("../containers/MongoDbContainer")

class OrderDaoMongoDb extends MongoDbContainer {
    constructor() {
        super('orders', 'db')
    }
}

module.exports = OrderDaoMongoDb