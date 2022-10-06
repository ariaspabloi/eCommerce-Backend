import dotenv from 'dotenv';
import path from 'path';
import {fileURLToPath} from 'url';
import {MongoClient, ServerApiVersion} from 'mongodb';
//import admin from "firebase-admin";
//import serviceAccount from "./db/backendch-76a46-firebase-adminsdk-kog9c-f822c15d34.json" assert {type: "json"}

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({
    path: path.resolve(__dirname, '../.env')
})

const port = process.env.PORT || args.port
const env = process.env.ENV
const mode = process.env.MODE
const adminEmail = process.env.ADMIN_EMAIL
const jwtExpireTime = process.env.JWT_EXPIRETIME
const jwtSecretKey = process.env.JWT_SECRETKEY
const dbmode = process.env.DB
const mongodbServer = process.env.MONGODBSERVER
const mongodbUser = process.env.MONGODBUSER
const mongodbPassword = process.env.MONGODBPASSWORD
const nodemailerUser = process.env.MAIL_AUTH_USER
const nodemailerPass = process.env.MAIL_AUTH_PASS
const twilioAccountSid = process.env.TWILIO_ID
const twilioAuthToken = process.env.TWILIO_TOKEN
const twilioSmsPhoneNumber = process.env.TWILIO_SMS_NUMBER
const twilioWhatsappPhoneNumber = process.env.TWILIO_WHATSAPP_NUMBER
const smsAdmin = process.env.SMS_ADMIN
const whatsappAdmin = process.env.WHATSAPP_ADMIN

//MongoDB connection settings
function getMongoDb() {
    let uri
    if (env === 'DEV') {
        uri = `mongodb://127.0.0.1:27017`
    } else {
        uri = `mongodb+srv://${mongodbUser}:${mongodbPassword}@${mongodbServer}/?retryWrites=true&w=majority`
    }
    return (new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1
    }));
}

//Firebase connection settings
function getFirestoreDb() {
    /*
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    return admin.firestore();
     */
}

const fire = getFirestoreDb()
const mongodb = getMongoDb()
if (dbmode === 'mongodb') mongodb.connect();

export {
    port,
    mode,
    fire as firebase,
    mongodb,
    adminEmail,
    jwtExpireTime,
    jwtSecretKey,
    dbmode,
    nodemailerUser,
    nodemailerPass,
    twilioAccountSid,
    twilioAuthToken,
    twilioSmsPhoneNumber,
    twilioWhatsappPhoneNumber,
    smsAdmin,
    whatsappAdmin
};