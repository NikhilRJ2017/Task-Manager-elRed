const { Unauthenticated } = require("../errors");
const { verifyJWT } = require("../utils/jwt");

// ************************** auth middleware to create protected routes *************************//
const authenticateUserMiddleware = async (req, res, next) => { 
    const { accesstoken } = req.signedCookies;
    if (!accesstoken) {
        throw new Unauthenticated("Authentication invalid")
    }

    try {
        const { name, userId, email } = verifyJWT(accesstoken);
        req.user = {
            userId,
            name,
            email
        }

        next();
    } catch (error) {
        throw new Unauthenticated("Authentication invalid")
    }
}

module.exports = {
    authenticateUserMiddleware
}