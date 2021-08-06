const express = require("express");
const router = express.Router();

// Controllers
const analyticsController = require("../controllers/analyticsController");

router.get("/analytics/getMonthlyJobs", analyticsController.getMonthlyJobs);


module.exports = router;




