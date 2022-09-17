const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

/**
 * USER SCHEMA: 
 *          name: String,
 *          email: String,
 *          password: String,
 *          isVerified: Boolean,
 *          verified: Date
 */

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide name"],
        minLength: [3, "Name too short"],
        maxLength: [30, "Name too long"]
    },

    email: {
        type: String,
        required: [true, "Please provide email"],
        validate: {
            validator: validator.isEmail,
            message: "Please provide valid email"
        },
        unique: [true, "Email already exists"]
    },

    password: {
        type: String,
        required: [true, "Please provide password"],
        minLength: [6, "Password too short"],
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    verified: {
        type: Date
    }
})

// ***************************** pre save hook to hash the password ************************//
UserSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    };
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

// ***************************** comparing passwords *****************************//
UserSchema.methods.comparePasswords = async function (userEnteredPassword) {
    const isMatch = await bcrypt.compare(userEnteredPassword, this.password);
    return isMatch;
}

const User = mongoose.model('User', UserSchema);
module.exports = User