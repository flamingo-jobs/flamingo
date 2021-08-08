const express = require("express");
const router = express.Router();

// Controllers
const analyticsController = require("../controllers/analyticsController");

router.get("/analytics/getNewUsers/:userRole", analyticsController.getNewUsers);
router.get("/analytics/getMonthlyJobs", analyticsController.getMonthlyJobs);
router.get("/analytics/getMonthlyUsers/:userRole", analyticsController.getMonthlyUsers);
router.get("/analytics/getCategories", analyticsController.getJobCategories);
router.get("/analytics/getMonthlyResumes", analyticsController.getMonthlyResumes);
router.get("/analytics/getMonthlySubs", analyticsController.getMonthlySubscriptions);

module.exports = router;




