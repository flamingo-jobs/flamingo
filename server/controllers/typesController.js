const Types = require('../models/types');


const create = (req,res) => {
    let newType = new Types(req.body);

    newType.save((err) => {
        if(err){
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: "Type saved successfully"
        });

    });

}

const getAll = (req,res) => {
    Types.find().exec((err,types) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        return res.status(200).json({
            success: true,
            existingTypes: types
        });
    });
}

const getById = (req,res) => {
    Types.findById(req.params.id).exec((err,type) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        return res.status(200).json({
            success: true,
            type: type
        });
    });
}

const getFeaturedTypes = (req,res) => {
    Types.find({ isFeatured : true }, (err,featuredTypes) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        return res.status(200).json({
            success: true,
            featuredTypes: featuredTypes
        });
    });
}


const update = (req,res) => {

    Types.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,type) =>{
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
    Types.findByIdAndDelete(req.params.id).exec((err,deletedType) => {
        if(err){
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: "Type deleted successfully",
            deletedType: deletedType,
        });
    });
}

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove,
    getFeaturedTypes

}