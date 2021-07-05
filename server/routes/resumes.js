const express = require("express");
const router = express.Router();
const resumesController = require('../controllers/resumesController');

router.post("/resume", resumesController.uploadResumeToServer);

module.exports = router;
