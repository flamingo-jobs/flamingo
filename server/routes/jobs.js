const express = require('express');
const router = express.Router();
const jobsController = require('../controllers/jobsController');

// create jobs

router.post('/jobs/create', jobsController.create);

// get jobs

router.post('/jobs', jobsController.getAll);


// get specific

router.get('/jobs/featuredJobs', jobsController.getFeaturedJobs);

router.get('/jobs/filterByOrganization/:id', jobsController.getJobsFromEmployer);

//get all jobs of a particular employer
router.get('/jobs/filterAllByOrganization/:id', jobsController.getAllJobsFromEmployer);

// get specific

router.post('/jobs/getJobCount', jobsController.getJobCount);

// get specific

router.get('/jobs/:id', jobsController.getById);
router.patch('/jobs/updateResumeDetails/:id', jobsController.updateResumeDetails);
router.patch("/jobs/resetApplicationDetails", jobsController.resetAll);

// update job

router.put('/jobs/update/:id', jobsController.update);

// delete job

router.delete('/jobs/delete/:id', jobsController.remove);

module.exports = router;