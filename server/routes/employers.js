const express = require('express');
const router = express.Router();
const employersController = require('../controllers/employersController');

// create employers

router.post('/employers/create', employersController.create);

// get employers

router.get('/employers', employersController.getAll);

// get specific

router.get('/employers/featuredEmployers', employersController.getFeaturedEmployers);

// get specific

router.get('/employers/:id', employersController.getById);

// update employer

router.put('/employers/update/:id', employersController.update);

// delete employer

router.delete('/employers/delete/:id', employersController.remove);

module.exports = router;