const Jobs = require('../models/jobs');
const Jobseeker = require('../models/jobseeker');

const generateRecommendations = (req, res) => {

    var jobData = null;
    var jobSeekers = null;
    const recommendedJobSeekers = [];

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
                    let [education, experience, techStack, projectTech, skills, certificates] = [0, 0, 0, 0, 0, 0];
                    let total = 0;

                    // education

                    item.university.forEach((degree) => {
                        if (job.minimumEducation.includes(degree.degree)) {
                            education += 100;
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

                    if (item.minimumExperience === "0" && dateDiff === 0) {
                        experience += 70;
                        if (dateDiff > 0) {
                            experience += 30;
                        }
                    } else if (item.minimumExperience === "0-1" && dateDiff >= 0 && dateDiff <= 1) {
                        experience += 70;
                        if (dateDiff > 1) {
                            experience += 30;
                        }
                    } else if (item.minimumExperience === "1-3" && dateDiff >= 1 && dateDiff <= 3) {
                        experience += 70;
                        if (dateDiff > 3) {
                            experience += 30;
                        }
                    } else if (item.minimumExperience === "3+" && dateDiff > 3) {
                        experience += 70;
                        if (dateDiff > 5) {
                            experience += 30;
                        }
                    }

                    // tech stack
                    const techArray = [];
                    item.technologyStack.forEach((category) => {
                        if (category.hasOwnProperty("stack")) {
                            if (category.stack.hasOwnProperty("list")) {
                                techArray.push.apply(techArray, category.stack.list);
                            } else if (category.stack.hasOwnProperty("frontEnd")) {
                                techArray.push.apply(techArray, category.stack.frontEnd);
                            } else if (category.stack.hasOwnProperty("backEnd")) {
                                techArray.push.apply(techArray, category.stack.backEnd);
                            }
                        }
                    });

                    techStack += findPercentage(job.technologyStack, techArray);

                    // project stack

                    const projectArray = [];
                    item.project.forEach((project) => {
                        if (project.hasOwnProperty("techStack")) {
                            projectArray.push.apply(projectArray, project.techStack);
                        }
                    });

                    projectTech += findPercentage(job.technologyStack, projectArray);

                    // skills

                    if (item.hasOwnProperty("skills")) {
                        skills = similarity(item.skills.join(' '), job.qualifications.join(' '));
                    }

                    total = education * 0.1 + experience * 0.2 + techStack * 0.2 + projectTech * 0.2 + skills * 0.2 + certificates * 0.1;

                    if (total >= 10) {
                        recommendedJobSeekers.push({ jobSeekerId: item._id, score: total });
                    }

                    updateJobSeekerProfile(item._id, item.recommendedJobs, req.params.id, total);
                })
            }

            updateJob(recommendedJobSeekers, req.params.id);

            return res.status(200).json({
                success: true,
                exsitingData: recommendedJobSeekers
            });
        });

    });


}

const generateJobSeekerRecommendations = (req, res) => {

    var jobs = null;
    var jobSeekerData = null;
    const recommendedJobs = [];

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
                    let [education, experience, techStack, projectTech, skills, certificates] = [0, 0, 0, 0, 0, 0];
                    let total = 0;

                    // education

                    jobseeker.university.forEach((degree) => {
                        if (job.minimumEducation && job.minimumEducation.includes(degree.degree)) {
                            education += 100;
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
                        experience += 70;
                        if (dateDiff > 1) {
                            experience += 30;
                        }
                    } else if (job.minimumExperience === "1-3" && dateDiff >= 1 && dateDiff <= 3) {
                        experience += 70;
                        if (dateDiff > 3) {
                            experience += 30;
                        }
                    } else if (job.minimumExperience === "3+" && dateDiff > 3) {
                        experience += 70;
                        if (dateDiff > 5) {
                            experience += 30;
                        }
                    }

                    // tech stack
                    const techArray = [];
                    jobseeker.technologyStack.forEach((category) => {
                        if (category.hasOwnProperty("stack")) {
                            if (category.stack.hasOwnProperty("list")) {
                                techArray.push.apply(techArray, category.stack.list);
                            } else if (category.stack.hasOwnProperty("frontEnd")) {
                                techArray.push.apply(techArray, category.stack.frontEnd);
                            } else if (category.stack.hasOwnProperty("backEnd")) {
                                techArray.push.apply(techArray, category.stack.backEnd);
                            }
                        }
                    });

                    techStack += findPercentage(job.technologyStack, techArray);

                    // project stack

                    const projectArray = [];
                    jobseeker.project.forEach((project) => {
                        if (project.hasOwnProperty("techStack")) {
                            projectArray.push.apply(projectArray, project.techStack);
                        }
                    });

                    projectTech += findPercentage(job.technologyStack, projectArray);

                    // skills

                    if (jobseeker.hasOwnProperty("skills")) {
                        skills = similarity(jobseeker.skills.join(' '), job.qualifications.join(' '));
                    }

                    total = education * 0.1 + experience * 0.2 + techStack * 0.2 + projectTech * 0.2 + skills * 0.2 + certificates * 0.1;

                    if (total >= 10) {
                        recommendedJobs.push({ jobId: job._id, score: total });
                    }

                    updateJobData(req.params.id, job.recommendedJobs, job._id, total);
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
    return (weight * 100) + "%";
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

    const newValue = { id: jobId, score: total };

    if (total >= 10) {
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

    const newValue = { id: jobSeekerId, score: total };

    if (total >= 10) {
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