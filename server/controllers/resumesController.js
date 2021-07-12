const Jobseeker = require("../models/jobseeker");

const multer = require("multer");
const path = require("path");

// const fileName = Date.now().toString();
let fileName = "";

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../resumes/"));
  },
  filename: (req, file, cb) => {
    fileName = req.body.jobId + "--" + req.body.userId + path.extname(file.originalname);
    fileName.replace(/:/g, "-");
    cb(null, fileName);
  },
});

const upload = multer({ storage: fileStorageEngine }).single("resume");

const uploadResumeToServer = (req, res) => {
  upload(req, res, (err) => {
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
    res.set({
      'Content-Type': "application/pdf"
    });
    const resumeName = req.params.jobId + "--" + req.params.userId + ".pdf";
    const resumePath = path.join(__dirname, '..', "resumes" , resumeName);
    res.sendFile(resumePath);

  } catch (error) {
    res.status(400).json({
      success: false,
      error: "Error while downloading file. Please try again later."
    });
  }
}

module.exports = {
  uploadResumeToServer,
  downloadResume,
};
