import passport from 'passport';
import {Strategy} from 'passport-local';
import {registerUser, authenticateUser, getUserById} from '../../services/userService.js';
import {generateHash} from '../../util/helpers.js';

passport.use('register', new Strategy({
    usernameField: 'email',
    passReqToCallback: true
}, (req, username, password, done) => {
    try {
        req.body.password = generateHash(req.body.password)
        registerUser(req.body).then(user => done(null, user.dto()))
    } catch (error) {
        done(error)
    }
}))

passport.use('login', new Strategy({
    usernameField: 'email'
}, (username, password, done) => {
    try {
        authenticateUser(username, password).then(user => done(null, user.dto()))
    } catch (error) {
        done(null, false)
    }
}))

const passportMiddleware = passport.initialize()


///////////////////Serializar

passport.serializeUser((user, done) => {
    done(null, user.id)
})


passport.deserializeUser(async (id, done) => {
    try {
        const user = await getUserById(id)
        done(null, user.dto())
    } catch (error) {
        done(error)
    }
})
const passportSessionHandler = passport.session()
export {passportSessionHandler, passportMiddleware};