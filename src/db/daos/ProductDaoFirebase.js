import {FirebaseContainer} from '../containers/FirebaseContainer.js';

class ProductDaoFirebase extends FirebaseContainer {
    constructor() {
        super('products')
    }
}

export default ProductDaoFirebase
