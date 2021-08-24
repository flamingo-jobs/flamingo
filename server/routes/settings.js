const express = require("express");
const router = express.Router();
const settingsController = require("../controllers/settingsController");

// get settings

router.get("/settings", settingsController.getAll);

router.get("/settings/:id", settingsController.getById);

router.get("/settingsByType/:typeString", settingsController.getByType);

// post settings

router.post("/settings/create", settingsController.create);

// update setting

router.put("/settings/update/:id", settingsController.update);

module.exports = router;
