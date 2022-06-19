const { firebase: db } = require("../../config")
const { collection, getDocs } = 'firebase/firestore/lite'

const asObj = doc => ({ id: doc.id, ...doc.data() })

class FirebaseContainer {
    constructor(collectionName) {
        this.collectionName = collectionName
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
        return {insertedId:(await this.collection.add(object)).id}
    }

    async update(object, id) {
        await this.collection.doc(id).update(object)
    }

    async deleteById(id) {
        console.log("borrar",id)
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

module.exports = { FirebaseContainer }