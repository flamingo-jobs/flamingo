const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

// Create payment
router.post("/payment", paymentController.acceptPayment);

module.exports = router;
