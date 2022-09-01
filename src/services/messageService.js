import normalizr from 'normalizr';

const normalize = normalizr.normalize
const schema = normalizr.schema
import MessageDaoMongoDb from '../db/daos/MessageDaoMongoDb.js';

const messageDao = new MessageDaoMongoDb()
const author = new schema.Entity('authors', {}, {idAttribute: 'email'});
const message = new schema.Entity('messages', {
    author: author
});

async function getMessages() {
    let msgs = await messageDao.getAll()
    return normalize(msgs, [message]);
}

async function saveMessage(msg) {
    await messageDao.save(msg);
}


export {getMessages, saveMessage};