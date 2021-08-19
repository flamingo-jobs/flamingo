const Jobs = require('../models/jobs');
const Jobseeker = require('../models/jobseeker');
const Settings = require('../models/settings');
const mongoose = require('mongoose');

const shortlistApplicants = (req, res) => {

    var jobData = null;
    var jobSeekers = null;
    const scoredApplicants = [];

    Settings.find({ 'type': { $in: ['shortlistingDefaults', 'shortlistingEducationDefaults', 'shortlistingExperienceDefaults'] } }).exec((err, settings) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }

        if (settings) {

            let shortlistingSettings, educationShortlistings, experienceShortlistings;

            settings.forEach((setting) => {
                if (setting.type === "shortlistingDefaults") {
                    shortlistingSettings = setting.settings;
                } else if (setting.type === "shortlistingEducationDefaults") {
                    educationShortlistings = setting.settings;
                } else if (setting.type === "shortlistingExperienceDefaults") {
                    experienceShortlistings = setting.settings;
                }
            })

            Jobs.findById(req.params.id).exec((err, job) => {
                if (err) {
                    return res.status(400).json({
                        error: err
                    })
                }

                let applicantIds = [];

                job.applicationDetails.forEach((applicant) => {
                    applicantIds.push(mongoose.Types.ObjectId(applicant.userId));
                })

                Jobseeker.find({ "_id": { $in: applicantIds } }).exec((err, jobseeker) => {
                    if (err) {
                        return res.status(400).json({
                            error: err,
                        });
                    }

                    if (jobseeker) {

                        jobseeker.forEach((item, index) => {
                            let [education, experience, techStack, projectTech, skills, certificates] = [0, 0, 0, 0, 0, 0];

                            let total = 0;
                            let noMin = 0;

                            // education
                            let minEduc = false;
                            item.education.forEach((edu) => {
                                if (job.minimumEducation.includes(edu.type)) {
                                    minEduc = true;
                                }

                                if (edu.type === "Diploma") {
                                    education += educationShortlistings.diploma;
                                } else if (edu.type === "Bachelor's") {
                                    education += educationShortlistings.bachelors;
                                } else if (edu.type === "Masters") {
                                    education += educationShortlistings.masters;
                                } else if (edu.type === "PhD") {
                                    education += educationShortlistings.phd;
                                }

                            });

                            if (minEduc) {
                                education += educationShortlistings.minimum;
                            } else {
                                noMin += 1;
                            }

                            // experience
                            let dateDiff = 0;

                            item.work.forEach((work) => {
                                const date1 = new Date(`1/${work.from}`);
                                const date2 = new Date(`1/${work.to}`);
                                const diffTime = Math.abs(date2 - date1);
                                const diffYears = Math.abs(diffTime / (1000 * 60 * 60 * 24 * 365));
                                dateDiff += diffYears;
                            });

                            if (job.minimumExperience === "0" && dateDiff >= 0) {
                                experience += experienceShortlistings.minimum;
                            } else if (job.minimumExperience === "0-1" && dateDiff >= 0) {
                                experience += experienceShortlistings.minimum;
                            } else if (job.minimumExperience === "1-3" && dateDiff >= 1) {
                                experience += experienceShortlistings.minimum;
                            } else if (job.minimumExperience === "3-5" && dateDiff >= 3) {
                                experience += experienceShortlistings.minimum;
                            } else if (job.minimumExperience === "5+" && dateDiff > 5) {
                                experience += experienceShortlistings.minimum;
                            } else {
                                noMin += 1;
                            }

                            if (dateDiff >= 0) {
                                experience += experienceShortlistings["0-1"];
                            }
                            if (dateDiff >= 1) {
                                experience += experienceShortlistings["1-3"];
                            }
                            if (dateDiff >= 3) {
                                experience += experienceShortlistings["3-5"];
                            }
                            if (dateDiff > 5) {
                                experience += experienceShortlistings["5+"];
                            }



                            // tech stack
                            var techArray = [];
                            item.technologyStack.forEach((category) => {
                                if (category.hasOwnProperty("list")) {
                                    techArray.push.apply(techArray, category.list);
                                } else if (category.hasOwnProperty("frontEnd")) {
                                    techArray.push.apply(techArray, techArray.frontEnd);
                                } else if (category.hasOwnProperty("backEnd")) {
                                    techArray.push.apply(techArray, category.backEnd);
                                }
                            });

                            techStack += findPercentage(job.technologyStack, techArray);

                            // project stack

                            var projectArray = [];
                            item.project.forEach((ProjectItem) => {
                                if (ProjectItem.hasOwnProperty("usedTech")) {
                                    projectArray.push.apply(projectArray, ProjectItem.usedTech.split(", "));
                                }
                            });
                            // console.log(projectArray)
                            projectTech += findPercentage(job.technologyStack, projectArray);

                            // skills

                            if (item.skills.length) {
                                skills = similarity(item.skills.join(' '), job.qualifications.join(' '));
                            }

                            total = education * (shortlistingSettings.education / 100) + experience * (shortlistingSettings.experience / 100) +
                                techStack * (shortlistingSettings.techStack / 100) + projectTech * (shortlistingSettings.projectTechStack / 100)
                                + skills * (shortlistingSettings.skills / 100) + certificates * (shortlistingSettings.certifications / 100);
                            // console.log(`name - ${item.name}, education - ${education}, date dif - ${dateDiff},  experience - ${experience},techStack - ${techStack},projectTech - ${projectTech},
                            // certificates - ${certificates},skills - ${skills},`)

                            let applicationIndex = job.applicationDetails.findIndex(applicant => applicant.userId == item._id);

                            let scoredItem = {
                                _id: job.applicationDetails[applicationIndex]._id,
                                status: job.applicationDetails[applicationIndex].status,
                                appliedDate: job.applicationDetails[applicationIndex].appliedDate,
                                userId: job.applicationDetails[applicationIndex].userId,
                                resumeName: job.applicationDetails[applicationIndex].resumeName,
                            }

                            if (shortlistingSettings.ignoreMinimum) {
                                scoredItem.score = total;
                                scoredApplicants.push(scoredItem);
                            } else if (noMin === 0) {
                                scoredItem.score = total;
                                scoredApplicants.push(scoredItem);
                            } else {
                                scoredItem.score = 0;
                                scoredApplicants.push(scoredItem);
                            }

                        })
                    }

                    updateJob(scoredApplicants, req.params.id);

                    return res.status(200).json({
                        success: true,
                        exsitingData: scoredApplicants
                    });
                });

            });
        }
    });




}

