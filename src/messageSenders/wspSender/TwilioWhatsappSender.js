const TwilioSender = require('../TwilioSender.js')

module.exports = class TwilioWhatsappSender extends TwilioSender {
    constructor(options) {
        super(options)
    }
}

