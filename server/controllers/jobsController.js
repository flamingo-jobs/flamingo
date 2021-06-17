const Jobs = require('../models/jobs');


const create = (req, res) => {
    let newJob = new Jobs(req.body);

    newJob.save((err) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: "Job saved successfully"
        });

    });

}

const getAll = (req, res) => {
    console.log(req.body);
    Jobs.find(req.body.queryParams, null, req.body.options).exec((err, jobs) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        return res.status(200).json({
            success: true,
            existingJobs: jobs
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
    getJobCount

}