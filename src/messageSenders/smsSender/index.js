const TwilioSmsSender = require('./TwilioSmsSender.js')
const { twilioAccountSid, twilioAuthToken, twilioSmsPhoneNumber } = require('../../config.js')

const credenciales = {
    numero: twilioSmsPhoneNumber,
    usuario: twilioAccountSid,
    contrasenia: twilioAuthToken
}
const clienteSms = new TwilioSmsSender(credenciales)
module.exports = clienteSms