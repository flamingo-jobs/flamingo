const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

// Create payment
router.post("/payment", paymentController.acceptPayment);
router.post("/checkout", paymentController.stripePayment)

module.exports = router;
