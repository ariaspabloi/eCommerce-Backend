const { MessageDao } = require('./MessageDao');
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

