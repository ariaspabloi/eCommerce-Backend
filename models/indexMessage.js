const {MODE,mongodb} = require('../config.js')


let messageDao

switch (MODE) {
    case 'json':
        //const { default: PersonasDaoArchivo } = await import('./PersonasDaoArchivo.js')
        //personasDao = new PersonasDaoArchivo(config.fileSystem.path)
        break
    case 'firebase':
        //const CartDaoFirebase =  require('./daos/CartDaoFirebase.js')
        //cartDao = new CartDaoFirebase()
        break
    case 'mongodb':
        mongodb.connect()
        const MessageDaoMongoDb =  require('./daos/MessageDaoMongoDb.js')
        messageDao = new MessageDaoMongoDb()
        break
    default:
        //const { default: PersonasDaoMem } = await import('./PersonasDaoMem.js')
        //personasDao = new PersonasDaoMem()
        break
}

module.exports = {messageDao}