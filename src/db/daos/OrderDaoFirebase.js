import {FirebaseContainer} from '../containers/FirebaseContainer.js';

class OrderDaoFirebase extends FirebaseContainer {
    constructor() {
        super('orders')
    }
}

export default OrderDaoFirebase
