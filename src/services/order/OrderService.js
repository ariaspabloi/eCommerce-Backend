import Order from '../../models/Order.js'
import clienteMail from '../../messageSenders/emailSender/index.js';
import clienteWsp from '../../messageSenders/wspSender/index.js';
import clienteSms from '../../messageSenders/smsSender/index.js';
import {mailAdmin, whatsappAdmin} from '../../config.js';


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
        } catch (error) {
            throw error;
        }
    }

    async getAllOrders() {
        return await this.#dao.getAll()
    }

    async saveOrder(order) {
        return await this.#dao.save(order)
    }
}