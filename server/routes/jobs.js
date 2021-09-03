const express = require('express');
const router = express.Router();
const jobsController = require('../controllers/jobsController');
const recommendationController = require('../controllers/recommendationController');
const shortlistController = require('../controllers/shortlistingController');
// create jobs

router.post('/jobs/create', jobsController.create);

// get jobs

router.post('/jobs', jobsController.getAll);
router.post('/jobs/recommended', jobsController.getAllRecommendedJobs);

router.get('/jobs/generateRecommendations/:id', recommendationController.generateRecommendations);
router.get('/jobs/generateJobSeekerRecommendations/:id', recommendationController.generateJobSeekerRecommendations);

router.get("/jobs/shortlistForGivenCount/:jobId/:count", jobsController.shortlistForGivenCount);

router.get('/jobs/shortlistApplicants/:jobId/:settingId', shortlistController.shortlistApplicants);
router.get('/jobs/shortlistOnApplicantChanges/:jobId/:applicantId', shortlistController.shortlistOnApplicantChanges);

router.post('/jobs/customShortlisting', shortlistController.shortlistApplicantsCustoms);

// get specific
router.get('/jobs/search/:searchString', jobsController.getSearched);

router.post('/jobs/related/:searchString', jobsController.getSearched);

router.get('/jobs/featuredJobs', jobsController.getFeaturedJobs);

router.get('/jobs/filterByOrganization/:id', jobsController.getJobsFromEmployer);

//get all jobs of a particular employer
router.get('/jobs/filterAllByOrganization/:id', jobsController.getAllJobsFromEmployer);

router.get('/jobs/filterAllByUser/:loginId/:userId', jobsController.getAllJobsFromUser);

// get specific

router.post('/jobs/getJobCount', jobsController.getJobCount);

// get specific

router.get('/jobs/:id', jobsController.getById);
router.patch('/jobs/updateResumeDetails/:id', jobsController.updateResumeDetails);
router.patch("/jobs/resetApplicationDetails", jobsController.resetAll);

// update job

router.put('/jobs/update/:id', jobsController.update);
router.patch('/jobs/updateResumeStatus/:id', jobsController.updateResumeStatus);

// delete job

router.delete('/jobs/delete/:id', jobsController.remove);

router.get('/jobs/getOpeningsByOrg/:id', jobsController.getOpeningCountByOrg);

module.exports = router;