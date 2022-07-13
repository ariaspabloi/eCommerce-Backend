const {FirebaseContainer} = require("../containers/FirebaseContainer")

class ProductDaoFirebase extends FirebaseContainer{
    constructor(){
        super('products')
    }
}

module.exports = ProductDaoFirebase