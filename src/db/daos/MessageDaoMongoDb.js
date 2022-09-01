import {MongoDbContainer} from '../containers/MongoDbContainer.js';

class MessageDaoMongoDb extends MongoDbContainer {
    constructor() {
        super('messages', 'db')
    }
}

export default MessageDaoMongoDb;