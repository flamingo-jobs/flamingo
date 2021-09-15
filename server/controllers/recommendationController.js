const Jobs = require('../models/jobs');
const Jobseeker = require('../models/jobseeker');
const Settings = require('../models/settings');
const mongoose = require('mongoose');

const generateRecommendations = (req, res) => {

    var jobData = null;
    var jobSeekers = null;
    const recommendedJobSeekers = [];

    Settings.find({ 'type': 'recommendationDefaults' }).exec((err, settings) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }

        if (settings) {

            let recommendationSettings = settings[0].settings;

            Jobs.findById(req.params.id).exec((err, job) => {
                if (err) {
                    return res.status(400).json({
                        error: err
                    })
                }

                Jobseeker.find().exec((err, jobseeker) => {
                    if (err) {
                        return res.status(400).json({
                            error: err,
                        });
                    }
                    if (jobseeker) {
                        jobseeker.forEach((item, index) => {
                            let [education, experience, techStack, projectTech, skills, certificates] = [false, false, 0, 0, 0, 0];

                            let total = 0;

                            // education

                            item.education.forEach((edu) => {
                                if (job.minimumEducation.includes(edu.type)) {
                                    education = true;
                                }
                            });

                            // experience
                            let dateDiff = 0;

                            item.work.forEach((work) => {
                                const date1 = new Date(`1/${work.from}`);
                                const date2 = new Date(`1/${work.to}`);
                                const diffTime = Math.abs(date2 - date1);
                                const diffYears = Math.abs(diffTime / (1000 * 60 * 60 * 24 * 365));
                                dateDiff += diffYears;
                            });

                            if (job.minimumExperience === "0" && dateDiff === 0) {
                                experience = true;
                            } else if (job.minimumExperience === "0-1" && dateDiff >= 0 && dateDiff <= 1) {
                                experience = true;
                            } else if (job.minimumExperience === "1-3" && dateDiff >= 1 && dateDiff <= 3) {
                                experience = true;
                            } else if (job.minimumExperience === "3-5" && dateDiff >= 3 && dateDiff <= 5) {
                                experience = true;
                            } else if (job.minimumExperience === "5+" && dateDiff > 5) {
                                experience = true;
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
                            item.project.forEach((project) => {
                                if (project.hasOwnProperty("usedTech")) {
                                    projectArray.push.apply(projectArray, project.usedTech);
                                }
                            });

                            projectTech += findPercentage(job.technologyStack, projectArray);

                            // skills

                            if (item.skills.length) {
                                skills = similarity(item.skills.join(' '), job.qualifications);
                            }

                            // certificates


                            let certificationNameList = [];

                            if (item.certificate.length) {
                                item.certificate.forEach((cert) => {
                                    certificationNameList.push(cert.title);
                                })
                            }

                            if (certificationNameList.length) {
                                certificates = similarity(certificationNameList.join(' '), job.technologyStack.concat([job.title, job.description]));
                            }

                            // courses

                            let courseNameList = [];
                            let courseRelevence = 0;

                            if (item.course.length) {
                                item.course.forEach((courseItem) => {
                                    if (courseItem.course !== "") {
                                        courseNameList.push(courseItem.course);
                                    }
                                })
                            }
                            // console.log(courseNameList)

                            if (courseNameList.length) {
                                courseRelevence = similarity(courseNameList.join(' '), job.technologyStack.concat([job.title, job.description]));
                            }

                            courses = courseRelevence;

                            // console.log("education: " + education);
                            // console.log("experience: " + experience);
                            // console.log("techStack: " + techStack);
                            // console.log("projectTech: " + projectTech);
                            // console.log("skills: " + skills);
                            // console.log("certificates: " + certificates);
                            // console.log("courses: " + courses);


                            total = techStack * (recommendationSettings.techStack / 100) + projectTech * (recommendationSettings.projectTechStack / 100)
                                + skills * (recommendationSettings.skills / 100) + certificates * (recommendationSettings.certifications / 100)
                                + courses * (recommendationSettings.courses / 100);


                            if (recommendationSettings.ignoreMinimum) {
                                if (total >= 5) {
                                    recommendedJobSeekers.push({ jobSeekerId: item._id, score: total });
                                }
                            } else {
                                if (total >= 5 && education && experience) {
                                    recommendedJobSeekers.push({ jobSeekerId: item._id, score: total });
                                }
                            }

                            updateJobSeekerProfile(item._id, item.recommendedJobs, req.params.id, total);
                        })
                    }

                    //   updateJob(recommendedJobSeekers, req.params.id);

                    return res.status(200).json({
                        success: true,
                        exsitingData: recommendedJobSeekers
                    });
                });

            });
        }
    });




}

