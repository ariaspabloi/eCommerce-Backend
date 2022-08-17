const userDao = require('../models/indexUser')
const cartService = require('./cartService')
const clienteMail = require('../messageSenders/emailSender/index')
const {mailAdmin} = require('../config')
const path = require('path');
const Resize = require('../util/Resize')

const registerUser = async (user) => {
    userDao.validateUniqueEmail(user.email)
    if(!user.email || !user.password) throw Error('falta el campo obligatorio')
    user = await userDao.save(user)
    await cartService.newCartId(user._id)
    await clienteMail.enviar({ asunto: 'Nuevo registro', destinatario: mailAdmin, mensaje: `Registro de ${user.email}`})
    return user
}

const authenticateUser = async (username,password)=>{
    let user;
    try{
        user = await userDao.getByEmail(username)
        if(user.password !== password) throw Error()
        return user;
    }catch (error){
        throw error;
    }
}


module.exports = {registerUser,authenticateUser}