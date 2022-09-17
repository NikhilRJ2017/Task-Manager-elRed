require('dotenv').config({ path: '../../.env' });
const jwt = require('jsonwebtoken');

// ************************ create a token user/ payload *************************//
const createTokenUser = (user) => {
    return {
        userId: user._id,
        name: user.name,
        email: user.email
    }
}

// ************************ create/sign a jwt ***************************//
const issueJWT = (tokenUser) => {
    const secret = process.env.JWT_SECRET;
    const options = {
        algorithm: process.env.JWT_ALGORITHM
    }

    const token = jwt.sign(tokenUser, secret, options);
    return token;
}

// ************************* attach a cookie to response **************************//
const attachCookieToResponse = (res, token) => {
    const cookieLife = 1000 * 60 * 60 * 24;
    const cookieOptions = {
        expires: new Date(Date.now() + cookieLife),
        httpOnly: true,
        signed: true
    }

    res.cookie('accesstoken', token, cookieOptions)
}

// ************************* verify jwt ********************************//
const verifyJWT = (token) => { 
    if (!token) {
        return;
    }
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
    createTokenUser,
    issueJWT,
    verifyJWT,
    attachCookieToResponse
}