const {MODE,mongodb} = require('../config.js')


let cartDao

switch (MODE) {
    case 'json':
        //const { default: PersonasDaoArchivo } = await import('./PersonasDaoArchivo.js')
        //personasDao = new PersonasDaoArchivo(config.fileSystem.path)
        break
    case 'firebase':
        const CartDaoFirebase =  require('./daos/CartDaoFirebase.js')
        cartDao = new CartDaoFirebase()
        break
    case 'mongodb':
        mongodb.connect()
        const CartDaoMongoDb =  require('./daos/CartDaoMongoDb.js')
        cartDao = new CartDaoMongoDb()
        break
    default:
        //const { default: PersonasDaoMem } = await import('./PersonasDaoMem.js')
        //personasDao = new PersonasDaoMem()
        break
}

module.exports = {cartDao}