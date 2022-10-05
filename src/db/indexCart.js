import {dbmode, mongodb} from '../config.js';
import CartDaoMongoDb from './daos/CartDaoMongoDb.js'
import CartDaoFirebase from './daos/CartDaoFirebase.js'

let cartDao;
if (dbmode === 'mongodb') {
    cartDao = new CartDaoMongoDb()
} else if (dbmode === 'firebase') {
    cartDao = new CartDaoFirebase()
} else {
    cartDao = new CartDaoMongoDb()
}

export default cartDao;