import {mongodb} from '../../config.js';

export class MongoDbContainer {
    constructor(collectionName, dbName) {
        this.collection = (mongodb.db(dbName)).collection(collectionName)
    }

    async getAll() {
        const objects = await this.collection.find().toArray()
        objects.forEach(o => {
            o.id = o._id
            delete o._id
        })
        return objects
    }

    async getById(id) {
        const object = await this.collection.findOne({_id: id})
        if (object) {
            object.id = object._id
            delete object._id
        }
        return object
    }

    async save(object) {
        const o = {...object}
        o._id = o.id
        delete o.id
        const saved = await this.collection.insertOne(o);
        return object;
    }

    async update(object, id) {
        object = {...object}
        if (object.id) {
            delete object.id
        }
        await this.collection.updateOne({_id: id}, {$set: object})
    }

    async deleteById(id) {
        await this.collection.deleteOne({_id: id})
    }

    async deleteAll() {
        await this.collection.deleteMany({});
    }
}