const mongoose = require('mongoose');

/**
 * TASK SCHEMA:
 *          name: String,
 *          due_date: Date,
 *          completed: Boolean,
 *          user: ObjectId
 */

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Task name required"],
        trim: true
    },

    due_date: {
        type: Date,
        required: [true, "Please provide date"],
    },

    completed: {
        type: Boolean,
        default: false
    },

    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    }

}, {
    timestamps: true

});

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;