const generateJobSeekerRecommendations = (req, res) => {

    var jobs = null;
    var jobSeekerData = null;
    const recommendedJobs = [];

    Settings.find({ 'type': 'recommendationDefaults' }).exec((err, settings) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }

        if (settings) {

            let recommendationSettings = settings[0].settings;

            Jobseeker.findById(req.params.id).exec((err, jobseeker) => {
                if (err) {
                    return res.status(400).json({
                        error: err
                    })
                }

                Jobs.find().exec((err, jobs) => {
                    if (err) {
                        return res.status(400).json({
                            error: err,
                        });
                    }
                    if (jobs) {
                        jobs.forEach((job, index) => {
                            let [education, experience, techStack, projectTech, skills, certificates, courses] = [false, false, 0, 0, 0, 0, 0];
                            let total = 0;

                            // education
                            jobseeker.education.forEach((edu) => {
                                if (job.minimumEducation && job.minimumEducation.includes(edu.type)) {
                                    education = true;
                                }
                            });

                            // experience
                            let dateDiff = 0;

                            jobseeker.work.forEach((work) => {
                                const date1 = new Date(`1/${work.from}`);
                                const date2 = new Date(`1/${work.to}`);
                                const diffTime = Math.abs(date2 - date1);
                                const diffYears = Math.abs(diffTime / (1000 * 60 * 60 * 24 * 365));
                                dateDiff += diffYears;
                            });

                            if (job.minimumExperience === "0" && dateDiff === 0) {
                                experience += 70;
                                if (dateDiff > 0) {
                                    experience += 30;
                                }
                            } else if (job.minimumExperience === "0-1" && dateDiff >= 0 && dateDiff <= 1) {
                                experience = true;
                            } else if (job.minimumExperience === "1-3" && dateDiff >= 1 && dateDiff <= 3) {
                                experience = true;
                            } else if (job.minimumExperience === "3-5" && dateDiff >= 3 && dateDiff <= 5) {
                                experience = true;
                            } else if (job.minimumExperience === "5+" && dateDiff > 5) {
                                experience = true;
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
                            jobseeker.project.forEach((project) => {
                                if (project.hasOwnProperty("techStack")) {
                                    projectArray.push.apply(projectArray, project.usedTech);
                                }
                            });

                            projectTech += findPercentage(job.technologyStack, projectArray);

                            // skills

                            if (jobseeker.skills.length) {
                                skills = similarity(jobseeker.skills.join(' '), job.qualifications);
                            }

                            // certificates


                            let certificationNameList = [];

                            if (jobseeker.certificate.length) {
                                jobseeker.certificate.forEach((cert) => {
                                    certificationNameList.push(cert.title);
                                })
                            }

                            if (certificationNameList.length) {
                                certificates = similarity(certificationNameList.join(' '), job.technologyStack.concat([job.title, job.description]));
                            }

                            // courses

                            let courseNameList = [];
                            let courseRelevence = 0;

                            if (jobseeker.course.length) {
                                jobseeker.course.forEach((courseItem) => {
                                    if (courseItem.course !== "") {
                                        courseNameList.push(courseItem.course);
                                    }
                                })
                            }
                            // console.log(courseNameList)
                            if (courseNameList.length) {
                                courseRelevence = similarity(courseNameList.join(' '), job.technologyStack.concat([job.title, job.description]));
                            }

                            courses = courseRelevence;


                            total = techStack * (recommendationSettings.techStack / 100) + projectTech * (recommendationSettings.projectTechStack / 100)
                                + skills * (recommendationSettings.skills / 100) + certificates * (recommendationSettings.certifications / 100)
                                + courses * (recommendationSettings.courses / 100);

                            if (recommendationSettings.ignoreMinimum) {
                                if (total >= 5) {
                                    recommendedJobs.push({ id: job._id, score: total });
                                }
                            } else {
                                if (total >= 5 && education && experience) {
                                    recommendedJobs.push({ id: job._id, score: total });
                                }
                            }

                        })
                    }

                    updateJobSeekerRecommendations(recommendedJobs, req.params.id);

                    return res.status(200).json({
                        success: true,
                        exsitingData: recommendedJobs
                    });
                });

            });
        }

    })
}

const similarity = (a, b) => {
    // var equivalency = 0;
    // var minLength = (a.length > b.length) ? b.length : a.length;
    // var maxLength = (a.length < b.length) ? b.length : a.length;
    // for (var i = 0; i < minLength; i++) {
    //     if (a[i] === b[i]) {
    //         equivalency++;
    //     }
    // }

    // var weight = equivalency / maxLength;
    // return (weight * 100);


    var count = a.split(' ').length;
    var pattern = a.split(' ').join('|');
    var r = new RegExp(pattern, 'g');
    var output = [];

    b.forEach(function (sentance) {
        var matches = sentance.match(r);
        // console.log(matches)
        output.push((matches) ? (matches.length / count) * 100 : 0);
    });

    return output.reduce((x, y) => x + y) / output.length;
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

const updateJob = (recommendedJobSeekers, jobId) => {

    Jobs.updateOne({ "_id": jobId },
        [{
            $set: {
                recommendedJobSeekers: recommendedJobSeekers
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
    generateRecommendations,
    generateJobSeekerRecommendations
}