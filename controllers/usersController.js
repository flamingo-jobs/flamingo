const Users = require('../models/users');


const create = (req,res) => {
    let newUser = new Users(req.body);

    newUser.save((err) => {
        if(err){
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: "User saved successfully"
        });

    });

}

const getAll = (req,res) => {
    Users.find().exec((err,users) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        return res.status(200).json({
            success: true,
            existingUsers: users
        });
    });
}

const getById = (req,res) => {
    Users.findById(req.params.id).exec((err,user) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        return res.status(200).json({
            success: true,
            user: user
        });
    });
}

const update = (req,res) => {

    Users.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,user) =>{
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
    Users.findByIdAndDelete(req.params.id).exec((err,deletedUser) => {
        if(err){
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: "User deleted successfully",
            deletedUser
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