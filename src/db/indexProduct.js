import {DBMODE, mongodb} from '../config.js';
import ProductsDaoMongoDb from './daos/ProductDaoMongoDb.js'
import ProductDaoFirebase from './daos/ProductDaoFirebase.js'

let productDao;
if (DBMODE === 'mongodb') {
    mongodb().connect()
    productDao = new ProductsDaoMongoDb()
} else if (DBMODE === 'firebase') {
    productDao = new ProductDaoFirebase()
} else {
    mongodb().connect()
    productDao = new ProductsDaoMongoDb()
}

export default productDao;