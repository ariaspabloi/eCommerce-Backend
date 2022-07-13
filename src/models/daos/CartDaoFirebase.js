const {FirebaseContainer} = require("../containers/FirebaseContainer")

class CartDaoFirebase extends FirebaseContainer{
    constructor(){
        super('carts')
    }
}

module.exports = CartDaoFirebase