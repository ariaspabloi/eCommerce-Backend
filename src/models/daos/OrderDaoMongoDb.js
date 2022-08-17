const { MongoDbContainer } = require("../containers/MongoDbContainer")
const {ObjectId} = require("mongodb");

class OrderDaoMongoDb extends MongoDbContainer {
    constructor() {
        super('orders', 'db')
    }
}

module.exports = OrderDaoMongoDb