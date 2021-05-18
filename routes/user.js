const express = require('express');
const Users = require('../models/users');

const router = express.Router();

// create users

router.post('/user/create', (req,res) => {
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

});

// get users

router.get('/users', (req,res) => {
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
});

// update user

router.put('/users/update/:id', (req,res) => {

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
});

// delete user

router.delete('/users/delete/:id', (req, res) => {
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
});

module.exports = router;