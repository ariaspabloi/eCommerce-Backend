import {mongodb} from '../../config.js';
import {ObjectId} from 'mongodb';

export class MongoDbContainer {
    constructor(collectionName, dbName) {
        this.collection = (mongodb().db(dbName)).collection(collectionName)
    }

    async getAll() {
        const objects = await this.collection.find().toArray()
        objects.forEach(o => {
            o.id = o._id.toString()
            delete o._id
        })
        return objects
    }

    async getById(id) {
        const {_id, ...object} = await this.collection.findOne({_id: new ObjectId(id)})
        if (object) object.id = id
        return object
    }

    async save(object) {
        object = {...object}
        if (object.id && typeof object.id === 'string') {
            object._id = new ObjectId(object.id)
            delete object.id
        }
        const saved = await this.collection.insertOne(object);
        return {...object, id: saved.insertedId.toString()}
    }

    async update(object, id) {
        object = {...object}
        if (object.id) {
            delete object.id
        }
        await this.collection.updateOne({_id: new ObjectId(id)}, {$set: object})
    }

    async deleteById(id) {
        await this.collection.deleteOne({_id: new ObjectId(id)})
    }

    async deleteAll() {
        await this.collection.deleteMany({});
    }
}