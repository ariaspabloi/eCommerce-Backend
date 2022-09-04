import messageDao from '../db/indexMessage.js';
import normalizr from 'normalizr';
import MessageRepo from "../db/repository/messageRepo.js";

const normalize = normalizr.normalize
const schema = normalizr.schema
const repo = new MessageRepo()

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