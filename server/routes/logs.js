const express = require('express');
const router = express.Router();
const logsController = require('../controllers/logsController');

router.post('/logs/create/:jobId/:userId', logsController.createLogsForJobs);

module.exports = router;
