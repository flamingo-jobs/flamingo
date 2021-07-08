const express = require("express");
const router = express.Router();

const { signup, signin, forgotPassword } = require("../controllers/auth");

router.post("/signup", signup);
router.post("/signin", signin);
router.put("/forgot-password/:email", forgotPassword);
module.exports = router;
