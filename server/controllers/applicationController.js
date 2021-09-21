const Jobs = require("../models/jobs");
const Jobseeker = require("../models/jobseeker");

const updateStatusToShortlist = async (req, res) => {
  try {
    let errorList1 = [];
    if (req.body.jobseekerIds.length){
      try {
        req.body.jobseekerIds.forEach(async (id) => {
          await Jobs.updateOne(
            {
              _id: req.body.jobId,
              "applicationDetails.userId": { $in: [id] },
            },
            {
              $set: { [`applicationDetails.$.status`]: "shortlisted" },
            }
          );
        });
      } catch(error) {
        errorList1.push(error);
      }
    }
    // const updatedJobs = await Jobs.updateOne(
    //   {
    //     _id: req.body.jobId,
    //     "applicationDetails.userId": { $in: req.body.jobseekerIds },
    //   },
    //   {
    //     $set: { [`applicationDetails.$.status`]: "shortlisted" },
    //   }
    // );

    let errorList = [];

    if (req.body.jobseekerIds.length) {
      req.body.jobseekerIds.forEach((id) => {
        Jobseeker.updateOne(
          {
            _id: id,
            "applicationDetails.jobId": req.body.jobId,
          },
          {
            $set: { [`applicationDetails.$.status`]: "shortlisted" },
          }
        )
          .then((res) => {})
          .catch((err) => {
            if (err) errorList.push(err);
          });
      });
    }

    if (errorList.length || errorList1.length)
      return res
        .status(500)
        .json({ success: false, error: "Shortlist failed" });

    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

module.exports = {
  updateStatusToShortlist,
};
