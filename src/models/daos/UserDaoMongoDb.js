const {MongoDbContainer} = require("../containers/MongoDbContainer")

class UserDaoMongo extends MongoDbContainer {
    constructor() {
        super('users', 'db')
    }

    async getByEmail(email) {
        return await this.collection.findOne({email: email})
    }
}

module.exports = UserDaoMongo