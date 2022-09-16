import passport from "passport";

export default class UserController {
    #passport

    constructor(passport) {
        this.#passport = passport
    }

    registerController = passport.authenticate('register', {
        successRedirect: '/successRegister', failureRedirect: '/failRegister',
    })

}