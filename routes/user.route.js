const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');


router.get('/', userController.listUsers);
router.post('/', userController.addUser);
router.delete('/:id', userController.deleteUser);
router.patch('/:id', userController.editUser);
router.get('/:id', userController.findUser);

module.exports = router;