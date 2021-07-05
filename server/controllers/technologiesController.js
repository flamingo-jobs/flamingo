const Technologies = require('../models/technologies');


const create = (req,res) => {
    let newTechnology = new Technologies(req.body);

    newTechnology.save((err) => {
        if(err){
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: "Technology saved successfully"
        });

    });

}

const getAll = (req,res) => {
    Technologies.find().exec((err,technologies) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        return res.status(200).json({
            success: true,
            existingData: technologies
        });
    });
}

const getById = (req,res) => {
    Technologies.findById(req.params.id).exec((err,technology) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        return res.status(200).json({
            success: true,
            technology: technology
        });
    });
}

const update = (req,res) => {

    Technologies.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,technology) =>{
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
    Technologies.deleteMany(req.body).exec((err,deletedTechnology) => {
        if(err){
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: "Technology deleted successfully",
            deletedTechnology: deletedTechnology,
        });
    });
}

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove,
}