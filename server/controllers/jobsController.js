const Jobs = require('../models/jobs');


const create = (req,res) => {
    let newJob = new Jobs(req.body);

    newJob.save((err) => {
        if(err){
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: "Job saved successfully"
        });

    });

}

const getAll = (req,res) => {
    Jobs.find().exec((err,jobs) => {
        if(err){
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

const getById = (req,res) => {
    Jobs.findById(req.params.id).exec((err,job) => {
        if(err){
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

const getFeaturedJobs = (req,res) => {
    Jobs.geoSearch({ isFeatured : true }, (err,featuredJobs) => {
        if(err){
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


const update = (req,res) => {

    Jobs.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,job) =>{
            if(err){
                return res.status(400).json({
                    error:err
                })
            }
            return res.status(200).json({
                sucess: "Updated successfully"
            });
        }
    );
}

const remove = (req, res) => {
    Jobs.findByIdAndDelete(req.params.id).exec((err,deletedJob) => {
        if(err){
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: "User deleted successfully",
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
    getFeaturedJobs

}