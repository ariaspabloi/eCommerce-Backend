import {DBMODE, mongodb} from '../config.js';
import UserDaoMongoDb from './daos/UserDaoMongoDb.js'

let userDao;
if (DBMODE === 'mongodb') {
    mongodb().connect()
    userDao = new UserDaoMongoDb()
} else if (DBMODE === 'firebase') {
    //userDao = new UserDaoFireBase()
    userDao = new UserDaoMongoDb()
} else {
    mongodb().connect()
    userDao = new UserDaoMongoDb()
}

export default userDao;