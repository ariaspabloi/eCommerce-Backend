const NodemailerEmailSender = require('./NodemailerEmailSender.js')
const { nodemailerPass, nodemailerUser } = require('../../config.js')

const configData = {
    service: 'gmail',
    port: 587,
    auth: {
        user: nodemailerUser,
        pass: nodemailerPass
    }
}

const clienteMail = new NodemailerEmailSender(configData)
module.exports =clienteMail