const Group = require("../models/group.model");
const mongoose = require('mongoose');
const User = require("../models/user.model");



const listGroups = async (req, res) => {
    try {
        const groups = await Group.find().populate('creator').populate('users');
        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const findGroup = async (req, res) => {
    try {
        const { id } = req.params;
        const group = await Group.findById(id).populate('creator').populate('users');
        res.status(200).json(group);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addGroup = async (req, res) => {
    try {
        const group = await Group.create(req.body);
        const user = await User.findById(req.body.creator);
        user.groups.push(group._id);
        await user.save();
        res.status(200).json(group);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteGroup = async (req, res) => {
    try {
        const { id } = req.params;
        await Group.findByIdAndDelete(id);
        res.status(200).json({ message: 'group deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const editGroup = async (req, res) => {
    try {
        const { id } = req.params;
        const group = await Group.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(group);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const group = await Group.findById(id);
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        if (group.users.includes(userId)) {
            return res.status(400).json({ message: 'User already in group' });
        }
        group.users.push(userId);
        await group.save();

        const user = await User.findById(userId);
        console.log(user);
        user.groups.push(group._id);
        await user.save(); 
        res.status(200).json(group);
        console.log('user added to group !');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const removeUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const group = await Group.findById(id);
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        if (!group.users.includes(userId)) {
            return res.status(400).json({ message: 'User not in group' });
        }
        // Remove user from group
        group.users = group.users.filter(existingUserId => existingUserId.toString() !== userId);
        await group.save();

        // Remove group from user's groups
        const user = await User.findById(userId);
        user.groups = user.groups.filter(groupId => groupId.toString() !== group._id.toString());
        await user.save();
        res.status(200).json(group);
        console.log('user removed from group !');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    addGroup,
    listGroups,
    findGroup,
    deleteGroup,
    editGroup,
    addUser,
    removeUser
}

