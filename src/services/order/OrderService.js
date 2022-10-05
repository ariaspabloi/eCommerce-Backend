import Order from '../../models/Order.js'
import clienteMail from '../../messageSenders/emailSender/index.js';
import {adminEmail} from '../../config.js';
import BaseError from "../../util/errors/BaseError.js";
import Api500Error from "../../util/errors/Api500Error.js";
import {generateId} from "../../util/helpers.js";
import userService from "../user/indexUserService.js";
import Api400Error from "../../util/errors/Api400Error.js";


export default class OrderService {
    #dao
    #cartService

    constructor(dao, cartService) {
        this.#dao = dao
        this.#cartService = cartService
    }

    async registerOrder(clientId) {
        try {
            const {id: cartId, email, name, lastname, phone} = (await userService.getUserById(clientId)).dto();
            const products = await this.#cartService.getCartProducts(cartId)
            if (Array.isArray(products) && !products.length) throw new Api400Error('Carrito vacio, no se puede generar orden')
            const order = new Order(generateId(), Date.now(), clientId, products)
            const orderInserted = await this.#dao.save(order.dto())
            await this.#cartService.emptyCart(cartId)
            clienteMail.enviar({
                asunto: `Nueva orden de ${email},${name} ${lastname}`,
                destinatario: adminEmail,
                mensaje: `Nueva orden de ${email},${name} ${lastname}, productos ${products}`
            })
            clienteMail.enviar({
                asunto: `Nueva orden registrada`,
                destinatario: email,
                mensaje: `Su orden ${name} ${lastname} ha sido registrada, tus productos son ${products}`
            })
            /*
            await clienteWsp.enviar({numero: whatsappAdmin, texto: `Nueva orden de ${email},${name} ${lastname}`})
            //await clienteSms.enviar({ numero: phone, texto: `Orden recibida y en proceso`})
             */
            return orderInserted
        } catch (e) {
            if (e instanceof BaseError)
                throw e;
            throw new Api500Error(`Error al registrar orden de ${clientId}`)
        }
    }

    async getAllOrders() {
        try {
            return await this.#dao.getAll()
        } catch (e) {
            throw new Api500Error(`Error al sacar todas las ordenes`)
        }
    }
}