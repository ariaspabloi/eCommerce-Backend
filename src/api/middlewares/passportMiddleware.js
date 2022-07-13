const passport = require('passport')
const {Strategy} = require('passport-local')
const userDao = require('../../models/indexUser')
const {registerUser, authenticateUser} = require('../../services/userService')

passport.use('register', new Strategy({
    passReqToCallback: true
}, (req, username, password, done) => {
    try {
        registerUser(req.body).then(user => done(null, user))
    } catch (error) {
        done(error)
    }
}))

passport.use('login', new Strategy((username, password, done) => {
    try {
        authenticateUser(username, password).then(user => done(null, user))
    } catch (error) {
        done(null, false)
    }
}))

const passportMiddleware = passport.initialize()


///////////////////Serializar

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    try {
        const user = userDao.getById(id)
        done(null, user)
    } catch (error) {
        done(error)
    }
})
const passportSessionHandler = passport.session()
module.exports = {passportSessionHandler, passportMiddleware}