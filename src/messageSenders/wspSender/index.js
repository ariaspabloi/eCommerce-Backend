import WhatsappSender from './TwilioWhatsappSender.js';
import {twilioAccountSid, twilioAuthToken, twilioWhatsappPhoneNumber} from '../../config.js';

const credenciales = {
    numero: twilioWhatsappPhoneNumber,
    usuario: twilioAccountSid,
    contrasenia: twilioAuthToken
}
const clienteWsp = new WhatsappSender(credenciales)
export default clienteWsp;