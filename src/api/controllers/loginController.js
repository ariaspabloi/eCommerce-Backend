const { response } = require("express");

const credentials = { user: "user1", password: "pass" }

const loginController = {
    postLogin: async (req, res) => {
        if (req.body.user == credentials.user && req.body.password == credentials.password) {
            req.session.user = credentials.user
            req.session.admin = true
            res.redirect('/');
        } else {
            res.redirect('/login')
        }
    },
    getLogout: async (req, res) => {
        req.session.destroy()
        res.redirect('/login')
    },
    getInfo: async (req, res) => {
        if (req.session.user) {
            res.json({ user: req.session.user })
        } else {
            res.json({})
        }
    }
}

module.exports = { loginController }