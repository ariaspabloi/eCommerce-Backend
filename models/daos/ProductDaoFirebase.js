const {FirebaseContainer} = require("../containers/FireBaseContainer") 

class ProductDaoFirebase extends FirebaseContainer{
    constructor(){
        super('products')
    }
}

module.exports = ProductDaoFirebase