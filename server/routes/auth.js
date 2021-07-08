const express = require("express");
const router = express.Router();

const {
  signup,
  signin,
  forgotPassword,
  linkAccount,
} = require("../controllers/auth");

router.post("/signup", signup);
router.post("/signin", signin);
router.put("/forgot-password/:email", forgotPassword);
router.post("/link-account", linkAccount);
module.exports = router;
