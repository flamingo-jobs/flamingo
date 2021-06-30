const express = require('express');
const router = express.Router();
const technologiesController = require('../controllers/technologiesController');

// create technologies

router.post('/technologies/create', technologiesController.create);

// get technologies

router.get('/technologies', technologiesController.getAll);

// get specific

router.get('/technologies/:id', technologiesController.getById);

// update category

router.put('/technologies/update/:id', technologiesController.update);

// delete category

router.post('/technologies/delete', technologiesController.remove);

module.exports = router;