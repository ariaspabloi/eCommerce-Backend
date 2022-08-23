const userDao = require('../models/indexUser')
const {newCartId} = require('./cartService')
const clienteMail = require('../messageSenders/emailSender/index')
const {mailAdmin} = require('../config')
const path = require('path');
const Resize = require('../util/Resize')
const {validPassword} = require("../util/helpers");


const registerUser = async (user) => {
    if (await userDao.getByEmail(user.email)) throw Error('email ya registrado')
    if (!user.email || !user.password) throw Error('falta el campo obligatorio')
    user = await userDao.save(user)
    await newCartId(user._id)
    //await clienteMail.enviar({asunto: 'Nuevo registro', destinatario: mailAdmin, mensaje: `Registro de ${user.email}`})
    return user
}

const authenticateUser = async (username, password) => {
    try {
        const user = await userDao.getByEmail(username)
        if (!(await validPassword(password, user.password))) throw Error('contrasenia incorrecta')
        return user
    } catch (error) {
        throw error;
    }
}

const getUserById = async (id) => {
    return userDao.getById(id)
}


module.exports = {registerUser, authenticateUser, getUserById}