const Employers = require("../models/employers");
const Verification = require("../models/verification");

const create = (req, res) => {
  let errorList = [];
  let newVerification = new Verification(req.body);
  newVerification.save((err, verificationRequest) => {
    if (err) {
      return res.status(400).json({
        error: errorList,
      });
    }
    return res.status(200).json({
      success: true,
      existingData: verificationRequest._id,
    });
  });
};

const getAll = (req, res) => {
  Verification.find().exec((err, verificationRequests) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingData: verificationRequests,
    });
  });
};

module.exports = {
  create,
  getAll,
};
