const CustomError = require('./custom_error');
const BadRequest = require('./bad_request')
const NotFound = require('./not_found')
const Unauthenticated = require('./unauthenicated')
const Unauthorized = require('./unauthorized');

module.exports = {
    CustomError,
    BadRequest,
    NotFound,
    Unauthenticated,
    Unauthorized
}