const Employers = require("../models/employers");

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
  
  try{
    const response = await Employers.find({'_id':{$in: employerIds}});
    res.status(200).json({
      success: true,
      employers: response
    });
  }catch(err){
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
        sucess: "Updated successfully",
      });
    }
  );
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

module.exports = {
  create,
  getAll,
  getById,
  getByIds,
  update,
  remove,
  getFeaturedEmployers,
  getEmployerCount,
  getFiltered,
};
