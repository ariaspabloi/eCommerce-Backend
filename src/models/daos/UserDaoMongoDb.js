const { MongoDbContainer } = require("../containers/MongoDbContainer")
const {ObjectId} = require("mongodb");

class UserDaoMongo extends MongoDbContainer {
    constructor() {
        super('users', 'db')
    }

    async getByEmail(email){
        return await this.collection.findOne({email: email})
    }
    async validateUniqueEmail(email) {
        const user = await this.getByEmail(email)
        if (user) throw new Error('el nombre de usuario no está disponible')
    }
}

module.exports = UserDaoMongo