const orderDao = require('../models/indexOrder')
const cartDao = require("../models/indexCart");
const cartService = require('./cartService')
const clienteMail = require('../messageSenders/emailSender/index')
const clienteWsp = require('../messageSenders/wspSender/index')
const clienteSms = require('../messageSenders/smsSender/index')
const {mailAdmin,whatsappAdmin} = require('../config')

const registerOrder = async (cartId,email,name,lastname,phone) => {
    try {
        const products = (await cartDao.getById(cartId)).products
        const order = await orderDao.save({products, email, name, lastname})
        await clienteMail.enviar({ asunto: `Nueva orden de ${email},${name} ${lastname}`, destinatario: mailAdmin, mensaje: `Nueva orden de ${email},${name} ${lastname}, productos ${products}`})
        await clienteWsp.enviar({ numero: whatsappAdmin, texto: `Nueva orden de ${email},${name} ${lastname}`})
        //await clienteSms.enviar({ numero: phone, texto: `Orden recibida y en proceso`})
        await cartService.emptyCart(cartId)
    } catch (error) {
        throw error;
    }
}

module.exports = {registerOrder}