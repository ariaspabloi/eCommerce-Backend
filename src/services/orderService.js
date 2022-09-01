import orderDao from '../db/indexOrder.js';
import {getCartProducts, emptyCart} from './cartService.js';
import Order from '../models/Order.js'
import clienteMail from '../messageSenders/emailSender/index.js';
import clienteWsp from '../messageSenders/wspSender/index.js';
import clienteSms from '../messageSenders/smsSender/index.js';
import {mailAdmin, whatsappAdmin} from '../config.js';

const registerOrder = async (cartId, email, name, lastname, phone) => {
    try {
        const products = await getCartProducts(cartId)
        const order = new Order({products, email, name, lastname})
        console.log("_=_", order.dto())
        const orderInserted = await orderDao.save(order.dto())
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
        await emptyCart(cartId)
        return orderInserted
    } catch (error) {
        throw error;
    }
}

const getAllOrders = async () => await orderDao.getAll()

const saveOrder = async (order) => {
    return await orderDao.save(order)
}

export {registerOrder, getAllOrders, saveOrder};