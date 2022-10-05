import {dbmode, mongodb} from '../config.js';
import ProductsDaoMongoDb from './daos/ProductDaoMongoDb.js'
import ProductDaoFirebase from './daos/ProductDaoFirebase.js'

let productDao;
if (dbmode === 'mongodb') {
    productDao = new ProductsDaoMongoDb()
} else if (dbmode === 'firebase') {
    productDao = new ProductDaoFirebase()
} else {
    productDao = new ProductsDaoMongoDb()
}

export default productDao;