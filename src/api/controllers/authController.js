import passport from 'passport';

const registerController = passport.authenticate('register', {
    successRedirect: '/successRegister', failureRedirect: '/failRegister',
})

const loginController = passport.authenticate('login', {
    successRedirect: '/successLogin', failureRedirect: '/failLogin',
})

const successRegisterController = (req, res) => {
    res.status(201).json(req.user)
    // res.sendFile('registroOk.html', { root: './views' })
}

const failRegisterController = (req, res) => {
    res.status(400).json({err: 'fallo el registro'})
}

const successLoginController = (req, res) => {
    res.status(201).json({msg: 'ok'})
}

const failLoginController = (req, res) => {
    res.status(400).json({err: 'fallo el login'})
}


const logoutController = async (req, res) => {
    if (req.isAuthenticated()) {
        await req.logout(((err) => {
            if (err) res.sendStatus(409)
        }))
    }
    res.sendStatus(200)
}

export {
    registerController,
    loginController,
    successRegisterController,
    failRegisterController,
    successLoginController,
    failLoginController,
    logoutController
};