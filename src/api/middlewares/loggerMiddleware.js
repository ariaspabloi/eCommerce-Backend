import logger from '../../util/logger.js';

const loggerMiddleware = (req, res, next) => {
    const log = `Ruta ${req.originalUrl} metodo ${req.method}`
    logger.info(log)
    next()
}

export default loggerMiddleware;