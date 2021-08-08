const Jobseeker = require("../models/jobseeker");

const multer = require("multer");
const path = require("path");
const fs = require("fs");

// const fileName = Date.now().toString();
let fileName = "";

const resumeStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../resumes/"));
  },
  filename: (req, file, cb) => {
    fileName = req.body.jobId + "--" + req.body.userId + path.extname(file.originalname);
    fileName.replace(/:/g, "-");
    cb(null, fileName);
  },
});

const logoStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../logos/"));
  },
  filename: (req, file, cb) => {
    fileName = req.body.company + path.extname(file.originalname);
    fileName.replace(/:/g, "-");
    cb(null, fileName);
  },
});

const uploadLogo = multer({ storage: logoStorageEngine }).single("logo");
const uploadResume = multer({ storage: resumeStorageEngine }).single("resume");


const uploadResumeToServer = (req, res) => {
  uploadResume(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
    });
  });
  // console.log(req.file);
};

const uploadLogoToServer = (req, res) => {
  uploadLogo(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
    });
  });
  // console.log(req.file);
};

const downloadResume = async (req, res) => {
  try {
    const resumeName = req.params.jobId + "--" + req.params.userId + ".pdf";
    const resumePath = path.join(__dirname, '..', "resumes" , resumeName);

    var file = fs.createReadStream(resumePath);
    file.pipe(res);

  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  uploadResumeToServer,
  uploadLogoToServer,
  downloadResume,
};
