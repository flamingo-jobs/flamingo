const express = require("express");
const router = express.Router();

const {
  signup,
  signin,
  forgotPassword,
  linkAccount,
  resetPassword,
  changeEmail,
  generateOTP,
  inviteEmlpoyee,
  getUsersByEmployer,
  checkPassword,
  deleteUser,
  updateAccessTokens,
  changePassword,
  getGoogleOauthUrlRoute,
  googleOauthCallbackRoute,
} = require("../controllers/auth");

router.put("/forgot-password/:email", forgotPassword);
router.put("/reset-password/:passwordResetCode", resetPassword);
router.put("/change-email/:id", changeEmail)
router.post("/invite", inviteEmlpoyee);
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/link-account", linkAccount);
router.post("/check-password", checkPassword);
router.post("/remove-user", deleteUser);
router.post("/update-tokens", updateAccessTokens);
router.post("/change-password", changePassword);
router.get("/getUsersByEmployer/:id", getUsersByEmployer);
router.get("/get-otp/:email", generateOTP);
router.get("/google/url", getGoogleOauthUrlRoute);
router.get("/google-callback", googleOauthCallbackRoute);

module.exports = router;
