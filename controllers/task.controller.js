const MiniTask = require('../models/miniTask.model');
const Task = require('../models/task.model');
const User = require('../models/user.model');

const addTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);

        const user = await User.findById(req.body.creator);
        user.tasks.push(task._id);
        await user.save();

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const listTasks = async (req, res) => {
    console.log('fetching tasks')
    try {
        const tasks = await Task.find().populate('miniTasks');
        res.status(200).json(tasks);
        console.log('tasks fetched succesfully')
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* const listTasksByUser = async (req, res) => {
    try {
        const {userId} = req.params;
        const tasks = await Task.find({ user : userId });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; */

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);

        await MiniTask.deleteMany({ _id: { $in: task.miniTasks } });

        await User.updateMany(
            { tasks: id },
            { $pull: { tasks: id } }
        );
        
        await Task.findByIdAndDelete(id);
        res.status(200).json({ message: 'task deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const findTask = async (req, res) => {
    try {
        const task = req.task;
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const editTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndUpdate(id, req.body, {
            new: true
        });
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addTask,
    listTasks,
    //listTasksByUser,
    //listTasksByGroup,
    deleteTask,
    findTask,
    editTask
}