import {generateHash, generateId, validPassword} from '../../util/helpers.js';
import User from '../../models/User.js'
import Api400Error from "../../util/errors/Api400Error.js";
import Api404Error from "../../util/errors/Api404Error.js";
import Api500Error from "../../util/errors/Api500Error.js";
import BaseError from "../../util/errors/BaseError.js";

export default class UserService {
    #dao
    #cartService

    constructor(dao, cartService) {
        this.#dao = dao
        this.#cartService = cartService
    }

    async registerUser(userData) {
        try {
            if (!userData.email || !userData.password) throw new Api400Error('Falta el campo obligatorio.');
            if (await this.#dao.checkEmail(userData.email)) throw new Api400Error('Email ya registrado.');
            userData.id = generateId()
            userData.password = generateHash(userData.password)
            const user = new User(userData)
            const insertedUser = await this.#dao.save(user.dto())
            await this.#cartService.newCartId(insertedUser.id)
            return new User(insertedUser)
        } catch (e) {
            if (e instanceof BaseError) throw e;
            throw new Api500Error(`Error registrando usuario de email ${userData.email}`)
        }
    }

    async authenticateUser(email, password) {
        try {
            if (!email || !password) throw new Api400Error(`Campo email o password faltante`);
            const user = await this.#dao.getByEmail(email)
            if (!user) throw new Api404Error(`Usuario con user ${email} no encontrado`);
            if (!(await validPassword(password, user.password))) throw new Api400Error('Contrasenia incorrecta')
            return new User(user)
        } catch (e) {
            if (e instanceof BaseError) throw e;
            throw new Api500Error(`Error buscando username ${email}`);
        }
    }

    async getUserById(id) {
        try {
            const user = await this.#dao.getById(id)
            if (!user) throw new Api404Error(`User de ${id} no encontrado`);
            return new User(user)
        } catch (e) {
            if (e instanceof BaseError) throw e;
            throw new Api500Error(`Error buscando username de id ${id}`);
        }
    }

    async getUserByEmail(email) {
        try {
            const user = await this.#dao.getByEmail(email)
            if (!user) throw new Api404Error(`User de email ${email} no encontrado`);
            return new User(user)
        } catch (e) {
            if (e instanceof BaseError) throw e;
            throw new Api500Error(`Error buscando username de email ${email}`);
        }
    }
}