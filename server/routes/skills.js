const express = require('express');
const router = express.Router();
const skillsController = require('../controllers/skillsController');

// create skills

router.post('/skills/create', skillsController.create);

// get skills

router.get('/skills', skillsController.getAll);

// get specific

router.get('/skills/:id', skillsController.getById);

// update skill

router.put('/skills/update/:id', skillsController.update);

// delete skill

router.post('/skills/delete', skillsController.remove);

module.exports = router;