const {MODE,mongodb} = require('../config.js')

const messageDao = {
    mongodb: async() => {
        mongodb.connect()
        const MessageDaoMongoDb =  require('./daos/MessageDaoMongoDb.js')
        return new MessageDaoMongoDb()
    },
    firebase: () => {
        const CartDaoFirebase =  require('./daos/CartDaoFirebase.js')
        return new CartDaoFirebase()
    }
}

module.exports = messageDao[MODE]