import passport from 'passport';
import {Strategy} from 'passport-local';
import userService from "../../services/user/indexUserService.js";
import {generateHash} from '../../util/helpers.js';

passport.use('register', new Strategy({
    usernameField: 'email',
    passReqToCallback: true
}, (req, username, password, done) => {

    console.log("posta2")
    try {
        req.body.password = generateHash(req.body.password)
        userService.registerUser(req.body).then(user => done(null, user.dto()))
    } catch (error) {
        done(error)
    }
}))

passport.use('login', new Strategy({
    usernameField: 'email'
}, (username, password, done) => {
    try {
        userService.authenticateUser(username, password).then(user => done(null, user.dto()))
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
        const user = await userService.getUserById(id)
        done(null, user.dto())
    } catch (error) {
        done(error)
    }
})
const passportSessionHandler = passport.session()
export {passportSessionHandler, passportMiddleware};