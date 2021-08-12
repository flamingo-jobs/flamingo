const Certifications = require('../models/certifications');


const create = (req,res) => {
    let newCertification = new Certifications(req.body);

    newCertification.save((err) => {
        if(err){
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: "Certification saved successfully"
        });

    });

}

const getAll = (req,res) => {
    Certifications.find().exec((err,certifications) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        return res.status(200).json({
            success: true,
            existingData: certifications
        });
    });
}

const getById = (req,res) => {
    Certifications.findById(req.params.id).exec((err,certification) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        return res.status(200).json({
            success: true,
            existingData: certification
        });
    });
}

const getFeaturedCertifications = (req,res) => {
    Certifications.find({ isFeatured : true }, (err,featuredCertifications) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        return res.status(200).json({
            success: true,
            featuredCertifications: featuredCertifications
        });
    });
}


const update = (req,res) => {

    Certifications.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,certification) =>{
            if(err){
                return res.status(400).json({
                    error:err
                })
            }
            return res.status(200).json({
                success: "Updated successfully"
            });
        }
    );
}

const remove = (req, res) => {
    Certifications.deleteMany(req.body).exec((err,deletedCertification) => {
        if(err){
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: "Certification deleted successfully",
            deletedCertification: deletedCertification,
        });
    });
}

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove,
    getFeaturedCertifications

}