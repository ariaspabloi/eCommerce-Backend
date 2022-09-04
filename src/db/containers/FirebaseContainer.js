import {firebase as db} from '../../config.js';

const asObj = doc => ({id: doc.id, ...doc.data()})

export class FirebaseContainer {
    constructor(collectionName) {
        this.collection = db.collection(collectionName)
    }

    async getAll() {
        const result = []
        const snapshot = await this.collection.get()
        snapshot.forEach(doc => result.push(asObj(doc)))
        return result
    }

    async getById(id) {
        return asObj(await this.collection.doc(id).get())
    }

    async save(object) {
        if (object.id) {
            await this.collection.doc(object.id).set(object)
            return object
        }
        return {...object, id: (await this.collection.add(object)).id}
        //await this.collection.doc(object.id).create(object)
        //return {insertedId: object.id}
    }

    async update(object, id) {
        await this.collection.doc(id).update(object)
    }

    async deleteById(id) {
        await this.collection.doc(id).delete()
    }

    async deleteAll() {
        await this.collection.get().then(querySnapshot => {
            querySnapshot.docs.forEach(snapshot => {
                snapshot.ref.delete();
            })
        })
    }
}
