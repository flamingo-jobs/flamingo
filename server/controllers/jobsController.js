const Jobs = require('../models/jobs');


const create = async (req, res) => {
    const newJob = new Jobs(req.body);
    try {
        const savedPost = await newJob.save();
        res.status(200).json({ success: true, job: savedPost });
    } catch (err) {
        res.status(400).json({ error: err });
    }
}

// const getAll = async (req, res) => {
//     console.log(JSON.stringify(req.body.queryParams));
//     Jobs.find(req.body.queryParams, null, req.body.options).exec((err, jobs) => {
//         if (err) {
//             return res.status(400).json({
//                 error: err
//             })
//         }
//         return res.status(200).json({
//             success: true,
//             existingData: jobs
//         });
//     });
// }

const getAll = async (req, res) => {
    console.log(JSON.stringify(req.body.queryParams));
    if (req.body.relatedJob) {
        Jobs.find(req.body.queryParams, { score: { $meta: "textScore" } }, req.body.options).sort({ "postedDate": -1 }).exec((err, jobs) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            return res.status(200).json({
                success: true,
                existingData: jobs
            });
        });
    } else {
        Jobs.find(req.body.queryParams, null, req.body.options).sort({ "postedDate": -1 }).exec((err, jobs) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            return res.status(200).json({
                success: true,
                existingData: jobs
            });
        });
    }
}

const getAllRecommendedJobs = async (req, res) => {
    console.log(JSON.stringify(req.body.queryParams));

    Jobs.find(req.body.queryParams, null, req.body.options).exec((err, jobs) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        return res.status(200).json({
            success: true,
            existingData: jobs
        });
    });
}


const getSearched = async (req, res) => {
    // try {
    //     const result = await Jobs.find({
    //         title: { $regex: '.*' + req.params.searchString + '.*', $options: "i" },
    //     });
    //     res.status(200).json({ success: true, jobs: result });
    // } catch (err) {
    //     res.status(400).json({ success: false, error: err });
    // }

    try {
        const result = await Jobs.find({ $text: { $search: req.params.searchString } },
            { score: { $meta: "textScore" } }, req.body.options).sort({ score: { $meta: "textScore" } });
        if (result.length == 0) {
            let regexExp = req.params.searchString.replace("%20", "|");
            let params = {
                $or: [
                    { title: { $regex: regexExp, $options: "i" } },
                    { description: { $regex: regexExp, $options: "i" } },
                    { tasksAndResponsibilities: { $regex: regexExp, $options: "i" } },
                    { qualifications: { $regex: regexExp, $options: "i" } },
                    { keywords: { $regex: regexExp, $options: "i" } },
                ]
            }
            let medResult = await Jobs.find(params, null, req.body.options);
            res.status(200).json({ success: true, jobs: medResult });
        } else {
            res.status(200).json({ success: true, jobs: result });
        }
    } catch (err) {
        res.status(400).json({ success: false, error: err });
    }
};

const getById = (req, res) => {
    Jobs.findById(req.params.id).exec((err, job) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        return res.status(200).json({
            success: true,
            job: job
        });
    });
}

const getJobCount = (req, res) => {
    if (req.body.relatedJob) {
        Jobs.countDocuments(req.body.queryParams, { score: { $meta: "textScore" } }).exec((err, jobCount) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            return res.status(200).json({
                success: true,
                jobCount: jobCount
            });
        });
    } else {
        Jobs.countDocuments(req.body.queryParams).exec((err, jobCount) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            return res.status(200).json({
                success: true,
                jobCount: jobCount
            });
        });
    }
}

const getJobsFromEmployer = (req, res) => {
    Jobs.find({ 'organization.id': req.params.id }, null, { limit: 3 }, (err, moreFromJobs) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        return res.status(200).json({
            success: true,
            moreFromJobs: moreFromJobs
        });
    });
}

const getAllJobsFromEmployer = (req, res) => {
    Jobs.find({ 'organization.id': req.params.id }, (err, employerJobs) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        return res.status(200).json({
            success: true,
            employerJobs: employerJobs
        });
    });
}

const getAllJobsFromUser = (req, res) => {
    Jobs.find({ 'organization.id': req.params.loginId, "createdBy" : req.params.userId }, (err, employerJobs) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        return res.status(200).json({
            success: true,
            employerJobs: employerJobs
        });
    });
}

const getFeaturedJobs = (req, res) => {
    Jobs.find({ isFeatured: true }, null, { limit: 3 }, (err, featuredJobs) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        return res.status(200).json({
            success: true,
            featuredJobs: featuredJobs
        });
    });
}

const shortlistForGivenCount = async (req, res) => {
    const jobId = req.params.jobId;
    const count = req.params.count;

    try{
        const job = await Jobs.findById(jobId).select("applicationDetails -_id");
        var applications = job.applicationDetails;

        applications.sort((a, b) => {
            return b.score - a.score;
        });
        const applicantIds = applications.slice(0, count).map(obj => obj.userId);

        res.status(200).json({ success: true, applicantIds: applicantIds });
    } catch(error){
        res.status(400).json({ success: false, error: error });
    }

}


const update = (req, res) => {

    Jobs.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body
        },
        (err, job) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            return res.status(200).json({
                sucess: true
            });
        }
    );
}

const resetAll = (req, res) => { // To clear the test resume details
    Jobs.updateMany(
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

const updateResumeStatus = async (req, res) => {
    try {
        const updatedJobs = await Jobs.updateOne(
            { _id: req.params.id, "applicationDetails.userId": req.body.userId },
            {
                $set: { [`applicationDetails.$.status`]: req.body.status }
            },
        );
        res.status(200).json({ success: true });
    } catch (err) {
        res.status(400).json({ success: false, error: err });
    }
}

const updateResumeDetails = (req, res) => {
    Jobs.findByIdAndUpdate(
        req.params.id,
        {
            $pull: { applicationDetails: { resumeName: req.body.resumeName } }
        },
        { safe: true, multi: true },
        (err, job) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    error: err
                })
            }
        }
    );

    Jobs.findByIdAndUpdate(
        req.params.id,
        {
            $push: { applicationDetails: req.body }
        },
        (err, job) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    error: err
                })
            }
            return res.status(200).json({
                success: true
            });
        }
    );
}

const remove = (req, res) => {
    Jobs.findByIdAndDelete(req.params.id).exec((err, deletedJob) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: "Job deleted successfully",
            deletedJob
        });
    });
}

module.exports = {
    create,
    getAll,
    getSearched,
    getById,
    update,
    updateResumeStatus,
    updateResumeDetails,
    remove,
    getFeaturedJobs,
    getJobCount,
    getJobsFromEmployer,
    getAllJobsFromEmployer,
    getAllJobsFromUser,
    shortlistForGivenCount,
    resetAll,
    getAllRecommendedJobs

}