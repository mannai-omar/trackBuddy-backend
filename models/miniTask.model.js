const mongoose = require("mongoose");

const miniTaskSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
        },
        status: {
            type: String,
            enum: ['pending', 'completed'],
            default: 'pending',
            required: true,
        },
        task: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task'
        }
    },
    { timestamps: true }
);

const MiniTask = mongoose.model('MiniTask', miniTaskSchema);

module.exports = MiniTask;