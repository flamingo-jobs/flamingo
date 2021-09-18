const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

// Create payment
router.post("/payment", paymentController.payherePayment);
router.post("/checkout", paymentController.stripePayment);
router.post("/create-order", paymentController.createOrder);
router.post("/get-order-details/:id", paymentController.getOrderById);
router.get("/orders/:id", paymentController.getAllOrdersByEmployer);
router.get("/get-next-dates/:id", paymentController.getNextDate);

module.exports = router;
