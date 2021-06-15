const express = require('express');
const router = express.Router();
const typesController = require('../controllers/typesController');

// create types

router.post('/types/create', typesController.create);

// get types

router.get('/types', typesController.getAll);

// get specific

router.get('/types/featuredTypes', typesController.getFeaturedTypes);

// get specific

router.get('/types/:id', typesController.getById);

// update type

router.put('/types/update/:id', typesController.update);

// delete type

router.delete('/types/delete/:id', typesController.remove);

module.exports = router;