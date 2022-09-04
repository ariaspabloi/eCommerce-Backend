import dotenv from 'dotenv';
import path from 'path';
import {fileURLToPath} from 'url';
import {MongoClient, ServerApiVersion} from 'mongodb';
import admin from "firebase-admin";
import serviceAccount from "./db/backendch-76a46-firebase-adminsdk-kog9c-f822c15d34.json" assert {type: 'json'}

const __dirname = path.dirname(fileURLToPath(
    import.meta.url));
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
function getMongoDb() {
    const uri = `mongodb+srv://${mongodbUser}:${mongodbPassword}@cluster0.ot66qlp.mongodb.net/?retryWrites=true&w=majority`
    return new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1
    });
}

//Firebase connection settings
function getFirestoreDb() {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    return admin.firestore();
}

const fire = getFirestoreDb()

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
const DBMODE = 'firebase'
export {
    mode,
    fire as firebase,
    getMongoDb as mongodb,
    DBMODE,
    nodemailerUser,
    nodemailerPass,
    twilioAccountSid,
    twilioAuthToken,
    twilioSmsPhoneNumber,
    twilioWhatsappPhoneNumber,
    smsAdmin,
    mailAdmin,
    whatsappAdmin
};