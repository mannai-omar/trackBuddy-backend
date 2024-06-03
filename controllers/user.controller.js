const User = require("../models/user.model");

const listUsers = async (req,res) => {
    try {
        const users= await User.find().populate('tasks');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const addUser = async (req,res) => {
    try {
        const user= await User.create(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const editUser = async (req,res) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const findUser = async (req,res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id).populate('tasks');
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const deleteUser = async (req,res) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
        res.status(200).json({message: 'user deleted !'});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

module.exports = {
    listUsers,
    addUser,
    editUser,
    findUser,
    deleteUser,
};