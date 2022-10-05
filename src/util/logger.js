import winston from 'winston';

function buildLogger() {
    const logger = winston.createLogger({
        transports: [
            new winston.transports.Console({level: 'info'}),
            new winston.transports.File({filename: 'warn.log', level: 'warn'}),
            new winston.transports.File({filename: 'error.log', level: 'error'}),
        ],
    })
    return logger
}

const logger = buildLogger()

export default logger;