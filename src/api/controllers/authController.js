const passport = require('passport')

const registerController = passport.authenticate('register', {
    successRedirect: '/auth/successRegister', failureRedirect: '/auth/failRegister',
})

const loginController = passport.authenticate('login', {
    successRedirect: '/auth/successLogin', failureRedirect: '/auth/failLogin',
})

const successRegisterController = (req, res) => {
    res.json(req.user)
    // res.sendFile('registroOk.html', { root: './views' })
}

const failRegisterController = (req, res) => {
    res.status(400).json({err: 'fallo el registro'})
}

const successLoginController = (req, res) => {
    res.json({msg: 'ok'})
}

const failLoginController = (req, res) => {
    res.status(401).json({err: 'fallo el login'})
}


const logoutController = async (req, res) => {
    if (req.isAuthenticated()) {
        await req.logout(((err) => {
            if (err) res.sendStatus(409)
        }))
    }
    res.sendStatus(200)
}

module.exports = {
    registerController,
    loginController,
    successRegisterController,
    failRegisterController,
    successLoginController,
    failLoginController,
    logoutController
}