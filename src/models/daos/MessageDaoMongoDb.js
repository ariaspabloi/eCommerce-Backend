const { MongoDbContainer } = require("../containers/MongoDbContainer")

class MessageDaoMongoDb extends MongoDbContainer {
    constructor() {
        super('messages', 'db')
    }
}

module.exports = MessageDaoMongoDb