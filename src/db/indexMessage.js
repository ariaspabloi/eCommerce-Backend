import {DBMODE, mongodb} from '../config.js'
import MessageDaoMongoDb from "./daos/MessageDaoMongoDb.js";
import MessageDaoFirebase from "./daos/MessageDaoFirebase.js";

let messageDao;
if (DBMODE === 'mongodb') {
    mongodb().connect()
    messageDao = new MessageDaoMongoDb()
} else if (DBMODE === 'firebase') {
    //messageDao = new MessageDaoFirebase()
    messageDao = new MessageDaoFirebase()
} else {
    mongodb().connect()
    messageDao = new MessageDaoMongoDb()
}

export default messageDao;