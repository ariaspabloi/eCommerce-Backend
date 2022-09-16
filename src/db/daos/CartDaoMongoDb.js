import {MongoDbContainer} from '../containers/MongoDbContainer.js';

class CartDaoMongoDb extends MongoDbContainer {
    constructor() {
        super('carts', 'db')
    }
}

export default CartDaoMongoDb;