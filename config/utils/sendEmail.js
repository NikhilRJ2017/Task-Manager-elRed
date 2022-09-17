const nodemailer = require('nodemailer');
const nodemailer_config = require('./nodemailer_config');

// ************************* send email ************************//
const sendEmail = async ({to, subject, html }) => { 
    const transporter = nodemailer.createTransport(nodemailer_config);

    return transporter.sendMail({
        from: '"Task Manager" <taskmanager@gmail.com>',
        to,
        subject,
        html
    })
}

module.exports = sendEmail