const session = require("express-session");
const MongoStore = require("connect-mongo");
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

module.exports = session({
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
})