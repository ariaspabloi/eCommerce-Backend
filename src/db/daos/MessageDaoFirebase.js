import {FirebaseContainer} from '../containers/FirebaseContainer.js';

class MessageDaoFirebase extends FirebaseContainer {
    constructor() {
        super('messages')
    }
}

export default MessageDaoFirebase;