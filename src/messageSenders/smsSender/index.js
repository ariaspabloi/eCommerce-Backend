import TwilioSmsSender from './TwilioSmsSender.js';
import {twilioAccountSid, twilioAuthToken, twilioSmsPhoneNumber} from '../../config.js';

const credenciales = {
    numero: twilioSmsPhoneNumber,
    usuario: twilioAccountSid,
    contrasenia: twilioAuthToken
}
const clienteSms = new TwilioSmsSender(credenciales)
export default clienteSms;