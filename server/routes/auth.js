const express = require("express");
const router = express.Router();

const {
  signup,
  signin,
  forgotPassword,
  linkAccount,
  resetPassword,
  inviteEmlpoyee,
} = require("../controllers/auth");

router.put("/forgot-password/:email", forgotPassword);
router.put("/reset-password/:passwordResetCode", resetPassword);
router.post("/invite", inviteEmlpoyee);
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/link-account", linkAccount);

module.exports = router;
