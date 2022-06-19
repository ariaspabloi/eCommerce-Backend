const {FirebaseContainer} = require("../containers/FireBaseContainer") 

class CartDaoFirebase extends FirebaseContainer{
    constructor(){
        super('carts')
    }
}

module.exports = CartDaoFirebase