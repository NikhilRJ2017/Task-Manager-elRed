const { StatusCodes } = require('http-status-codes');
const CustomErrorClass = require("./custom_error");

// ************************** 404/ Not Found Error **************************//
class NotFoundErrorClass extends CustomErrorClass { 
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.NOT_FOUND;
    }
}
module.exports = NotFoundErrorClass;