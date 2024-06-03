const MiniTask = require("../models/miniTask.model");
const Task = require("../models/task.model");
const User = require("../models/user.model");

const checkTaskExistence = async (req, res, next) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        req.task = task;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const checkMiniTaskExistence = async (req, res, next) => {
    try {
        const { id } = req.params;
        const miniTask = await MiniTask.findById(id);
        if (!miniTask) {
            return res.status(404).json({ message: 'MiniTask not found' });
        }
        req.miniTask = miniTask;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const checkUserExistence = async (req, res) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    checkTaskExistence,
    checkMiniTaskExistence,
    checkUserExistence
}