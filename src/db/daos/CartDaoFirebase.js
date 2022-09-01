import {FirebaseContainer} from '../containers/FirebaseContainer.js';

class CartDaoFirebase extends FirebaseContainer {
    constructor() {
        super('carts')
    }
}

export default CartDaoFirebase;