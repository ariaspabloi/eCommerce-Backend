import {httpStatusCodes} from "../httpStatusCodes.js";
import BaseError from './BaseError.js'

export default class Api403Error extends BaseError {
    constructor(
        name,
        statusCode = httpStatusCodes.FORBIDDEN,
        description = 'Forbidden.',
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description)
    }
}
