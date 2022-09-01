import {DBMODE, mongodb} from '../config.js';
import CartDaoMongoDb from './daos/CartDaoMongoDb.js'
import CartDaoFirebase from './daos/CartDaoFirebase.js'

let cartDao;
if (DBMODE === 'mongodb') {
    mongodb().connect()
    cartDao = new CartDaoMongoDb()
} else if (DBMODE === 'firebase') {
    cartDao = new CartDaoFirebase()
} else {
    mongodb().connect()
    cartDao = new CartDaoMongoDb()
}

export default cartDao;