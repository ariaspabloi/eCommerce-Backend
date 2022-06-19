const {MongoDbContainer} = require("../containers/mongodbContainer") 

class ProductDaoMongo extends MongoDbContainer{
    constructor(){
        super('products','db')
    }
}

module.exports = ProductDaoMongo