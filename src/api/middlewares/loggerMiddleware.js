const logger = require('../../util/logger')

const loggerMiddleware = (req, res, next) => {
    const log = `Ruta ${req.originalUrl} metodo ${req.method}`
    logger.info(log)
    next()
}

module.exports = loggerMiddleware