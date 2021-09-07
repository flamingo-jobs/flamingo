const express = require('express');
const router = express.Router();
const employersController = require('../controllers/employersController');

const multer = require("multer");

// create employers

router.post('/employers/create', employersController.create);

// get employers

router.get('/employers', employersController.getAll);
router.get('/employers/toTable', employersController.getForTable);
// get specific
router.get('/employers/search/:string', employersController.getSearched);

router.get('/employers/featuredEmployers', employersController.getFeaturedEmployers);

router.post('/employers/getEmployerCount', employersController.getEmployerCount);

router.post('/employers/filter', employersController.getFiltered);

// get specific

router.get('/employers/:id', employersController.getById);
router.get("/employers/favorites/:empIds", employersController.getByIds);
router.get("/employer/verificationStatus/:id", employersController.getVerificationStatus);

// update employer
router.put('/employers/update/:id', employersController.update);
router.patch("/employers/addReview/:empId", employersController.addReview);

// delete employer
router.post('/employer/delete', employersController.remove);

router.get('/applications/:id', employersController.getAllApplications);

//profile update

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./companyImage"); //important this is a direct path fron our current file to storage location
    },
    filename: (req, file, cb) => {
      cb(null,  file.originalname);
    },
  });

  const upload = multer({ storage: fileStorageEngine });

// Single File Route Handler
router.post("/companyImage/:id", upload.single("image"), (req, res) => {
  console.log(req.file);
  console.log(req.params['id']);
  res.send("Single FIle upload success");
});

module.exports = router;