import passport from 'passport';

export default class AuthController {

    constructor() {
    }

    loginController = passport.authenticate('login', {
        successRedirect: '/successLogin', failureRedirect: '/failLogin',
    })


    successRegisterController = (req, res) => {
        res.status(201).json(req.user)
        // res.sendFile('registroOk.html', { root: './views' })
    }

    failRegisterController = (req, res) => {
        res.status(400).json({err: 'fallo el registro'})
    }

    successLoginController = (req, res) => {
        res.status(201).json({msg: 'ok'})
    }

    failLoginController = (req, res) => {
        res.status(400).json({err: 'fallo el login'})
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