import MessageDaoMongoDb from '../db/daos/MessageDaoMongoDb.js';
import messageRepo from '../db/repository/messageRepo.js'
import normalizr from 'normalizr';
import MessageRepo from "../db/repository/messageRepo.js";

const normalize = normalizr.normalize
const schema = normalizr.schema
const repo = new MessageRepo()

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
    await repo.save(msg);
}


export {getMessages, saveMessage};