const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

// Create payment
router.post("/payment", paymentController.payherePayment);
router.post("/checkout", paymentController.stripePayment);
router.post("/create-order", paymentController.createOrder);
router.post("/get-order-details/:id", paymentController.getOrderById);

module.exports = router;
