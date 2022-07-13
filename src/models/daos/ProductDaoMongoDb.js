const { MongoDbContainer } = require("../containers/MongoDbContainer")

class ProductDaoMongo extends MongoDbContainer {
    constructor() {
        super('products', 'db')
    }
}

module.exports = ProductDaoMongo