const mongoose = require('mongoose');

const groupSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        tasks: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task'
        }]
    },
    { timestamps: true }
);

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
