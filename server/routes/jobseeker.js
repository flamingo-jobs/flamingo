const express = require('express');
const router = express.Router();
const jobseekerController = require('../controllers/jobseekerController');

// create jobs

router.post('/jobseeker/create', jobseekerController.create);

// get jobs

router.get('/jobseeker', jobseekerController.getAll);

// get specific

router.get('/jobseeker/:id', jobseekerController.getById);

// update job

router.put('/jobseeker/update/:id', jobseekerController.update);

router.put('/jobseeker/addEducation/:id', jobseekerController.addEducation);

// delete job

router.delete('/jobseeker/delete/:id', jobseekerController.remove);

module.exports = router;