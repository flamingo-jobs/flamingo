const express = require('express');
const router = express.Router();
const jobseekerController = require('../controllers/jobseekerController');

// Validations
const {applyFormValidations, applyFormValidationResults} = require("../validations/applyForm");

// create jobseeker

router.post('/jobseeker/create', jobseekerController.create);

// get jobseeker

router.get('/jobseekers', jobseekerController.getAll);
router.get('/jobseekers/toTable', jobseekerController.getForTable);
router.get('/jobseekers/search/:string', jobseekerController.getSearched);
router.post('/jobseekers/filter', jobseekerController.getFiltered);
router.post('/jobseekers/getJobseekerCount', jobseekerController.getCount);
router.post('/jobseekers/delete', jobseekerController.block);

// get specific

router.get('/jobseeker/:id', jobseekerController.getById);
router.get("/jobseeker/applicants/:ids", jobseekerController.getByIds);
router.get('/jobseeker/getNotifications/:id', jobseekerController.getNotifications);

// update jobseeker

router.put('/jobseeker/update/:id', jobseekerController.update);
router.put('/jobseeker/updateSkills/:id', jobseekerController.updateSkills);
router.post('/jobseeker/updateProfilePic/:id', jobseekerController.updateProfilePic);
router.put('/jobseeker/updateTechnologyStack/:id', jobseekerController.updateTechnologyStack);
router.put('/jobseeker/updateTechnologyItem/:id', jobseekerController.updateTechnologyItem);
router.put('/jobseeker/updateInterests/:id', jobseekerController.updateInterests);
router.put('/jobseeker/updateEducation/:id', jobseekerController.updateEducation);
router.put('/jobseeker/updateCertificate/:id', jobseekerController.updateCertificate);
router.put('/jobseeker/updateCourse/:id', jobseekerController.updateCourse);
router.put('/jobseeker/updateVolunteer/:id', jobseekerController.updateVolunteer);
router.put('/jobseeker/updateAward/:id', jobseekerController.updateAward);
router.put('/jobseeker/updateWork/:id', jobseekerController.updateWork);
router.put('/jobseeker/updateProject/:id', jobseekerController.updateProject);
router.patch('/jobseeker/updateResumeStatus/:id', jobseekerController.updateResumeStatus);
router.patch('/jobseeker/updateResumeDetails/:id', jobseekerController.updateResumeDetails);
router.patch("/jobseeker/updateSavedJobs/:id", jobseekerController.updateSavedJobs);
router.patch("/jobseeker/updateFavoriteOrgs/:id", jobseekerController.updateFavoriteOrgs);
router.patch("/jobseeker/resetApplicationDetails", jobseekerController.resetAll);

// add new fields
router.put('/jobseeker/addEducation/:id', jobseekerController.addEducation);
router.put('/jobseeker/addCertificate/:id', jobseekerController.addCertificate);
router.put('/jobseeker/addCourse/:id', jobseekerController.addCourse);
router.put('/jobseeker/addAward/:id', jobseekerController.addAward);
router.put('/jobseeker/addVolunteering/:id', jobseekerController.addVolunteering);
router.put('/jobseeker/addProject/:id', jobseekerController.addProject);
router.put('/jobseeker/addWork/:id', jobseekerController.addWork);
router.put('/jobseeker/addReach/:id', jobseekerController.addReach);

// delete

router.delete('/jobseeker/delete/:id', jobseekerController.remove);
router.put('/jobseeker/removeEducation/:id', jobseekerController.removeEducation);
router.put('/jobseeker/removeCertificate/:id', jobseekerController.removeCertificate);
router.put('/jobseeker/removeCourse/:id', jobseekerController.removeCourse);
router.put('/jobseeker/removeProject/:id', jobseekerController.removeProject);
router.put('/jobseeker/removeWork/:id', jobseekerController.removeWork);
router.put('/jobseeker/removeAward/:id', jobseekerController.removeAward);
router.put('/jobseeker/removeVolunteer/:id', jobseekerController.removeVolunteer);
router.put('/jobseeker/removeSkill/:id', jobseekerController.removeSkill);

module.exports = router;