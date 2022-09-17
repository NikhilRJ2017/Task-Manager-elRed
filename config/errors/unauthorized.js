const { StatusCodes } = require('http-status-codes');
const CustomErrorClass = require("./custom_error");

// *********************** 403/ Unauthorize Error ***********************//
class UnauthorizedErrorClass extends CustomErrorClass { 
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.FORBIDDEN;
    }
}
module.exports = UnauthorizedErrorClass;