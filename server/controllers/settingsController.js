const Settings = require('../models/settings');


const getAll = (req,res) => {
    Settings.find().exec((err,settings) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        return res.status(200).json({
            success: true,
            existingData: settings
        });
    });
}

const getById = (req,res) => {
    Settings.findById(req.params.id).exec((err,settings) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        return res.status(200).json({
            success: true,
            existingData: settings
        });
    });
}

const getByType = (req,res) => {
    Settings.find({'type': req.params.typeString}).exec((err,settings) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        return res.status(200).json({
            success: true,
            existingData: settings
        });
    });
}


const update = (req,res) => {

    Settings.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,settings) =>{
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

module.exports = {
    getByType,
    getAll,
    getById,
    update,
}