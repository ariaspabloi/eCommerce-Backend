import {DBMODE, mongodb} from '../config.js';
import OrderDaoMongoDb from './daos/OrderDaoMongoDb.js'
import OrderDaoFirebase from "./daos/OrderDaoFirebase.js";

let orderDao;
if (DBMODE === 'mongodb') {
    mongodb().connect()
    orderDao = new OrderDaoMongoDb()
} else if (DBMODE === 'firebase') {
    orderDao = new OrderDaoFirebase()
} else {
    mongodb().connect()
    orderDao = new OrderDaoMongoDb()
}

export default orderDao;