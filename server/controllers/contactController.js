const Contact = require('../models/contact');


const create = (req,res) => {
    let newCategory = new Contact(req.body);

    newCategory.save((err) => {
        if(err){
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: "Message saved successfully"
        });

    });

}

const getAll = (req,res) => {
    Contact.find().exec((err,contact) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        return res.status(200).json({
            success: true,
            existingData: contact
        });
    });
}

const getById = (req,res) => {
    Contact.findById(req.params.id).exec((err,category) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        return res.status(200).json({
            success: true,
            category: category
        });
    });
}

const update = (req,res) => {

    Contact.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,category) =>{
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
    Contact.deleteMany(req.body).exec((err,deletedCategory) => {
        if(err){
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: "Category deleted successfully",
            deletedCategory: deletedCategory,
        });
    });
}

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove

}