const express = require('express');
const router = express.Router();
const employersController = require('../controllers/employersController');

// create employers

router.post('/employers/create', employersController.create);

// get employers

router.get('/employers', employersController.getAll);

// get specific
router.get('/employers/search/:string', employersController.getSearched);

router.get('/employers/featuredEmployers', employersController.getFeaturedEmployers);

router.post('/employers/getEmployerCount', employersController.getEmployerCount);

router.post('/employers/filter', employersController.getFiltered);

// get specific

router.get('/employers/:id', employersController.getById);
router.get("/employers/favorites/:empIds", employersController.getByIds);


// update employer
router.put('/employers/update/:id', employersController.update);
router.patch("/employers/addReview/:empId", employersController.addReview);

// delete employer
router.post('/employer/delete', employersController.remove);

module.exports = router;