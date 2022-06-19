const {MongoDbContainer} = require("../containers/mongodbContainer") 

class CartDaoMongoDb extends MongoDbContainer{
    constructor(){
        super('carts','db')
    }
}

module.exports = CartDaoMongoDb