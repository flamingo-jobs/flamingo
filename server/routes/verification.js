const express = require("express");
const router = express.Router();

// Controllers
const verificationController = require("../controllers/verificationController");

router.post("/verification/create", verificationController.create);

module.exports = router;
