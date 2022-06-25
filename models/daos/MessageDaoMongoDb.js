const {MongoDbContainer} = require("../containers/mongodbContainer") 

class MessageDaoMongoDb extends MongoDbContainer{
    constructor(){
        super('messages','db')
    }
}

module.exports = MessageDaoMongoDb