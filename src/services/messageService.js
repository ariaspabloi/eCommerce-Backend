const normalizr = require("normalizr")
const normalize = normalizr.normalize
const schema = normalizr.schema
const MessageDaoMongoDb = require('../models/daos/MessageDaoMongoDb')
const messageDao = new MessageDaoMongoDb()
const author = new schema.Entity('authors', {}, { idAttribute: 'email' });
const message = new schema.Entity('messages', {
    author: author
});

async function getMessages() {
    let msgs = await messageDao.getAll()
    msgs.forEach(m => m.id = m._id.toHexString())
    return normalize(msgs, [message]);
}

async function saveMessage(msg) {
    await messageDao.save(msg);
}




module.exports = { getMessages, saveMessage }


/*
const { MessageDao } = require('../persistence/MessageDao');
const { sqlite3 } = require('../options/dbConnections')
const messageDao = new MessageDao(sqlite3);
let messages;

async function startMessagesService() {
    await messageDao.createTable();
    messages = await messageDao.getAll();
}

async function getMessages() {
    messages = await messageDao.getAll();
    messages = messages.map(m => JSON.parse(JSON.stringify(m)))
    return messages;
}

async function saveMessage(msg) {
    await messageDao.save(msg);
}
module.exports = { getMessages, saveMessage, startMessagesService }

*/

/*
const { MessageDao } = require('../persistence/MessageDao');
const messageDao = new MessageDao("messages.txt");
let messages = messageDao.getAll();

async function getMessages(){
    messages = await messageDao.getAll();
    return messages;
}

async function saveMessage(msg){
    await messageDao.save(msg);
}
module.exports = { getMessages,saveMessage }


*/