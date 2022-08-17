const { DBMODE, mongodb } = require('../config.js')

const messageDao = {
    mongodb: () => {
        mongodb.connect()
        const MessageDaoMongoDb = require('./daos/MessageDaoMongoDb.js')
        return new MessageDaoMongoDb()
    },
    firebase: () => {
        const MessageDaoFirebase = require('./daos/MessageDaoFirebase.js')
        return new MessageDaoFirebase()
    }
}

module.exports = messageDao[DBMODE]()