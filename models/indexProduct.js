const {MODE,mongodb} = require('../config.js')


let productDao

switch (MODE) {
    case 'json':
        //const { default: PersonasDaoArchivo } = await import('./PersonasDaoArchivo.js')
        //personasDao = new PersonasDaoArchivo(config.fileSystem.path)
        break
    case 'firebase':
        const ProductDaoFirebase =  require('./daos/ProductDaoFirebase.js')
        productDao = new ProductDaoFirebase()
        break
    case 'mongodb':
        mongodb.connect()
        const ProductsDaoMongoDb =  require('./daos/ProductDaoMongoDb.js')
        productDao = new ProductsDaoMongoDb()
        break
    default:
        //const { default: PersonasDaoMem } = await import('./PersonasDaoMem.js')
        //personasDao = new PersonasDaoMem()
        break
}

module.exports = {productDao}