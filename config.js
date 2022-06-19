//MongoDB connection settings
const getMongoDb = () => {
    const { MongoClient, ServerApiVersion } = require('mongodb');
    const uri = "mongodb+srv://mongodb:mongodbpassword@cluster0.ot66qlp.mongodb.net/?retryWrites=true&w=majority";
    return client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
}
//Firebase connection settings
const getFirestoreDb = () => {
    const admin = require("firebase-admin");
    const serviceAccount = require("./db/backendch-76a46-firebase-adminsdk-kog9c-f822c15d34.json");
    admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
    });
    return admin.firestore();
}

module.exports = {
    firebase: getFirestoreDb(),
    mongodb :  getMongoDb(),
    MODE: 'mongodb'
}