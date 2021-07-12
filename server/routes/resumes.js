const express = require("express");
const router = express.Router();
const resumesController = require('../controllers/resumesController');

router.get("/resume/:jobId/:userId", resumesController.downloadResume);

router.post("/resume", resumesController.uploadResumeToServer);

module.exports = router;
