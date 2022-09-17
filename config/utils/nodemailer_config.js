require('dotenv').config({ path: '../../.env' });
// ********************** node mailer config *************************//
const nodemailer_config = {
    host: process.env.NODEMAILER_HOST,
    port: 587,
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
    }
};

module.exports = nodemailer_config;