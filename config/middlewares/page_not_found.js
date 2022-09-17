const { StatusCodes } = require('http-status-codes')

// *********************** 404/ Not Found Error ************************//
const pageNotFoundMiddleware = (req, res) => { 
    res.status(StatusCodes.NOT_FOUND).json({
        message: "Page not found"
    })
}
module.exports = pageNotFoundMiddleware;