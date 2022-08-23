const {mongodb} = require("../../config")
const {generateId} = require("../../util/helpers");
const ObjectId = require('mongodb').ObjectId;

class MongoDbContainer {
    constructor(collectionName, dbName) {
        this.collection = (mongodb.db(dbName)).collection(collectionName)
    }

    async getAll() {
        const objects = await this.collection.find().toArray()
        objects.forEach(o => o._id = o._id.toString())
        return objects
    }

    async getById(id) {
        const object = await this.collection.findOne({_id: new ObjectId(id)})
        object._id = object._id.toString()
        return object
    }

    async save(object) {
        if (object._id && typeof object._id === 'string') object._id = new ObjectId(object._id)
        const saved = await this.collection.insertOne(object);
        return {...object, _id: saved.insertedId.toString()}
    }

    async update(object, id) {
        await this.collection.updateOne({_id: new ObjectId(id)}, {$set: object})
    }

    async deleteById(id) {
        await this.collection.deleteOne({_id: new ObjectId(id)})
    }

    async deleteAll() {
        await this.collection.deleteMany({});
    }
}

module.exports = {MongoDbContainer}