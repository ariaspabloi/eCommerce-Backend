import {MongoDbContainer} from '../containers/MongoDbContainer.js';

class OrderDaoMongoDb extends MongoDbContainer {
    constructor() {
        super('orders', 'db')
    }
}

export default OrderDaoMongoDb;