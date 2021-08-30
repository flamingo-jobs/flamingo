const Jobseeker = require("../models/jobseeker");
var multer  = require('multer');
var path = require('path');
const fs = require("fs");


const create = (req, res) => {
  let newJobseeker = new Jobseeker(req.body);

  newJobseeker.save((err, jobseeker) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingData: jobseeker._id,
    });
  });
};

const getForTable = (req, res) => {
  Jobseeker.find().exec((err, jobseeker) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }

    let formattedArray = jobseeker.map(obj => {
      let newObj = {
        _id: obj._id,
        name: obj.name,
        email: obj.contact.email,
        mobile: obj.contact.mobile
      };

      return newObj
    })

    return res.status(200).json({
      success: true,
      existingData: formattedArray,
    });
  });
};

const getAll = (req, res) => {
  Jobseeker.find().exec((err, jobseeker) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingData: jobseeker,
    });
  });
};

const getSearched = async (req, res) => {
  try {
    const result = await Jobseeker.find({
      name: { $regex: req.params.string, $options: "i" },
    });
    res.status(200).json({ success: true, jobseekers: result });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

const getFiltered = (req, res) => {
  Jobseeker.find(req.body.queryParams, null, req.body.options).exec(
    (err, jobSeekers) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
        existingData: jobSeekers,
      });
    }
  );
};

const getCount = (req, res) => {
  Jobseeker.countDocuments(req.body).exec((err, jobseekerCount) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      jobseekerCount: jobseekerCount,
    });
  });
};

const getById = (req, res) => {
  Jobseeker.findById(req.params.id).exec((err, jobseeker) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      jobseeker: jobseeker,
    });
  });
};

const getByIds = async (req, res) => {
  const jobseekers = req.params.ids.split("$$");
  try {
    const response = await Jobseeker.find({ '_id': { $in: jobseekers } });
    res.status(200).json({
      success: true,
      jobseekers: response
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err,
    });
  }
};

// ------update ----------------------------------------
const update = (req, res) => {
  Jobseeker.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, jobseeker) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
      });
    }
  );
};
//--------------------------------------------

let fileName = "";

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../profilePictures/"));
  },
  filename: (req, file, cb) => {
    fileName = req.body.userId + path.extname(file.originalname);
    fileName.replace(/:/g, "-");
    cb(null, fileName);
    console.log(fileName);
  },
});

const uploadPic = multer({ storage: storage }).single("photo");

const fileFilter=(req, file, cb)=>{
  console.log("inside fileFilter")
 if(file.mimetype ==='image/jpeg' || file.mimetype ==='image/jpg' || file.mimetype ==='image/png'){
     cb(null,true);
 }else{
     cb(null, false);
 }

}

const updateProfilePic = (req, res) => {

  uploadPic(req, res, (err) => {
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
};

const updateSkills = (req, res) => {
  Jobseeker.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, jobseeker) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
      });
    }
  );
};

const updateTechnologyStack = (req, res) => {
  Jobseeker.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { technologyStack: req.body } },
    (err, jobseeker) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
      });
    }
  );
};

const updateInterests = (req, res) => {
  Jobseeker.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { interests: req.body } },
    (err, jobseeker) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
      });
    }
  );
};

const updateVolunteer = (req, res) => {
  Jobseeker.updateOne(
    { _id: req.params.id },
    {
      $set: { [`volunteer.${req.body.index}`]: req.body.volunteer },
    },
    (err, jobseeker) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
      });
    }
  );
};

const updateAward = (req, res) => {
  Jobseeker.updateOne(
    { _id: req.params.id },
    {
      $set: { [`award.${req.body.index}`]: req.body.award },
    },
    (err, jobseeker) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
      });
    }
  );
};

const updateTechnologyItem = (req, res) => {
  Jobseeker.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body
    },
    (err, technology) => {
      if (err) {
        return res.status(400).json({
          error: err
        })
      }
      return res.status(200).json({
        success: "Updated successfully"
      });
    }
  );
};

const updateEducation = (req, res) => {
  Jobseeker.updateOne(
    { _id: req.params.id },
    {
      $set: { [`education.${req.body.index}`]: req.body.education },
    },
    (err, jobseeker) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
      });
    }
  );
};

const updateCourse = (req, res) => {
  Jobseeker.updateOne(
    { _id: req.params.id },
    {
      $set: { [`course.${req.body.index}`]: req.body.course },
    },
    (err, jobseeker) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
      });
    }
  );
};

const updateCertificate = (req, res) => {
  Jobseeker.updateOne(
    { _id: req.params.id },
    {
      $set: { [`certificate.${req.body.index}`]: req.body.certificate },
    },
    (err, jobseeker) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
      });
    }
  );
};

const updateWork = (req, res) => {
  Jobseeker.updateOne(
    { _id: req.params.id },
    {
      $set: { [`work.${req.body.index}`]: req.body.work },
    },
    (err, jobseeker) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
      });
    }
  );
};

const updateProject = (req, res) => {
  Jobseeker.updateOne(
    { _id: req.params.id },
    {
      $set: { [`project.${req.body.index}`]: req.body.project },
    },
    (err, jobseeker) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
      });
    }
  );
};

