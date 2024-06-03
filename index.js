const express = require('express')
const app = express()
app.use(express.json())
const mongoose = require('mongoose');
const taskRoutes=require('./routes/task.route');
const userRoutes=require('./routes/user.route');
const miniTaskRoutes=require('./routes/miniTask.route');

app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);
app.use('/api/miniTasks', miniTaskRoutes);


mongoose.connect('mongodb+srv://mannaiomar28:DEGqlp9YncgJLf5K@trackbuddy.z683wku.mongodb.net/?retryWrites=true&w=majority&appName=trackBuddy')
    .then(() => {
        console.log('Connected to database!');
        app.listen(3000, () => {
            console.log("server running on port 3000")
        });
    })
    .catch(() => {
        console.error();
    })



