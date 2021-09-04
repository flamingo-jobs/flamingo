const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// create contact

router.post('/contact/create', contactController.create);

// get contact

router.get('/contact', contactController.getAll);

// get specific

router.get('/contact/:id', contactController.getById);

// update category

router.put('/contact/update/:id', contactController.update);

// delete category

router.post('/contact/delete', contactController.remove);

module.exports = router;