const Jobseeker = require("../models/jobseeker");

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
  try{
    const response = await Jobseeker.find({'_id':{$in: jobseekers}});
    res.status(200).json({
      success: true,
      jobseekers: response
    });
  }catch(err){
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
  Jobseeker.updateOne(
    { _id: req.params.id },
    {
      $set: { [`technologyStack.${req.body.index}`]: req.body.techItem },
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

const updateUniversity = (req, res) => {
  Jobseeker.updateOne(
    { _id: req.params.id },
    {
      $set: { [`university.${req.body.index}`]: req.body.university },
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

const updateSchool = (req, res) => {
  Jobseeker.updateOne(
    { _id: req.params.id },
    {
      $set: { [`school.${req.body.index}`]: req.body.school },
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
  try{
    const updatedJobseeker = await Jobseeker.updateOne(
        {_id: req.params.id, "applicationDetails.jobId": req.body.jobId},
        {
          $set:{ [`applicationDetails.$.status`]: req.body.status }
        },
    );
    res.status(200).json({ success: true });
  }catch(err){
      res.status(400).json({ success: false, error: err});
  }
}

const updateResumeDetails =  async (req, res) => {
    try{
        const removedArrayElement = await Jobseeker.findByIdAndUpdate(
            req.params.id,
            {$pull:{applicationDetails:{resumeName: req.body.resumeName}}},
            { safe: true, multi:true }
        );
    }catch(err){
        res.status(400).json({ success: false, error: err});
    }

    try{
        const updatedJobseeker = await Jobseeker.findByIdAndUpdate(
            req.params.id,
            { $push: { applicationDetails: req.body  } },
        );
        res.status(200).json({ success: true});
    } catch(err){
        res.status(400).json({ success: false, error: err});
    }
}

const updateSavedJobs = async (req, res) => {
  try{
    const updatedSavedJobs = await Jobseeker.findByIdAndUpdate(
        req.params.id,
        { $set: { savedJobs: req.body  } },
    );
    res.status(200).json({ success: true});
  } catch(err){
      res.status(400).json({ success: false, error: err});
  }
}

const updateFavoriteOrgs = async (req, res) => {
  try{
    const updatedFavoriteOrgs = await Jobseeker.findByIdAndUpdate(
        req.params.id,
        { $set: { favoriteOrganizations: req.body  } },
    );
    res.status(200).json({ success: true});
  } catch(err){
      res.status(400).json({ success: false, error: err});
  }
}
  
const resetAll = (req, res) => { // To clear the test resume details
  Jobseeker.updateMany(
      {},
      { $set: { applicationDetails: [] }},
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
const addUniversity = (req, res) => {
  Jobseeker.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { university: req.body } },
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

const addSchool = (req, res) => {
  Jobseeker.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { school: req.body } },
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

const removeUniversity = (req, res) => {
  Jobseeker.findByIdAndUpdate(
    req.params.id,
    {
      $set: { university: req.body },
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

const removeSchool = (req, res) => {
  Jobseeker.findByIdAndUpdate(
    req.params.id,
    {
      $set: { school: req.body },
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
  addUniversity,
  addSchool,
  addCourse,
  addAward,
  addVolunteering,
  addProject,
  addWork,
  updateUniversity,
  updateSchool,
  updateCourse,
  updateSkills,
  updateTechnologyItem,
  updateTechnologyStack,
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
  removeUniversity,
  removeSchool,
  removeCourse,
  removeProject,
  removeWork,
  removeAward,
  removeVolunteer,
  removeSkill,
  getFiltered,
  getCount,
  block,
  getNotifications
};
