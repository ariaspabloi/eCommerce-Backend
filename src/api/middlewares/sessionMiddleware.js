import session from 'express-session';
import MongoStore from 'connect-mongo';
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

export default session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://mongodb:mongodbpassword@cluster0.ot66qlp.mongodb.net/?retryWrites=true&w=majority",
        mongoOptions: advancedOptions
    }),

    secret: 'shhhhhhhhhhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 10 * 60 * 1000
    }
});