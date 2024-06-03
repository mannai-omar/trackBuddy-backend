const express = require('express');
const router = express.Router();
const groupsController = require('../controllers/group.controller');

router.post('/', groupsController.addGroup);
router.get('/', groupsController.listGroups);
router.get('/:id', groupsController.findGroup); 
router.patch('/:id', groupsController.editGroup);
router.delete('/:id', groupsController.deleteGroup);  
router.post('/:id/addUser', groupsController.addUser); 
router.post('/:id/removeUser', groupsController.removeUser); 

module.exports = router;