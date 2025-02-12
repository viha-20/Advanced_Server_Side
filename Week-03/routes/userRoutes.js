const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/getAllusers', userController.getUsers);
router.get('/users/:id', userController.getUser);
router.post('/createUser', userController.addUser);
router.put('/updateUser/:id', userController.updateUser);
router.delete('/deleteUsers/:id', userController.deleteUser);

module.exports = router;
