import {DBMODE, mongodb} from '../config.js';
import OrderDaoMongoDb from './daos/OrderDaoMongoDb.js'
import ProductDaoFirebase from './daos/ProductDaoFirebase.js'

let orderDao;
if (DBMODE === 'mongodb') {
    mongodb().connect()
    orderDao = new OrderDaoMongoDb()
} else if (DBMODE === 'firebase') {
    orderDao = ProductDaoFirebase()
} else {
    mongodb().connect()
    orderDao = new OrderDaoMongoDb()
}

export default orderDao;