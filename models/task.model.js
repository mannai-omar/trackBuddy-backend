const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
        },
        dueDate: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'in progress', 'completed', 'canceled'],
            default: 'pending',
            required: true,
        },
        creator : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true,
        },
        users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
        miniTasks: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'MiniTask',
        }],
    },
    { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;