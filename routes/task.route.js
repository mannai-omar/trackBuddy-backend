const express = require("express");
const router = express.Router();
const taskController = require('../controllers/task.controller');
const middlewares = require('../middlewares/middlewares');

router.post('/', taskController.addTask);
router.get('/', taskController.listTasks);
//router.get('/user/:id', taskController.listTasksByUser);
router.delete('/:id', middlewares.checkTaskExistence, taskController.deleteTask);
router.get('/:id', middlewares.checkTaskExistence, taskController.findTask);
router.patch('/:id', middlewares.checkTaskExistence, taskController.editTask);

module.exports = router;