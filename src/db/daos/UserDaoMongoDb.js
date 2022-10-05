import {MongoDbContainer} from '../containers/MongoDbContainer.js';

class UserDaoMongo extends MongoDbContainer {
    constructor() {
        super('users', 'db')
    }

    async getByEmail(email) {
        const {_id, ...object} = await this.collection.findOne({email: email})
        object.id = _id
        return object
    }

    async checkEmail(email) {
        try {
            const object = await this.collection.findOne({email: email})
            if (object) return true;
            return false;
        } catch (error) {
            return false;
        }
    }
}

export default UserDaoMongo;