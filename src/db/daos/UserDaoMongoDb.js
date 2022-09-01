import {MongoDbContainer} from '../containers/MongoDbContainer.js';

class UserDaoMongo extends MongoDbContainer {
    constructor() {
        super('users', 'db')
    }

    async getByEmail(email) {
        return await this.collection.findOne({email: email})
    }
}

export default UserDaoMongo;