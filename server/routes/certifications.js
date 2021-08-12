const express = require('express');
const router = express.Router();
const certificationsController = require('../controllers/certificationsController');

// create certifications

router.post('/certifications/create', certificationsController.create);

// get certifications

router.get('/certifications', certificationsController.getAll);

// get specific

router.get('/certifications/featuredCertifications', certificationsController.getFeaturedCertifications);

// get specific

router.get('/certifications/:id', certificationsController.getById);

// update category

router.put('/certifications/update/:id', certificationsController.update);

// delete category

router.post('/certifications/delete', certificationsController.remove);

module.exports = router;