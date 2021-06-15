const Employers = require('../models/employers');


const create = (req,res) => {
    let newEmployer = new Employers(req.body);

    newEmployer.save((err) => {
        if(err){
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: "Employer saved successfully"
        });

    });

}

const getAll = (req,res) => {
    Employers.find().exec((err,employers) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        return res.status(200).json({
            success: true,
            existingEmployers: employers
        });
    });
}

const getById = (req,res) => {
    Employers.findById(req.params.id).exec((err,employer) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        return res.status(200).json({
            success: true,
            employer: employer
        });
    });
}

const getFeaturedEmployers = (req,res) => {
    Employers.find({ isFeatured : true }, (err,featuredEmployers) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        return res.status(200).json({
            success: true,
            featuredEmployers: featuredEmployers
        });
    });
}


const update = (req,res) => {

    Employers.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,employer) =>{
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
    Employers.findByIdAndDelete(req.params.id).exec((err,deletedEmployer) => {
        if(err){
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: "Employer deleted successfully",
            deletedEmployer: deletedEmployer,
        });
    });
}

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove,
    getFeaturedEmployers

}