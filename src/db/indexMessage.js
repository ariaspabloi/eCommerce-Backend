import {DBMODE, mongodb} from '../config.js'
import MessageDaoMongoDb from "./daos/MessageDaoMongoDb.js";

let messageDao;
if (DBMODE === 'mongodb') {
    mongodb().connect()
    messageDao = new MessageDaoMongoDb()
} else if (DBMODE === 'firebase') {
    //messageDao = new MessageDaoFirebase()
    messageDao = new MessageDaoMongoDb()
} else {
    mongodb().connect()
    messageDao = new MessageDaoMongoDb()
}

export default messageDao;