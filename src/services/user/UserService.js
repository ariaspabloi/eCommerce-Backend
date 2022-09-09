import clienteMail from '../../messageSenders/emailSender/index.js';
import {mailAdmin} from '../../config.js';
import path from 'path';
import Resize from '../../util/Resize.js';
import {validPassword} from '../../util/helpers.js';
import User from '../../models/User.js'

export default class UserService {
    #dao
    #cartService

    constructor(dao, cartService) {
        this.#dao = dao
        this.#cartService = cartService
    }

    async registerUser(userData) {
        if (await this.#dao.checkEmail(userData.email)) throw Error('email ya registrado')
        if (!userData.email || !userData.password) throw Error('falta el campo obligatorio')
        const user = new User(userData)
        const insertedUser = await this.#dao.save(user.dto())
        await this.#cartService.newCartId(insertedUser.id)
        //await clienteMail.enviar({asunto: 'Nuevo registro', destinatario: mailAdmin, mensaje: `Registro de ${user.email}`})
        return new User(insertedUser)
    }

    async authenticateUser(username, password) {
        try {
            const user = await this.#dao.getByEmail(username)
            if (!(await validPassword(password, user.password))) throw Error('contrasenia incorrecta')
            return new User(user)
        } catch (error) {
            throw error;
        }
    }

    async getUserById(id) {
        const user = await this.#dao.getById(id)
        return new User(user)
    }
}