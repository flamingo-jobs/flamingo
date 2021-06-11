const express = require('express');
const router = express.Router();
const jobsController = require('../controllers/jobsController');

// create jobs

router.post('/jobs/create', jobsController.create);

// get jobs

router.get('/jobs', jobsController.getAll);

// get specific

router.get('/jobs/:id', jobsController.getById);

// get specific

router.get('/jobs/featuredJobs', jobsController.getFeaturedJobs);

// update job

router.put('/jobs/update/:id', jobsController.update);

// delete job

router.delete('/jobs/delete/:id', jobsController.remove);

module.exports = router;