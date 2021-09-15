const Skills = require('../models/skills');


const create = (req,res) => {
    let newSkill = new Skills(req.body);

    newSkill.save((err) => {
        if(err){
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: "Skill saved successfully"
        });

    });

}

const getAll = (req,res) => {
    Skills.find().exec((err,skills) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        return res.status(200).json({
            success: true,
            existingData: skills
        });
    });
}

const getById = (req,res) => {
    Skills.findById(req.params.id).exec((err,skill) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        return res.status(200).json({
            success: true,
            skill: skill
        });
    });
}

const getFeaturedSkills = (req,res) => {
    Skills.find({ isFeatured : true }, (err,featuredSkills) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        return res.status(200).json({
            success: true,
            featuredSkills: featuredSkills
        });
    });
}


const update = (req,res) => {

    Skills.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,skill) =>{
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
    Skills.deleteMany(req.body).exec((err,deletedSkill) => {
        if(err){
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: "Skill deleted successfully",
            deletedSkill: deletedSkill,
        });
    });
}

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove,
    getFeaturedSkills

}