const sendEmail = require('./sendEmail');

// ************************ send OTP *************************//
const sendOTP = async ({ name, email, otp, purpose }) => { 
    const message = `<p>Welcome to Task Manager</p>. 
                    <h3>Your OTP is <strong>${otp}</strong></h3>. 
                    <p><strong>Caution :</strong> OTP expires in 15 minutes</p>`

    return sendEmail({
        to: email,
        subject: `${purpose}`,
        html: `<h4>Hello ${name}</h4> ${message}`
    });
}

module.exports = sendOTP;