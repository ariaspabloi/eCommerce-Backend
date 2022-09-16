import {httpStatusCodes} from "../httpStatusCodes.js";
import BaseError from './BaseError.js'

export default class Api400Error extends BaseError {
    constructor(
        name,
        statusCode = httpStatusCodes.BAD_REQUEST,
        description = 'Client request error.',
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description)
    }
}
