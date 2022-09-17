const { StatusCodes} = require('http-status-codes')

// ************************ get the current logged in user *************************//
const getCurrentUser = async (req, res) => {
    res.status(StatusCodes.CREATED).json({
        message: "Success",
        user: req.user
    })
}

module.exports = {
   getCurrentUser
}