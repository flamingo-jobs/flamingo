const Jobseeker = require('../models/jobseeker');


const create = (req,res) => {
    let newJobseeker = new Jobseeker(req.body);

    newJobseeker.save((err) => {
        if(err){
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: "Jobseeker saved successfully"
        });

    });

}

const getAll = (req,res) => {
    Jobseeker.find().exec((err,jobseeker) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        return res.status(200).json({
            success: true,
            existingJobseeker: jobseeker
        });
    });
}

const getById = (req,res) => {
    Jobseeker.findById(req.params.id).exec((err,jobseeker) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        return res.status(200).json({
            success: true,
            jobseeker: jobseeker
        });
    });
}

const update = (req,res) => {

    Jobseeker.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,jobseeker) =>{
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

const addEducation = (req,res) => {

    Jobseeker.findOneAndUpdate(
        { _id: req.params.id }, 
        { $push: { education: req.body  } },
        (err,jobseeker) =>{
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
    Jobseeker.findByIdAndDelete(req.params.id).exec((err,deletedJobseeker) => {
        if(err){
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: "Jobseeker deleted successfully",
            deletedJobseeker
        });
    });
}

module.exports = {
    create,
    getAll,
    getById,
    update,
    addEducation,
    remove
}