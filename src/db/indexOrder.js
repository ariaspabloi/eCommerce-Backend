import {dbmode, mongodb} from '../config.js';
import OrderDaoMongoDb from './daos/OrderDaoMongoDb.js'
import OrderDaoFirebase from "./daos/OrderDaoFirebase.js";

let orderDao;
if (dbmode === 'mongodb') {
    orderDao = new OrderDaoMongoDb()
} else if (dbmode === 'firebase') {
    orderDao = new OrderDaoFirebase()
} else {
    orderDao = new OrderDaoMongoDb()
}

export default orderDao;