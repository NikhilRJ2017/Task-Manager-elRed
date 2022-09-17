const express = require('express');
const { authenticateUserMiddleware } = require('../config/middlewares/authenticationMiddleware');
const { getAllTasks, createTask, updateTask, deleteTask, getSingleTask } = require('../controllers/v1/tasks_controller');
const router = express.Router();

router.route('/getAll').get(authenticateUserMiddleware, getAllTasks) // get all tasks of a specific user
router.route('/getTask/:id').get(authenticateUserMiddleware, getSingleTask) // get a single task of a specific user
router.route('/create').post(authenticateUserMiddleware, createTask) // create a task for a specific user
router.route('/update/:id').patch(authenticateUserMiddleware, updateTask) // update a particular task of a specific user
router.route('/delete/:id').delete(authenticateUserMiddleware, deleteTask) // delete a particular task of a specific user

module.exports = router;