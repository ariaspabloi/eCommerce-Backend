import passport from 'passport';
import {Strategy} from 'passport-local';
import userService from "../../services/user/indexUserService.js";
import {generateHash} from '../../util/helpers.js';

passport.use('register', new Strategy({
    usernameField: 'email',
    passReqToCallback: true
}, async (req, username, password, done) => {
    try {
        req.body.password = generateHash(req.body.password)
        const user = userService.registerUser(req.body)
        done(null, user.dto())
    } catch (error) {
        done(error)
    }
}))

passport.use('login', new Strategy({
    usernameField: 'email'
}, async (username, password, done) => {
    try {
        const user = await userService.authenticateUser(username, password)
        done(null, user.dto())
    } catch (error) {
        done(null, false)
    }
}))

const passportMiddleware = passport.initialize()


///////////////////Serializar

passport.serializeUser((user, done) => {
    try {
        done(null, user.id)
    } catch (e) {
        done(error)
    }
})


passport.deserializeUser(async (id, done) => {
    try {
        const user = await userService.getUserById(id)
        done(null, user.dto())
    } catch (error) {
        done(error)
    }
})
const passportSessionHandler = passport.session()
export {passportSessionHandler, passportMiddleware};