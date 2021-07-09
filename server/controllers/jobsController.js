const Jobs = require('../models/jobs');


const create = async (req, res) => {
    const newJob = new Jobs(req.body);
    try{
        const savedPost = await newJob.save();
        res.status(200).json({success: true});
    }catch(err){
        res.status(400).json({error: err});
    }

}

const getAll = (req, res) => {
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
    Jobs.countDocuments(req.body).exec((err, jobCount) => {
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

const getJobsFromEmployer = (req, res) => {
    Jobs.find({ 'organization.id' : req.params.id }, null, { limit: 3 }, (err, moreFromJobs) => {
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
    Jobs.find({ 'organization.id' : req.params.id }, null, (err, moreFromJobs) => {
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
                sucess: "Updated successfully"
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
    getById,
    update,
    remove,
    getFeaturedJobs,
    getJobCount,
    getJobsFromEmployer,
    getAllJobsFromEmployer

}