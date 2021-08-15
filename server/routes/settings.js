const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');


// get categories

router.get('/settings', settingsController.getAll);


router.get('/settings/:id', settingsController.getById);

router.get('/settingsByType/:typeString', settingsController.getByType);

// update category

router.put('/settings/update/:id', settingsController.update);


module.exports = router;