const shortlistOnApplicantChanges = (req, res) => {

    var jobData = null;
    var jobSeekers = null;
    var scoredApplicants = [];

    Settings.find({ 'type': { $in: ['shortlistingDefaults', 'shortlistingEducationDefaults', 'shortlistingExperienceDefaults'] } }).exec((err, settings) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }

        if (settings) {

            let shortlistingSettings, educationShortlistings, experienceShortlistings;

            settings.forEach((setting) => {
                if (setting.type === "shortlistingDefaults") {
                    shortlistingSettings = setting.settings;
                } else if (setting.type === "shortlistingEducationDefaults") {
                    educationShortlistings = setting.settings;
                } else if (setting.type === "shortlistingExperienceDefaults") {
                    experienceShortlistings = setting.settings;
                }
            })

            Jobs.findById(req.params.jobId).exec((err, job) => {
                if (err) {
                    return res.status(400).json({
                        error: err
                    })
                }

                let applicantIds = [];

                Jobseeker.findById(req.params.applicantId).exec((err, jobseeker) => {
                    if (err) {
                        return res.status(400).json({
                            error: err,
                        });
                    }

                    if (jobseeker) {

                        let [education, experience, techStack, projectTech, skills, certificates] = [0, 0, 0, 0, 0, 0];

                        let total = 0;
                        let noMin = 0;

                        // education
                        let minEduc = false;
                        jobseeker.education.forEach((edu) => {
                            if (job.minimumEducation.includes(edu.type)) {
                                minEduc = true;
                            }

                            if (edu.type === "Diploma") {
                                education += educationShortlistings.diploma;
                            } else if (edu.type === "Bachelor's") {
                                education += educationShortlistings.bachelors;
                            } else if (edu.type === "Masters") {
                                education += educationShortlistings.masters;
                            } else if (edu.type === "PhD") {
                                education += educationShortlistings.phd;
                            }

                        });

                        if (minEduc) {
                            education += educationShortlistings.minimum;
                        } else {
                            noMin += 1;
                        }

                        // experience
                        let dateDiff = 0;

                        jobseeker.work.forEach((work) => {
                            const date1 = new Date(`1/${work.from}`);
                            const date2 = new Date(`1/${work.to}`);
                            const diffTime = Math.abs(date2 - date1);
                            const diffYears = Math.abs(diffTime / (1000 * 60 * 60 * 24 * 365));
                            dateDiff += diffYears;
                        });

                        if (job.minimumExperience === "0" && dateDiff >= 0) {
                            experience += experienceShortlistings.minimum;
                        } else if (job.minimumExperience === "0-1" && dateDiff >= 0) {
                            experience += experienceShortlistings.minimum;
                        } else if (job.minimumExperience === "1-3" && dateDiff >= 1) {
                            experience += experienceShortlistings.minimum;
                        } else if (job.minimumExperience === "3-5" && dateDiff >= 3) {
                            experience += experienceShortlistings.minimum;
                        } else if (job.minimumExperience === "5+" && dateDiff > 5) {
                            experience += experienceShortlistings.minimum;
                        } else {
                            noMin += 1;
                        }

                        if (dateDiff >= 0) {
                            experience += experienceShortlistings["0-1"];
                        }
                        if (dateDiff >= 1) {
                            experience += experienceShortlistings["1-3"];
                        }
                        if (dateDiff >= 3) {
                            experience += experienceShortlistings["3-5"];
                        }
                        if (dateDiff > 5) {
                            experience += experienceShortlistings["5+"];
                        }



                        // tech stack
                        var techArray = [];
                        jobseeker.technologyStack.forEach((category) => {
                            if (category.hasOwnProperty("list")) {
                                techArray.push.apply(techArray, category.list);
                            } else if (category.hasOwnProperty("frontEnd")) {
                                techArray.push.apply(techArray, techArray.frontEnd);
                            } else if (category.hasOwnProperty("backEnd")) {
                                techArray.push.apply(techArray, category.backEnd);
                            }
                        });

                        techStack += findPercentage(job.technologyStack, techArray);

                        // project stack

                        var projectArray = [];
                        jobseeker.project.forEach((ProjectItem) => {
                            if (ProjectItem.hasOwnProperty("usedTech")) {
                                projectArray.push.apply(projectArray, ProjectItem.usedTech.split(", "));
                            }
                        });
                        // console.log(projectArray)
                        projectTech += findPercentage(job.technologyStack, projectArray);

                        // skills

                        if (jobseeker.skills.length) {
                            skills = similarity(jobseeker.skills.join(' '), job.qualifications.join(' '));
                        }

                        total = education * (shortlistingSettings.education / 100) + experience * (shortlistingSettings.experience / 100) +
                            techStack * (shortlistingSettings.techStack / 100) + projectTech * (shortlistingSettings.projectTechStack / 100)
                            + skills * (shortlistingSettings.skills / 100) + certificates * (shortlistingSettings.certifications / 100);
                        // console.log(`name - ${jobseeker.name}, education - ${education}, date dif - ${dateDiff},  experience - ${experience},techStack - ${techStack},projectTech - ${projectTech},
                        // certificates - ${certificates},skills - ${skills},`)

                        let applicationIndex = job.applicationDetails.findIndex(applicant => applicant.userId == jobseeker._id);

                        let scoredItem = {
                            _id: job.applicationDetails[applicationIndex]._id,
                            status: job.applicationDetails[applicationIndex].status,
                            appliedDate: job.applicationDetails[applicationIndex].appliedDate,
                            userId: job.applicationDetails[applicationIndex].userId,
                            resumeName: job.applicationDetails[applicationIndex].resumeName,
                        }

                        scoredApplicants = [...job.applicationDetails];

                        if (shortlistingSettings.ignoreMinimum) {
                            scoredItem.score = total;
                            scoredApplicants.splice(applicationIndex, 1, scoredItem);
                        } else if (noMin === 0) {
                            scoredItem.score = total;
                            scoredApplicants.splice(applicationIndex, 1, scoredItem);
                        } else {
                            scoredItem.score = 20;
                            scoredApplicants.splice(applicationIndex, 1, scoredItem);
                        }


                    }

                     updateJob(scoredApplicants, req.params.id);

                    return res.status(200).json({
                        success: true,
                        exsitingData: scoredApplicants
                    });
                });

            });
        }
    });
}


