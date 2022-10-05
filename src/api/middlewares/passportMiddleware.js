import {ExtractJwt, Strategy as JWTstrategy} from 'passport-jwt';
import UserService from "../../services/user/indexUserService.js";
import {jwtSecretKey} from "../../config.js";

export const applyPassportStrategy = (passport) => {
    const options = {};
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    options.secretOrKey = jwtSecretKey;

    passport.use(
        new JWTstrategy(
            options,
            (payload, done) => {
                return UserService.getUserByEmail(payload.email).then(user => {
                    return done(null, {email: user.dto().email, id: user.dto().id})
                }).catch(
                    err => {
                        return done(err, false);
                    }
                )
            }
        )
    );
}