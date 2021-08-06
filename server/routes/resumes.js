const express = require("express");
const router = express.Router();
const resumesController = require('../controllers/resumesController');

router.post("/resume", resumesController.uploadResumeToServer);
 
router.get("/resume/:jobId/:userId", resumesController.downloadResume);

module.exports = router;
