import Order from '../../models/Order.js'
import clienteMail from '../../messageSenders/emailSender/index.js';
import clienteWsp from '../../messageSenders/wspSender/index.js';
import clienteSms from '../../messageSenders/smsSender/index.js';
import {mailAdmin, whatsappAdmin} from '../../config.js';
import BaseError from "../../util/errors/BaseError.js";
import Api500Error from "../../util/errors/Api500Error.js";


export default class OrderService {
    #dao
    #cartService

    constructor(dao, cartService) {
        this.#dao = dao
        this.#cartService = cartService
    }

    async registerOrder(cartId, email, name, lastname, phone) {
        try {
            const products = await this.#cartService.getCartProducts(cartId)
            const order = new Order({products, email, name, lastname})
            const orderInserted = await this.#dao.save(order.dto())
            //const order = await orderDao.save({products, email, name, lastname})

            /*
            await clienteMail.enviar({
                asunto: `Nueva orden de ${email},${name} ${lastname}`,
                destinatario: mailAdmin,
                mensaje: `Nueva orden de ${email},${name} ${lastname}, productos ${products}`
            })
            await clienteWsp.enviar({numero: whatsappAdmin, texto: `Nueva orden de ${email},${name} ${lastname}`})
            //await clienteSms.enviar({ numero: phone, texto: `Orden recibida y en proceso`})
             */
            await this.#cartService.emptyCart(cartId)
            return orderInserted
        } catch (e) {
            if (e instanceof BaseError)
                throw e;
            throw new Api500Error(`Error al registrar orden de ${email}`)
        }
    }

    async getAllOrders() {
        try {
            return await this.#dao.getAll()
        } catch (e) {
            throw new Api500Error(`Error al sacar todas las ordenes`)
        }
    }

    async saveOrder(order) {
        try {
            return await this.#dao.save(order)
        } catch (e) {
            throw new Api500Error(`Error al guardar orden de ${order?.email}`)
        }
    }
}