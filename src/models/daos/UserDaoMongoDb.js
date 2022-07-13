const { MongoDbContainer } = require("../containers/MongoDbContainer")
const {ObjectId} = require("mongodb");

class UserDaoMongo extends MongoDbContainer {
    constructor() {
        super('users', 'db')
    }

    async getByUsername(username){
        return await this.collection.findOne({username: username})
    }
    async validateUniqueUsername(username) {
        const user = await this.getByUsername(username)
        if (user) throw new Error('el nombre de usuario no está disponible')
    }
}

module.exports = UserDaoMongo