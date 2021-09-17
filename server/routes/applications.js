const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');

router.patch('/applications/status', applicationController.updateStatusToShortlist);

module.exports = router;