const similarity = (a, b) => {
    var equivalency = 0;
    var minLength = (a.length > b.length) ? b.length : a.length;
    var maxLength = (a.length < b.length) ? b.length : a.length;
    for (var i = 0; i < minLength; i++) {
        if (a[i] === b[i]) {
            equivalency++;
        }
    }

    var weight = equivalency / maxLength;
    return (weight * 100);
};

const findPercentage = (first, second) => {
    const count = first.reduce((acc, val) => {
        if (second.includes(val)) {
            return ++acc;
        };
        return acc;
    }, 0);
    return (count / first.length) * 100;
};

const updateJobSeekerProfile = (jobSeekerId, recommendedJobs, jobId, total) => {

    const newValue = { id: mongoose.Types.ObjectId(jobId), score: total };

    if (total >= 15) {
        Jobseeker.updateOne({ "_id": jobSeekerId },
            [{
                $set: {
                    recommendedJobs: {
                        $cond: {
                            if: { $in: [newValue.id, "$recommendedJobs.id"] },
                            then: "$recommendedJobs",
                            else: { $concatArrays: ["$recommendedJobs", [newValue]] }
                        }
                    }
                }
            }], (err, jobseeker) => {
                if (err) {
                    return false;
                }
                return true;
            });
    }
}

const updateJob = (scoredApplicants, jobId) => {

    Jobs.updateOne({ "_id": jobId },
        [{
            $set: {
                applicationDetails: scoredApplicants
            }
        }], (err, job) => {
            if (err) {
                return false;
            }
            return true;
        });
}

const updateJobData = (jobSeekerId, recommendedJobs, jobId, total) => {

    const newValue = { id: mongoose.Types.ObjectId(jobSeekerId), score: total };

    if (total >= 15) {
        Jobs.updateOne({ "_id": jobId },
            [{
                $set: {
                    recommendedJobSeekers: {
                        $cond: {
                            if: { $in: [newValue.id, "$recommendedJobSeekers.id"] },
                            then: "$recommendedJobSeekers",
                            else: { $concatArrays: ["$recommendedJobSeekers", [newValue]] }
                        }
                    }
                }
            }], (err, job) => {
                if (err) {
                    return false;
                }
                return true;
            });
    }
}

const updateJobSeekerRecommendations = (recommendedJobs, jobSeekerId) => {

    Jobseeker.updateOne({ "_id": jobSeekerId },
        [{
            $set: {
                recommendedJobs: recommendedJobs
            }
        }], (err, jobseeker) => {
            if (err) {
                return false;
            }
            return true;
        });
}

module.exports = {
    shortlistApplicants,
    shortlistOnApplicantChanges
}