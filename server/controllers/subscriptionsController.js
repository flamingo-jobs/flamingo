const Subscriptions = require('../models/subscriptions');


const create = (req,res) => {
    let newSubscription = new Subscriptions(req.body);

    newSubscription.save((err) => {
        if(err){
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: "Subscription saved successfully"
        });

    });

}

const getAll = (req,res) => {
    Subscriptions.find().exec((err,subscriptions) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        return res.status(200).json({
            success: true,
            existingData: subscriptions
        });
    });
}

const getById = (req,res) => {
    Subscriptions.findById(req.params.id).exec((err,subscription) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        return res.status(200).json({
            success: true,
            subscription: subscription
        });
    });
}

const update = (req,res) => {

    Subscriptions.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,subscription) =>{
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
    Subscriptions.deleteMany(req.body).exec((err,deletedSubscription) => {
        if(err){
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: "Subscription deleted successfully",
            deletedSubscription: deletedSubscription,
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