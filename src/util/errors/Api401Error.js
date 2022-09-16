import {httpStatusCodes} from "../httpStatusCodes.js";
import BaseError from './BaseError.js'

export default class Api401Error extends BaseError {
    constructor(
        name,
        statusCode = httpStatusCodes.UNAUTHORIZED,
        description = 'Unauthorized client.',
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description)
    }
}
