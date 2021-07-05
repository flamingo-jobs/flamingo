const Jobseeker = require('../models/jobseeker');


const create = (req,res) => {
    let newJobseeker = new Jobseeker(req.body);

    newJobseeker.save((err) => {
        if(err){
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: "Jobseeker saved successfully"
        });

    });

}

const getAll = (req,res) => {
    Jobseeker.find().exec((err,jobseeker) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        return res.status(200).json({
            success: true,
            existingData: jobseeker
        });
    });
}

const getFiltered = (req, res) => {
    Jobseeker.find(req.body.queryParams, null, req.body.options).exec((err, jobSeekers) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        return res.status(200).json({
            success: true,
            existingData: jobSeekers
        });
    });
}

const getCount = (req, res) => {
    Jobseeker.countDocuments(req.body).exec((err, jobseekerCount) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        return res.status(200).json({
            success: true,
            jobseekerCount: jobseekerCount
        });
    });
}

const getById = (req,res) => {
    Jobseeker.findById(req.params.id).exec((err,jobseeker) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        return res.status(200).json({
            success: true,
            jobseeker: jobseeker
        });
    });
}

// ------update ----------------------------------------
const update = (req,res) => {

    Jobseeker.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,jobseeker) =>{
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

const updateVolunteer = (req,res) => {
    Jobseeker.updateOne(
        { _id: req.params.id },
        {
            $set:{ [`volunteer.${req.body.index}`]: req.body.volunteer }
        },
        (err,jobseeker) =>{
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

const updateAward = (req,res) => {
    Jobseeker.updateOne(
        { _id: req.params.id },
        {
            $set:{ [`award.${req.body.index}`]: req.body.award }
        },
        (err,jobseeker) =>{
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

const updateUniversity = (req,res) => {
    Jobseeker.updateOne(
        { _id: req.params.id },
        {
            $set:{ [`university.${req.body.index}`]: req.body.university }
        },
        (err,jobseeker) =>{
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

const updateSchool = (req,res) => {
    Jobseeker.updateOne(
        { _id: req.params.id },
        {
            $set:{ [`school.${req.body.index}`]: req.body.school }
        },
        (err,jobseeker) =>{
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

const updateCourse = (req,res) => {
    Jobseeker.updateOne(
        { _id: req.params.id },
        {
            $set:{ [`course.${req.body.index}`]: req.body.course }
        },
        (err,jobseeker) =>{
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

const updateWork = (req,res) => {
    Jobseeker.updateOne(
        { _id: req.params.id },
        {
            $set:{ [`work.${req.body.index}`]: req.body.work }
        },
        (err,jobseeker) =>{
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

const updateProject = (req,res) => {
    Jobseeker.updateOne(
        { _id: req.params.id },
        {
            $set:{ [`project.${req.body.index}`]: req.body.project }
        },
        (err,jobseeker) =>{
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
//--------------- add --------------------------------------------
const addUniversity = (req,res) => {

    Jobseeker.findOneAndUpdate(
        { _id: req.params.id }, 
        { $push: { university: req.body  } },
        (err,jobseeker) =>{
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

const addSchool = (req,res) => {

    Jobseeker.findOneAndUpdate(
        { _id: req.params.id }, 
        { $push: { school: req.body  } },
        (err,jobseeker) =>{
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

const addCourse = (req,res) => {

    Jobseeker.findOneAndUpdate(
        { _id: req.params.id }, 
        { $push: { course: req.body  } },
        (err,jobseeker) =>{
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

const addAward = (req,res) => {

    Jobseeker.findOneAndUpdate(
        { _id: req.params.id }, 
        { $push: { award: req.body  } },
        (err,jobseeker) =>{
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

const addVolunteering = (req,res) => {

    Jobseeker.findOneAndUpdate(
        { _id: req.params.id }, 
        { $push: { volunteer: req.body  } },
        (err,jobseeker) =>{
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

const addProject = (req,res) => {

    Jobseeker.findOneAndUpdate(
        { _id: req.params.id }, 
        { $push: { project: req.body  } },
        (err,jobseeker) =>{
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

const addWork = (req,res) => {

    Jobseeker.findOneAndUpdate(
        { _id: req.params.id }, 
        { $push: { work: req.body  } },
        (err,jobseeker) =>{
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

// -------- remove -------------------------------
const remove = (req, res) => {
    Jobseeker.findByIdAndDelete(req.params.id).exec((err,deletedJobseeker) => {
        if(err){
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: "Jobseeker deleted successfully",
            deletedJobseeker
        });
    });
}

const block = (req, res) => {
    Jobseeker.deleteMany(req.body).exec((err,deletedJobSeeker) => {
        if(err){
            return res.status(400).json({
                error: err
            });
        }
        return res.status(200).json({
            success: "Category deleted successfully",
            blockedJobSeeker: deletedJobSeeker,
        });
    });
}

const removeProject = (req,res) => {
    Jobseeker.updateOne(
        { _id: req.params.id },
        {
            $set:{ project : req.body }
        },
        (err,jobseeker) =>{
            if(err){
                return res.status(400).json({
                    error:err
                })
            }
            return res.status(200).json({
                sucess: "Deleted successfully"
            });
        }
    );
}

const removeWork = (req,res) => {
    Jobseeker.updateOne(
        { _id: req.params.id },
        {
            $set:{ work : req.body }
        },
        (err,jobseeker) =>{
            if(err){
                return res.status(400).json({
                    error:err
                })
            }
            return res.status(200).json({
                sucess: "Deleted successfully"
            });
        }
    );
}

const removeUniversity = (req,res) => {
    Jobseeker.updateOne(
        { _id: req.params.id },
        {
            $set:{ university : req.body }
        },
        (err,jobseeker) =>{
            if(err){
                return res.status(400).json({
                    error:err
                })
            }
            return res.status(200).json({
                sucess: "Udeleted successfully"
            });
        }
    );
}

const removeSchool = (req,res) => {
    Jobseeker.updateOne(
        { _id: req.params.id },
        {
            $set:{ school : req.body }
        },
        (err,jobseeker) =>{
            if(err){
                return res.status(400).json({
                    error:err
                })
            }
            return res.status(200).json({
                sucess: "Udeleted successfully"
            });
        }
    );
}

const removeCourse = (req,res) => {
    Jobseeker.updateOne(
        { _id: req.params.id },
        {
            $set:{ course : req.body }
        },
        (err,jobseeker) =>{
            if(err){
                return res.status(400).json({
                    error:err
                })
            }
            return res.status(200).json({
                sucess: "Udeleted successfully"
            });
        }
    );
}

const removeAward = (req,res) => {
    Jobseeker.updateOne(
        { _id: req.params.id },
        {
            $set:{ award : req.body }
        },
        (err,jobseeker) =>{
            if(err){
                return res.status(400).json({
                    error:err
                })
            }
            return res.status(200).json({
                sucess: "Udeleted successfully"
            });
        }
    );
}

const removeVolunteer = (req,res) => {
    Jobseeker.updateOne(
        { _id: req.params.id },
        {
            $set:{ volunteer : req.body }
        },
        (err,jobseeker) =>{
            if(err){
                return res.status(400).json({
                    error:err
                })
            }
            return res.status(200).json({
                sucess: "Deleted successfully"
            });
        }
    );
}

module.exports = {
    create,
    getAll,
    getById,
    update,
    addUniversity,
    addSchool,
    addCourse,
    addAward,
    addVolunteering,
    addProject,
    addWork,
    updateUniversity,
    updateSchool,
    updateCourse,
    updateVolunteer,
    updateAward,
    updateWork,
    updateProject,
    remove,
    removeUniversity,
    removeSchool,
    removeCourse,
    removeProject,
    removeWork,
    removeAward,
    removeVolunteer,
    getFiltered,
    getCount,
    block
}