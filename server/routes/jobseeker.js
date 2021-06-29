const express = require('express');
const router = express.Router();
const jobseekerController = require('../controllers/jobseekerController');

// create jobseeker

router.post('/jobseeker/create', jobseekerController.create);

// get jobseeker

router.get('/jobseeker', jobseekerController.getAll);

// get specific

router.get('/jobseeker/:id', jobseekerController.getById);

// update jobseeker

router.put('/jobseeker/update/:id', jobseekerController.update);
router.put('/jobseeker/updateVolunteer/:id', jobseekerController.updateVolunteer);
router.put('/jobseeker/updateAward/:id', jobseekerController.updateAward);
router.put('/jobseeker/updateWork/:id', jobseekerController.updateWork);
router.put('/jobseeker/updateProject/:id', jobseekerController.updateProject);

// add new fields
router.put('/jobseeker/addEducation/:id', jobseekerController.addEducation);
router.put('/jobseeker/addAward/:id', jobseekerController.addAward);
router.put('/jobseeker/addVolunteering/:id', jobseekerController.addVolunteering);
router.put('/jobseeker/addProject/:id', jobseekerController.addProject);
router.put('/jobseeker/addWork/:id', jobseekerController.addWork);

// delete job

router.delete('/jobseeker/delete/:id', jobseekerController.remove);

module.exports = router;