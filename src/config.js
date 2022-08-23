const dotenv = require('dotenv')
const path = require('path')

//const __dirname = process.cwd()
dotenv.config({
    path: path.resolve(__dirname, '../.env'),
})

const mode = process.env.MODE
const mongodbUser = process.env.MONGODBUSER
const mongodbPassword = process.env.MONGODBPASSWORD
const mysqlUser = process.env.MYSQLUSER
const mysqlPassword = process.env.MYSQLPASSWORD
const mysqlHost = process.env.MYSQLHOST
const mysqlDatabase = process.env.MYSQLDATABASE

const nodemailerUser = process.env.MAIL_AUTH_USER
const nodemailerPass = process.env.MAIL_AUTH_PASS
const twilioAccountSid = process.env.TWILIO_ID
const twilioAuthToken = process.env.TWILIO_TOKEN
const twilioSmsPhoneNumber = process.env.TWILIO_SMS_NUMBER
const twilioWhatsappPhoneNumber = process.env.TWILIO_WHATSAPP_NUMBER
const smsAdmin = process.env.SMS_ADMIN
const mailAdmin = process.env.MAIL_ADMIN
const whatsappAdmin = process.env.WHATSAPP_ADMIN

//MongoDB connection settings
const getMongoDb = () => {
    const { MongoClient, ServerApiVersion } = require('mongodb');
    const uri = `mongodb+srv://${mongodbUser}:${mongodbPassword}@cluster0.ot66qlp.mongodb.net/?retryWrites=true&w=majority`
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

const mysql = {
    client: 'mysql',
    connection: {
        user: mysqlUser,
        password: mysqlPassword,
        host: mysqlHost,
        database: mysqlDatabase
    }
}

const sqlite3 = {
    client: 'sqlite3',
    connection: {
        filename: "./persistence/db.sqlite" //FIX PATH
    },
    useNullAsDefault: true
}

module.exports = {
    mode,
    firebase: getFirestoreDb(),
    mongodb: getMongoDb(),
    DBMODE: 'mongodb',
    nodemailerUser,
    nodemailerPass,
    twilioAccountSid,
    twilioAuthToken,
    twilioSmsPhoneNumber,
    twilioWhatsappPhoneNumber,
    smsAdmin,
    mailAdmin,
    whatsappAdmin
}