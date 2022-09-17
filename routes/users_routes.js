const express = require('express');
const { authenticateUserMiddleware } = require('../config/middlewares/authenticationMiddleware');
const router = express.Router();
const { getCurrentUser } = require('../controllers/v1/users_controller');

router.route('/current-user').get(authenticateUserMiddleware, getCurrentUser) // get currently logged in user info

module.exports = router;