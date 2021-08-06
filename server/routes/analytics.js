const express = require("express");
const router = express.Router();

// Controllers
const analyticsController = require("../controllers/analyticsController");

router.get("/analytics/getMonthlyJobs", analyticsController.getMonthlyJobs);
router.get("/analytics/getMonthlyUsers/:userRole", analyticsController.getMonthlyUsers);
router.get("/analytics/getCategories", analyticsController.getJobCategories);

module.exports = router;




