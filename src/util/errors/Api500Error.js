import {httpStatusCodes} from "../httpStatusCodes.js";
import BaseError from './BaseError.js'

export default class Api500Error extends BaseError {
    constructor(
        name,
        statusCode = httpStatusCodes.INTERNAL_SERVER,
        description = 'Internal server error.',
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description)
    }
}
