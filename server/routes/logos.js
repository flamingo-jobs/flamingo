const express = require("express");
const router = express.Router();
const filesController = require('../controllers/filesController');

router.post("/logo", filesController.uploadLogoToServer);
 
//router.get("/logo/:loginId", filesController.downloadLogo);

module.exports = router;
