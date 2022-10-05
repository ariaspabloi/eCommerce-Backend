import jwt from 'jsonwebtoken';
import userService from "../../../services/user/indexUserService.js";
import logger from "../../../util/logger.js";
import {jwtExpireTime, jwtSecretKey} from "../../../config.js";

export default class AuthController {

    constructor() {
    }

    loginController = async (req, res, next) => {
        try {
            const {email, password} = req.body
            const user = (await userService.authenticateUser(email, password)).dto()
            const token = jwt.sign({email}, jwtSecretKey,
                {
                    expiresIn: jwtExpireTime,
                });
            const userToReturn = {...user, ...{token}};
            delete userToReturn.id;
            delete userToReturn.password;
            res.status(200).json(userToReturn);
        } catch (e) {
            logger.error('Error login')
            next(e)
        }
    }

    logoutController = async (req, res) => {
        if (req.isAuthenticated()) {
            await req.logout(((err) => {
                if (err) res.sendStatus(409)
            }))
        }
        res.sendStatus(200)
    }
}