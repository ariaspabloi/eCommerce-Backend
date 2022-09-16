import {MongoDbContainer} from '../containers/MongoDbContainer.js';

class ProductDaoMongo extends MongoDbContainer {
    constructor() {
        super('products', 'db')
    }
}

export default ProductDaoMongo;