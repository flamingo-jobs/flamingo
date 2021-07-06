const express = require('express');
const router = express.Router();
const keywordsController = require('../controllers/keywordsController');


// Create keywords
router.post('/keywords', keywordsController.create);

// get keywords
router.get('/keywords', keywordsController.getAll);

// update keywords
router.patch('/keywords/:id', keywordsController.updateKeyword);

// Delete a keyword
router.delete('/keywords/:id', keywordsController.removeKeyword);

module.exports = router;