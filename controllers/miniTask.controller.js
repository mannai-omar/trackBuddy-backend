const MiniTask = require("../models/miniTask.model");
const Task = require("../models/task.model");

const addMiniTask = async (req,res) => {
    try {
        const miniTask = await MiniTask.create(req.body);
        const task = await Task.findById(req.body.task);
        task.miniTasks.push(miniTask);
        await task.save();

        res.status(200).json(miniTask);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

const removeMiniTask = async (req,res) => {
    try {
        const { id } = req.params;
        const miniTask = await MiniTask.findById(id);
        const task = await Task.findById(miniTask.task);
        await MiniTask.findByIdAndDelete(id);
        task.miniTasks = task.miniTasks.filter(miniTaskId => miniTaskId.toString() !== miniTask._id.toString());
        await task.save();

        res.status(200).json({ message : 'mini task removed !' });
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

const upadteStatus = async (req,res) => {
    try {
        const { id } = req.params;
        const miniTask = await MiniTask.findById(id);
        
        if (miniTask.status == 'pending')
            miniTask.status = 'completed';
        else
            miniTask.status = 'pending';

        await miniTask.save();

        res.status(200).json({ message : 'status updated !' });
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

module.exports = {
    addMiniTask,
    removeMiniTask,
    upadteStatus
}