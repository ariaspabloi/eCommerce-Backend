const orderDao = require('../models/indexOrder')
const {getCartProducts, emptyCart} = require('./cartService')
const clienteMail = require('../messageSenders/emailSender/index')
const clienteWsp = require('../messageSenders/wspSender/index')
const clienteSms = require('../messageSenders/smsSender/index')
const {mailAdmin, whatsappAdmin} = require('../config')

const registerOrder = async (cartId, email, name, lastname, phone) => {
    try {
        const products = await getCartProducts(cartId)
        const order = await orderDao.save({products, email, name, lastname})
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
    } catch (error) {
        throw error;
    }
}

const getAllOrders = async () => await orderDao.getAll()

const saveOrder = async (order) => {
    return await orderDao.save(order)
}

module.exports = {registerOrder, getAllOrders, saveOrder}