const express = require("express");
const router = express.Router();
const filesController = require('../controllers/filesController');

router.post("/logo", filesController.uploadLogoToServer);
 
router.get("/logo/:logoName", filesController.downloadLogo);

module.exports = router;
