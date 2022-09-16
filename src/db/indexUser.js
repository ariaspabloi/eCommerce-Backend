import {DBMODE, mongodb} from '../config.js';
import UserDaoMongoDb from './daos/UserDaoMongoDb.js'
import UserDaoFirebase from "./daos/UserDaoFirebase.js";

let userDao;
if (DBMODE === 'mongodb') {
    mongodb().connect()
    userDao = new UserDaoMongoDb()
} else if (DBMODE === 'firebase') {
    userDao = new UserDaoFirebase()
} else {
    mongodb().connect()
    userDao = new UserDaoMongoDb()
}

export default userDao;