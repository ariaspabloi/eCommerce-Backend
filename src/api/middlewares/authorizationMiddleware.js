import Api401Error from "../../util/errors/Api401Error.js";

const requireAuthorization = (req, res, next) => {
    try {
        if (req.isAuthenticated()) {
            next()
        } else {
            throw new Api401Error()
        }
    } catch (e) {
        next(e)
    }
}

export default requireAuthorization;