const express = require("express");
const router = express.Router();
const filesController = require('../controllers/filesController');

router.post("/resume", filesController.uploadResumeToServer);
 
router.get("/resume/:jobId/:userId", filesController.downloadResume);

module.exports = router;
