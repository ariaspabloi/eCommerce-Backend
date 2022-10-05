import {dbmode, mongodb} from '../config.js';
import UserDaoMongoDb from './daos/UserDaoMongoDb.js'
import UserDaoFirebase from "./daos/UserDaoFirebase.js";

let userDao;
if (dbmode === 'mongodb') {
    userDao = new UserDaoMongoDb()
} else if (dbmode === 'firebase') {
    userDao = new UserDaoFirebase()
} else {
    userDao = new UserDaoMongoDb()
}

export default userDao;