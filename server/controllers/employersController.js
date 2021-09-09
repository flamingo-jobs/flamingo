const Employers = require("../models/employers");
const Jobs = require("../models/jobs");

const Jobseeker = require("../models/jobseeker");

const create = (req, res) => {
  let newEmployer = new Employers(req.body);

  newEmployer.save((err, employer) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingData: employer._id,
    });
  });
};

const getAll = (req, res) => {
  Employers.find().exec((err, employers) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingData: employers,
    });
  });
};

const getForTable = (req, res) => {
  Employers.find().exec((err, employers) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }

    let formattedArray = employers.map((obj) => {
      let ratings = 0;

      if (obj.reviews.length) {
        obj.reviews.forEach((item) => {
          ratings += item.rating;
        });

        ratings = ratings / obj.reviews.length;
        console.log(ratings);
      }

      let newObj = {
        _id: obj._id,
        name: obj.name,
        email: obj.email,
        dateRegistered: obj.dateRegistered,
        subscription: obj.subscription.type,
        ratings: ratings,
        categories: obj.categories,
        isFeatured: obj.isFeatured,
        locations: obj.locations,
        verificationFileName: obj.verificationFileName,
        verificationStatus: obj.verificationStatus
      };

      return newObj;
    });

    return res.status(200).json({
      success: true,
      existingData: formattedArray,
    });
  });
};

const getSearched = async (req, res) => {
  try {
    const result = await Employers.find({
      name: { $regex: req.params.string, $options: "i" },
    });
    res.status(200).json({ success: true, employers: result });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

const getFiltered = (req, res) => {
  Employers.find(req.body.queryParams, null, req.body.options).exec(
    (err, employers) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
        existingData: employers,
      });
    }
  );
};

const getById = (req, res) => {
  Employers.findById(req.params.id).exec((err, employer) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      employer: employer,
    });
  });
};

const getByIds = async (req, res) => {
  const employerIds = req.params.empIds.split("$$");

  try {
    const response = await Employers.find({ _id: { $in: employerIds } });
    res.status(200).json({
      success: true,
      employers: response,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err,
    });
  }
};

const getEmployerCount = (req, res) => {
  Employers.countDocuments(req.body).exec((err, employerCount) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      employerCount: employerCount,
    });
  });
};

const getFeaturedEmployers = (req, res) => {
  Employers.find({ isFeatured: true }, (err, featuredEmployers) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      featuredEmployers: featuredEmployers,
    });
  });
};

const getVerificationStatus = (req, res) => {
  Employers.findById(req.params.id).exec((err, employer) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      verificationStatus: employer.verificationStatus,
    });
  });
};

const update = (req, res) => {
  Employers.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, employer) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: "Updated successfully",
      });
    }
  );
};

const addReview = async (req, res) => {
  try {
    const remove = await Employers.findByIdAndUpdate(req.params.empId, {
      $pull: { reviews: { jobseekerId: req.body.jobseekerId } },
    });

    const result = await Employers.findByIdAndUpdate(req.params.empId, {
      $push: { reviews: req.body },
    });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
};

const remove = (req, res) => {
  Employers.findByIdAndDelete(req.params.id).exec((err, deletedEmployer) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "Employer deleted successfully",
      deletedEmployer: deletedEmployer,
    });
  });
};

const getAllApplications = async (req, res) => {
  Jobs.find({ "organization.id": req.params.id }, null, { limit: 4 })
    .exec()
    .then(async (moreFromJobs) => {
      let temp = [];

      for (let index = 0; index < moreFromJobs.length; index++) {
        const job = moreFromJobs[index];
        for (let jindex = 0; jindex < job.applicationDetails.length; jindex++) {
          const user = job.applicationDetails[jindex];
          var a = await Jobseeker.findById(user.userId);
          temp.push({ job: job.title, name: a.name,jobseekerId:a._id });
        }
      }

      return res.status(200).json({
        success: true,
        applications: temp,
      });
    })
    .catch((error) => {
      res.send({
        status: false,
        message: "Something went wrong please try again!!!!",
      });
    });
};

module.exports = {
  create,
  getAll,
  getSearched,
  getById,
  getByIds,
  update,
  addReview,
  remove,
  getFeaturedEmployers,
  getEmployerCount,
  getFiltered,
  getAllApplications,
  getForTable,
  getVerificationStatus,
};
