import Api401Error from "../../util/errors/Api401Error.js";
import passport from "passport";
import Api403Error from "../../util/errors/Api403Error.js";
import {adminEmail} from "../../config.js";

const requireAuthorization = (req, res, next) => passport.authenticate('jwt', {session: false}, (err, user) => {
    if (err) {
        return next(err);
    }
    if (!user) {
        return next(new Api401Error('No datos encontrado con token'));
    }
    req.user = user;
    next();
})(req, res, next)

const adminAuthorization = (req, res, next) => {
    try {
        if (req.user.email === adminEmail) {
            next()
        } else {
            throw new Api403Error('Solo accesible para admin')
        }
    } catch (e) {
        next(e)
    }
}
const requireAdminAuthorization = [requireAuthorization, adminAuthorization]

export {requireAuthorization, requireAdminAuthorization};