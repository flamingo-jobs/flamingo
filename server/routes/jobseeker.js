const express = require('express');
const router = express.Router();
const jobseekerController = require('../controllers/jobseekerController');

// create jobseeker

router.post('/jobseeker/create', jobseekerController.create);

// get jobseeker

router.get('/jobseekers', jobseekerController.getAll);
router.post('/jobseekers/filter', jobseekerController.getFiltered);
router.post('/jobseekers/getJobseekerCount', jobseekerController.getCount);

// get specific

router.get('/jobseeker/:id', jobseekerController.getById);

// update jobseeker

router.put('/jobseeker/update/:id', jobseekerController.update);
router.put('/jobseeker/updateUniversity/:id', jobseekerController.updateUniversity);
router.put('/jobseeker/updateSchool/:id', jobseekerController.updateSchool);
router.put('/jobseeker/updateCourse/:id', jobseekerController.updateCourse);
router.put('/jobseeker/updateVolunteer/:id', jobseekerController.updateVolunteer);
router.put('/jobseeker/updateAward/:id', jobseekerController.updateAward);
router.put('/jobseeker/updateWork/:id', jobseekerController.updateWork);
router.put('/jobseeker/updateProject/:id', jobseekerController.updateProject);

// add new fields
router.put('/jobseeker/addUniversity/:id', jobseekerController.addUniversity);
router.put('/jobseeker/addSchool/:id', jobseekerController.addSchool);
router.put('/jobseeker/addCourse/:id', jobseekerController.addCourse);
router.put('/jobseeker/addAward/:id', jobseekerController.addAward);
router.put('/jobseeker/addVolunteering/:id', jobseekerController.addVolunteering);
router.put('/jobseeker/addProject/:id', jobseekerController.addProject);
router.put('/jobseeker/addWork/:id', jobseekerController.addWork);

// delete

router.delete('/jobseeker/delete/:id', jobseekerController.remove);
router.put('/jobseeker/removeUniversity/:id', jobseekerController.removeUniversity);
router.put('/jobseeker/removeSchool/:id', jobseekerController.removeSchool);
router.put('/jobseeker/removeCourse/:id', jobseekerController.removeCourse);
router.put('/jobseeker/removeProject/:id', jobseekerController.removeProject);
router.put('/jobseeker/removeWork/:id', jobseekerController.removeWork);
router.put('/jobseeker/removeAward/:id', jobseekerController.removeAward);
router.put('/jobseeker/removeVolunteer/:id', jobseekerController.removeVolunteer);

module.exports = router;