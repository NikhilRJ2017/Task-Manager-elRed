const express = require('express');
const router = express.Router();
const authRoutes = require('./auth_routes');
const tasksRoutes = require('./tasks_routes');
const usersRoutes = require('./users_routes');

router.use('/auth', authRoutes)
router.use('/tasks', tasksRoutes)
router.use('/users', usersRoutes)

module.exports = router;