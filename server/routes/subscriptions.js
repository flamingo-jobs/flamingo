const express = require('express');
const router = express.Router();
const subscriptionsController = require('../controllers/subscriptionsController');

// create subscriptions

router.post('/subscriptions/create', subscriptionsController.create);

// get subscriptions

router.get('/subscriptions', subscriptionsController.getAll);

// get specific


// get specific

router.get('/subscriptions/:id', subscriptionsController.getById);

// update category

router.put('/subscriptions/update/:id', subscriptionsController.update);

// delete category

router.post('/subscriptions/delete', subscriptionsController.remove);

module.exports = router;