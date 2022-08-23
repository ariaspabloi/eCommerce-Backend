const passport = require('passport')
const {Strategy} = require('passport-local')
const {registerUser, authenticateUser, getUserById} = require('../../services/userService')
const {generateHash} = require("../../util/helpers");

passport.use('register', new Strategy({
    usernameField: 'email',
    passReqToCallback: true
}, (req, username, password, done) => {
    try {
        req.body.password = generateHash(req.body.password)
        registerUser(req.body).then(user => done(null, user))
    } catch (error) {
        done(error)
    }
}))

passport.use('login', new Strategy({
    usernameField: 'email'
}, (username, password, done) => {
    try {
        authenticateUser(username, password).then(user => done(null, user))
    } catch (error) {
        done(null, false)
    }
}))

const passportMiddleware = passport.initialize()


///////////////////Serializar

passport.serializeUser((user, done) => {
    done(null, user._id.toString())
})


passport.deserializeUser(async (id, done) => {
    try {
        const user = await getUserById(id)
        done(null, user)
    } catch (error) {
        done(error)
    }
})
const passportSessionHandler = passport.session()
module.exports = {passportSessionHandler, passportMiddleware}