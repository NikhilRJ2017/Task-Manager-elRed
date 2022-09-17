const { StatusCodes} = require('http-status-codes');
const { NotFound, BadRequest } = require('../../config/errors');
const checkPermission = require('../../config/utils/check_permission');
const Task = require('../../models/Task');

// **************************** get all tasks *****************************//
const getAllTasks = async (req, res) => {
    const { userId } = req.user;
    const tasks = await Task.find({ user: userId }).sort({createdAt: -1});
    res.status(StatusCodes.OK).json({
        message: "Success",
        count: tasks.length,
        tasks: tasks
    })
}

// *************************** get a specific task ******************************//
const getSingleTask = async (req, res) => { 
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
        throw new NotFound(`No task with id ${id}`);
    }

    // checking permission that if the logged in user has permission to get a particular task
    checkPermission(req.user, task.user);
    res.status(StatusCodes.OK).json({
        message: "Success",
        task: task
    })
}

// ***************************** create a task ********************************//
const createTask = async (req, res) => {
    const { name, due } = req.body; // due_date format at frontend should be mm/dd/yyyy
    if (!name || !due) { 
        throw new BadRequest('Please provide name and due date both')
    }
    const due_date = new Date(due);
    const { userId } = req.user;
    const task = await Task.create({name, due_date, user: userId})
    
    res.status(StatusCodes.CREATED).json({
        message: "Success",
        task: task
    })
}

// ***************************** update a specific task ******************************//
const updateTask = async (req, res) => {
    const { id } = req.params;
    let task = await Task.findById(id);
    if (!task) {
        throw new NotFound(`No task with id ${id}`);
    }

    // checking permission that if a logged in user is permitted to make changes to a specific task
    checkPermission(req.user, task.user);

    const { name, due_date, completed } = req.body;
    let updateFields = {};

    if (name) {
        updateFields.name = name;
    }

    if (due_date) {
        updateFields.due_date = due_date;
    }

    if (completed) {
        updateFields.completed = completed
    }

    task = await Task.findByIdAndUpdate({ _id: id }, updateFields, { new: true, runValidators: true })
    
    res.status(StatusCodes.OK).json({
        message: "Success",
        task: task
    })

}

// **************************** delete a specific task *******************************//
const deleteTask = async (req, res) => {
    const { id } = req.params;
    let task = await Task.findById(id);
    if (!task) { 
        throw new NotFound(`No task with id ${id}`);
    }
    // checking permission that if a logged in user is permitted to make delete to a specific task
    checkPermission(req.user, task.user);
    
    await task.remove();

    res.status(StatusCodes.OK).json({
        message: "Success",
        info: "Task deleted"
    })
}

module.exports = {
    getAllTasks,
    getSingleTask,
    createTask,
    updateTask,
    deleteTask
}