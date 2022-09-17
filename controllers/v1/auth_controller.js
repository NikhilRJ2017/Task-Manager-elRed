const { StatusCodes } = require('http-status-codes');
const { BadRequest, Unauthenticated, NotFound } = require('../../config/errors');
const { createTokenUser, attachCookieToResponse, issueJWT } = require('../../config/utils/jwt');
const { createOTP, isOTPValid } = require('../../config/utils/OTP');
const sendOTP = require('../../config/utils/sendOTP');
const User = require('../../models/User');


// *************************** sign up/register the user *****************************//
const signup = async (req, res) => {
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
        throw new BadRequest("Please provide all the values: name, email, passowrd")
    }

    // check if user is already registered
    let user = await User.findOne({ email });

    // send otp if user is already registered and hasn't verified email 
    if (user && !user.isVerified) {
        const otp = await createOTP(user._id);
        const purpose = "OTP for Email Verification"
        await sendOTP({ name: user.name, email: user.email, otp, purpose });

        return res.status(StatusCodes.OK).json({
            message: "Success",
            info: "Welcome back! Please check your mail for email verification"
        });
    }

    // create user if not registered
    user = await User.create({ name, email, password });

    /**
     * Send email for email verification:
     * 1) Create OTP
     * 2) Send Email
     * */ 
    const otp = await createOTP(user._id);
    const purpose = "OTP for email verification"
    await sendOTP({ name: user.name, email: user.email, otp, purpose })

    res.status(StatusCodes.CREATED).json({
        message: "Success",
        info: "Please check your mail for email verification"
    })
}

// ****************************** verify email once user is registered *****************************//
const verifyEmail = async (req, res) => {

    // getting email and OTP
    const { email, otp } = req.body;
    if (!email || !otp) {
        throw new BadRequest("Please provide both email and password")
    }

    // finding specific user using email
    const user = await User.findOne({ email });
    if (!user) {
        throw new Unauthenticated("Invalid Credentials")
    }

    // if user already verified, then return
    if (user.isVerified) {
        return res.status(StatusCodes.OK).json({
            message: "Success",
            info: "Your email is already verified, you can login"
        })
    }

    // if user is not verified, validate incoming OTP and verify else error
    const isValid = await isOTPValid(user._id, otp);
    if (isValid) {
        user.isVerified = true;
        await user.save();

        res.status(StatusCodes.OK).json({
            message: "Success",
            info: "Your email has been successfully verified, now you can login"
        })

    } else {
        res.status(StatusCodes.OK).json({
            info: "OTP invalid/expired"
        })
    }
}

// **************************** signin/login the registered and verified user *******************************//
const signin = async (req, res) => {

    // clear cookie if already signed in user click on sign in (a temporary feature as I am demonstrating the APIs on POSTMAN and not some UI/frontend)
    setCookieToEmpty(res);

    // getting email and passowrd
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequest("Please provide both email and password")
    }

    // finding the user
    const user = await User.findOne({ email });
    if (!user) {
        throw new Unauthenticated("Invalid Credentials")
    }

    // checking if user is verified, if yes,proceed towards sign-in OTP else redirect to verify email 
    if (!user.isVerified) {
        return res.status(StatusCodes.OK).json({
            message: "Please verify your email"
        });
    }

    // check if password matches
    const isPasswordMatch = await user.comparePasswords(password);
    if (!isPasswordMatch) {
        throw new Unauthenticated("Invalid Credentials")
    }

    /**
     * Send Email for login/sign in verification
     * 1) Create OTP
     * 2) Send email
     */
    const otp = await createOTP(user._id);
    const purpose = "OTP for Sign-In"
    await sendOTP({ name: user.name, email: user.email, otp, purpose })


    res.status(StatusCodes.OK).json({
        message: "Success",
        info: "Please verify login using OTP"
    })
}

// ****************************** verify sign-in for a registered and verifed user ***************************//
const verifyLogin = async (req, res) => {

    // getting email and otp
    const { email, otp } = req.body;
    if (!email || !otp) {
        throw new BadRequest("Please provide both email and password")
    }

    // finding user
    const user = await User.findOne({ email });
    if (!user) {
        throw new Unauthenticated("Invalid Credentials")
    }

    // if user is not verifed and tried to access this route, them redirect them to verify email (again temporary feature used only in POSTMAN)
    if (!user.isVerified) {
        return res.status(StatusCodes.OK).json({
            message: "Please verify your email"
        });
    }

    // verify incoming OTP and attach a jwt cookie to user response to begin user's session else error
    const isValid = await isOTPValid(user._id, otp);
    if (isValid) {
        const tokenUser = createTokenUser(user);
        const token = issueJWT(tokenUser)
        attachCookieToResponse(res, token);

        res.status(StatusCodes.OK).json({
            message: "Success",
            info: "Successfully logged in",
            user: tokenUser
        })
    } else {
        res.status(StatusCodes.OK).json({
            info: "OTP invalid/expired"
        })
    }
}

// ***************************** logout the user by clear the cookie ******************************//
const logout = async (req, res) => {
    // clears the cookie
    setCookieToEmpty(res)
    res.status(StatusCodes.OK).json({
        message: "Logout"
    })
}

const setCookieToEmpty = (res) => { 
    const cookieOptions = {
        expires: new Date(Date.now()),
        httpOnly: true,
        signed: true
    }

    res.cookie('accesstoken', 'logout', cookieOptions)
}

module.exports = {
    signup,
    signin,
    logout,
    verifyEmail,
    verifyLogin
}