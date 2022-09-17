const mongoose = require('mongoose');

/**
 * OTP SCHEMA:
 *          otp: Number,
 *          user: ObjectId
 *          expiresAT: Date,
 */

const OTPSchema = new mongoose.Schema({
    otp: {
        type: Number,
        required: true
    },

    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },

    expiresAt: {
        type: Date,
        required: true
    }
})

OTPSchema.index({
    expiresAt: 1,
}, {
    expireAfterSeconds: 300 // expires in 15 + 5 minutes
})

const OTP = mongoose.model('OTP', OTPSchema);
module.exports = OTP