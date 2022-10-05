import {dbmode, mongodb} from '../config.js'
import MessageDaoMongoDb from "./daos/MessageDaoMongoDb.js";
import MessageDaoFirebase from "./daos/MessageDaoFirebase.js";

let messageDao;
if (dbmode === 'mongodb') {
    messageDao = new MessageDaoMongoDb()
} else if (dbmode === 'firebase') {
    messageDao = new MessageDaoFirebase()
} else {
    messageDao = new MessageDaoMongoDb()
}

export default messageDao;