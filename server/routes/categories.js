const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');

// create categories

router.post('/categories/create', categoriesController.create);

// get categories

router.get('/categories', categoriesController.getAll);

// get specific

router.get('/categories/featuredCategories', categoriesController.getFeaturedCategories);

// get specific

router.get('/categories/:id', categoriesController.getById);

// update category

router.put('/categories/update/:id', categoriesController.update);

// delete category

router.post('/categories/delete', categoriesController.remove);

module.exports = router;