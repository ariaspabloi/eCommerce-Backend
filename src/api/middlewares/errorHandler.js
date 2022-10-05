import logger from "../../util/logger.js";

function logError(err) {
    logger.error(err)
}

function logErrorMiddleware(err, req, res, next) {
    logError(err)
    next(err)
}

function returnError(err, req, res, next) {
    res.status(err.statusCode || 500).json({error: err.name})
}

export {logErrorMiddleware, returnError}