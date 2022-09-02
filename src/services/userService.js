import userDao from '../db/indexUser.js';
import {newCartId} from './cartService.js';
import clienteMail from '../messageSenders/emailSender/index.js';
import {mailAdmin} from '../config.js';
import path from 'path';
import Resize from '../util/Resize.js';
import {validPassword} from '../util/helpers.js';
import User from '../models/User.js'


const registerUser = async (userData) => {
    if (await userDao.checkEmail(userData.email)) throw Error('email ya registrado')
    if (!userData.email || !userData.password) throw Error('falta el campo obligatorio')
    const user = new User(userData)
    const insertedUser = await userDao.save(user.dto())
    await newCartId(insertedUser.id)
    //await clienteMail.enviar({asunto: 'Nuevo registro', destinatario: mailAdmin, mensaje: `Registro de ${user.email}`})
    return new User(insertedUser)
}

const authenticateUser = async (username, password) => {
    try {
        const user = await userDao.getByEmail(username)
        if (!(await validPassword(password, user.password))) throw Error('contrasenia incorrecta')
        return new User(user)
    } catch (error) {
        throw error;
    }
}

const getUserById = async (id) => {
    const user = await userDao.getById(id)
    return new User(user)
}


export {registerUser, authenticateUser, getUserById};