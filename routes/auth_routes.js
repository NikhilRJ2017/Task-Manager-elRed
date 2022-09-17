const express = require('express');
const router = express.Router();
const { signup, signin, logout, verifyEmail, verifyLogin } = require('../controllers/v1/auth_controller');

router.route('/signup').post(signup) // signup/register
router.route('/signin').post(signin) // signin/login
router.route('/logout').get(logout) // logout
router.route('/verify-email').post(verifyEmail) // verify email
router.route('/verify-login').post(verifyLogin) // verify login

module.exports = router;