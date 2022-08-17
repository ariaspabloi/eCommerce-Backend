const TwilioSender = require('../TwilioSender.js')

module.exports = class TwilioSmsSender extends TwilioSender {
    constructor(options) {
        super(options)
    }
}
