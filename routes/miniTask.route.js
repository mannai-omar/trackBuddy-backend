const express = require('express');
const router = express.Router();
const miniTaskController = require('../controllers/miniTask.controller');
const middlewares = require('../middlewares/middlewares');


router.post('/' , miniTaskController.addMiniTask);
router.delete('/:id' , middlewares.checkMiniTaskExistence, miniTaskController.removeMiniTask);
router.patch('/:id' , middlewares.checkMiniTaskExistence, miniTaskController.upadteStatus);

module.exports = router ;