const otpgen = require('otp-generator')
const OTP = require('../../models/OTP');
const { BadRequest } = require('../errors');

// ************************** create OTP, store OTP ***************************//
const createOTP = async (userId) => {

    const otp = otpgen.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
    const fifteenMinutes = 1000 * 60 * 15;
    const expiresAt = new Date(Date.now() + fifteenMinutes);
    const userOTP = await OTP.create({ otp, user: userId, expiresAt });
    return otp;
}

// *************************** verify OTP *****************************//
const isOTPValid = async (userId, otp) => { 
    const otpDb = await OTP.find({ user: userId });
    if (otpDb.length === 0) {
        throw new BadRequest('Please generate OTP');
    }

    // get the latest OTP
    const latestOtp = otpDb[otpDb.length - 1];
    let result = false;
    const currentDate = new Date();
    if (latestOtp.otp === Number(otp) && latestOtp.expiresAt > currentDate) {
        await OTP.deleteMany({ user: userId })
        result = true;
    } else {
        result = false;
    }

    return result;

    
}
module.exports = {
    createOTP,
    isOTPValid
}