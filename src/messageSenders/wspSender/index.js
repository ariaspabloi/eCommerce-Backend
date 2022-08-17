const WhatsappSender = require('./TwilioWhatsappSender.js')
const { twilioAccountSid, twilioAuthToken, twilioWhatsappPhoneNumber } = require('../../config.js')

const credenciales = {
    numero: twilioWhatsappPhoneNumber,
    usuario: twilioAccountSid,
    contrasenia: twilioAuthToken
}
const clienteWsp = new WhatsappSender(credenciales)
module.exports = clienteWsp