const {mongodb} = require("../../config")
const {generateId} = require("../../util/helpers");
const ObjectId = require('mongodb').ObjectId; 

class MongoDbContainer{
    constructor(collectionName, dbName) {
        this.collection = (mongodb.db(dbName)).collection(collectionName)
    }

    async getAll(){
        return await this.collection.find().toArray()
    }

    async getById(id){
        //return await this.collection.findOne({_id: new ObjectId(id)})
        return await this.collection.findOne({id: id})
    }

    async save(object){
        //return await this.collection.insertOne({...object,id:generateId()})
        object = {...object,id:generateId()};
        const saved = await this.collection.insertOne(object);
        return {...object,_id:saved._id}
    }

    async update(object,id){
        await this.collection.updateOne({_id:new ObjectId(id)},{ $set: object})
    }

    async deleteById(id){
        await this.collection.deleteOne({_id:new ObjectId(id)})
    }

    async deleteAll(){
        await this.collection.deleteMany({});
    }
}

module.exports = { MongoDbContainer }