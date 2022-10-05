import userService from "../../../services/user/indexUserService.js";
import jwt from "jsonwebtoken";
import logger from "../../../util/logger.js";
import {jwtExpireTime, jwtSecretKey} from "../../../config.js";

export default class UserController {
    #passport

    constructor(passport) {
        this.#passport = passport
    }

    registerController = async (req, res, next) => {
        try {
            const user = (await userService.registerUser(req.body)).dto()
            const {email, name} = user
            const token = jwt.sign({email}, jwtSecretKey, {
                expiresIn: jwtExpireTime,
            })
            const userToReturn = {email, name, ...{token}}
            res.status(200).json(userToReturn)
        } catch (e) {
            logger.error('Error register')
            next(e)
        }
    }
}
