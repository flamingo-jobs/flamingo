const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// create users

router.post('/users/create', usersController.create);

// get users

router.get('/users', usersController.getAll);

// get specific

router.get('/users/:id', usersController.getById);

// update user

router.put('/users/update/:id', usersController.update);

// delete user

router.delete('/users/delete/:id', usersController.remove);

module.exports = router;