const updateResumeStatus = async (req, res) => {
  try {
    const updatedJobseeker = await Jobseeker.updateOne(
      { _id: req.params.id, "applicationDetails.jobId": req.body.jobId },
      {
        $set: { [`applicationDetails.$.status`]: req.body.status }
      },
    );
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
}

const updateResumeDetails = async (req, res) => {
  try {
    const removedArrayElement = await Jobseeker.findByIdAndUpdate(
      req.params.id,
      { $pull: { applicationDetails: { resumeName: req.body.resumeName } } },
      { safe: true, multi: true }
    );
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }

  try {
    const updatedJobseeker = await Jobseeker.findByIdAndUpdate(
      req.params.id,
      { $push: { applicationDetails: req.body } },
    );
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
}

const updateSavedJobs = async (req, res) => {
  try {
    const updatedSavedJobs = await Jobseeker.findByIdAndUpdate(
      req.params.id,
      { $set: { savedJobs: req.body } },
    );
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
}

const updateFavoriteOrgs = async (req, res) => {
  try {
    const updatedFavoriteOrgs = await Jobseeker.findByIdAndUpdate(
      req.params.id,
      { $set: { favoriteOrganizations: req.body } },
    );
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
}

const resetAll = (req, res) => { // To clear the test resume details
  Jobseeker.updateMany(
    {},
    { $set: { applicationDetails: [] } },
    (err, job) => {
      if (err) {
        return res.status(400).json({
          error: err
        })
      }
      return res.status(200).json({
        sucess: "Updated successfully"
      });
    }
  );
}

//--------------- add --------------------------------------------
const addEducation = (req, res) => {
  Jobseeker.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { education: req.body } },
    (err, jobseeker) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
      });
    }
  );
};

const addCourse = (req, res) => {
  Jobseeker.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { course: req.body } },
    (err, jobseeker) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
      });
    }
  );
};

const addCertificate = (req, res) => {
  Jobseeker.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { certificate: req.body } },
    (err, jobseeker) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
      });
    }
  );
};

const addAward = (req, res) => {
  Jobseeker.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { award: req.body } },
    (err, jobseeker) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
      });
    }
  );
};

const addVolunteering = (req, res) => {
  Jobseeker.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { volunteer: req.body } },
    (err, jobseeker) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
      });
    }
  );
};

const addProject = (req, res) => {
  Jobseeker.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { project: req.body } },
    (err, jobseeker) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
      });
    }
  );
};

const addWork = (req, res) => {
  Jobseeker.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { work: req.body } },
    (err, jobseeker) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
      });
    }
  );
};

const addReach = (req, res) => {
  Jobseeker.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { reach: req.body } },
    (err, jobseeker) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
      });
    }
  );
};

// -------- remove -------------------------------
const remove = (req, res) => {
  Jobseeker.findByIdAndDelete(req.params.id).exec((err, deletedJobseeker) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      deletedJobseeker,
    });
  });
};

const block = (req, res) => {
  Jobseeker.deleteMany(req.body).exec((err, deletedJobSeeker) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      blockedJobSeeker: deletedJobSeeker,
    });
  });
};

const removeProject = (req, res) => {
  Jobseeker.findByIdAndUpdate(
    req.params.id,
    {
      $set: { project: req.body },
    },
    (err, jobseeker) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
      });
    }
  );
};

const removeWork = (req, res) => {
  Jobseeker.findByIdAndUpdate(
    req.params.id,
    {
      $set: { work: req.body },
    },
    (err, jobseeker) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
      });
    }
  );
};

const removeEducation = (req, res) => {
  Jobseeker.findByIdAndUpdate(
    req.params.id,
    {
      $set: { education: req.body },
    },
    (err, jobseeker) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
      });
    }
  );
};

const removeCourse = (req, res) => {
  Jobseeker.findByIdAndUpdate(
    req.params.id,
    {
      $set: { course: req.body },
    },
    (err, jobseeker) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
      });
    }
  );
};

const removeCertificate = (req, res) => {
  Jobseeker.findByIdAndUpdate(
    req.params.id,
    {
      $set: { certificate: req.body },
    },
    (err, jobseeker) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
      });
    }
  );
};

const removeAward = (req, res) => {
  Jobseeker.findByIdAndUpdate(
    req.params.id,
    {
      $set: { award: req.body },
    },
    (err, jobseeker) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
      });
    }
  );
};

const removeVolunteer = (req, res) => {
  Jobseeker.findByIdAndUpdate(
    req.params.id,
    {
      $set: { volunteer: req.body },
    },
    (err, jobseeker) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
      });
    }
  );
};

const removeSkill = (req, res) => {
  Jobseeker.findByIdAndUpdate(
    req.params.id,
    {
      $set: { skills: req.body },
    },
    (err, jobseeker) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
      });
    }
  );
};

const getNotifications = (req, res) => {
  Jobseeker.findById(req.params.id, 'notifications').exec((err, notifications) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingData: notifications.notifications,
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
  addEducation,
  addCourse,
  addCertificate,
  addAward,
  addVolunteering,
  addProject,
  addWork,
  addReach,
  updateEducation,
  updateCourse,
  updateCertificate,
  updateSkills,
  updateProfilePic,
  updateTechnologyItem,
  updateTechnologyStack,
  updateInterests,
  updateVolunteer,
  updateAward,
  updateWork,
  updateProject,
  updateResumeStatus,
  updateResumeDetails,
  updateSavedJobs,
  updateFavoriteOrgs,
  resetAll,
  remove,
  removeEducation,
  removeCourse,
  removeCertificate,
  removeProject,
  removeWork,
  removeAward,
  removeVolunteer,
  removeSkill,
  getFiltered,
  getCount,
  block,
  getNotifications,
  getForTable
};
