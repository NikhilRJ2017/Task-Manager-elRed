const { StatusCodes } = require('http-status-codes');
const CustomErrorClass = require("./custom_error");

// *********************** 401/ Unathenticate Error ************************//
class UnauthenticatedErrorClass extends CustomErrorClass { 
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}
module.exports = UnauthenticatedErrorClass;