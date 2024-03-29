const Jobs = require('../models/jobs');
const Jobseeker = require('../models/jobseeker');
const Settings = require('../models/settings');
const Certifications = require('../models/certifications');
const mongoose = require('mongoose');

const shortlistApplicants = (req, res) => {

    var jobData = null;
    var jobSeekers = null;
    const scoredApplicants = [];
    var certificationList = [];
    var settingsList = [];

    Certifications.find().exec((err, certifications) => {
        certificationList = certifications
    });

    if (req.params.settingId !== "defaults") {
        settingsList.push(`shortlisting-${req.params.settingId}`);
        settingsList.push(`shortlistingEducation-${req.params.settingId}`);
        settingsList.push(`shortlistingExperience-${req.params.settingId}`);
    } else {
        settingsList.push(`shortlistingDefaults`);
        settingsList.push(`shortlistingEducationDefaults`);
        settingsList.push(`shortlistingExperienceDefaults`);
    }

    // console.log(settingsList)

    Settings.find({ 'type': { $in: settingsList } }).exec((err, settings) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        // console.log(settings)
        if (settings) {

            let shortlistingSettings, educationShortlistings, experienceShortlistings;

            settings.forEach((setting) => {
                if (setting.tag === 'shortlisting') {
                    shortlistingSettings = setting.settings;
                } else if (setting.tag === 'shortlistingEducation') {
                    educationShortlistings = setting.settings;
                } else if (setting.tag === 'shortlistingExperience') {
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
                            let [education, experience, techStack, projectTech, skills, certificates, courses, extraCurricular, awards] = [0, 0, 0, 0, 0, 0, 0, 0, 0];

                            let total = 0;
                            let noMin = 0;

                            // education
                            let minEduc = false;
                            item.education.forEach((edu) => {
                                if (job.minimumEducation.includes(edu.type)) {
                                    minEduc = true;
                                }

                                if (!minEduc) {
                                    if (edu.type === "Diploma") {
                                        if (job.minimumEducation.includes("School")) {
                                            minEduc = true;
                                        }
                                    } else if (edu.type === "Bachelor's") {
                                        if (job.minimumEducation.includes("School") || job.minimumEducation.includes("Diploma")) {
                                            minEduc = true;
                                        }
                                    } else if (edu.type === "Bachelor's Honours") {
                                        if (job.minimumEducation.includes("School") || job.minimumEducation.includes("Diploma") || job.minimumEducation.includes("Bachelor's")) {
                                            minEduc = true;
                                        }
                                    } else if (edu.type === "Masters") {
                                        if (job.minimumEducation.includes("School") || job.minimumEducation.includes("Diploma") || job.minimumEducation.includes("Bachelor's") || job.minimumEducation.includes("Bachelor's Honours")) {
                                            minEduc = true;
                                        }
                                    } else if (edu.type === "PhD") {
                                        if (job.minimumEducation.includes("School") || job.minimumEducation.includes("Diploma") || job.minimumEducation.includes("Bachelor's") || job.minimumEducation.includes("Bachelor's Honours") || job.minimumEducation.includes("Masters")) {
                                            minEduc = true;
                                        }
                                    }
                                }

                                if (edu.type === "Diploma") {
                                    education += educationShortlistings.diploma;
                                } else if (edu.type === "Bachelor's") {
                                    if (educationShortlistings.considerGpa) {
                                        if (edu.GPA) {
                                            education += educationShortlistings.bachelors * (parseFloat(edu.GPA) / 4);
                                        } else {
                                            education += educationShortlistings.bachelors * 0.5;
                                        }
                                    } else {
                                        education += educationShortlistings.bachelors;
                                    }
                                } else if (edu.type === "Bachelor's Honours") {

                                    if (educationShortlistings.considerGpa) {
                                        if (edu.GPA) {
                                            education += educationShortlistings.bachelorsHons * (parseFloat(edu.GPA) / 4);
                                        } else {
                                            education += educationShortlistings.bachelorsHons * 0.5;
                                        }
                                    } else {
                                        education += educationShortlistings.bachelorsHons;
                                    }
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
                                    projectArray.push.apply(projectArray, ProjectItem.usedTech);
                                }
                            });

                            projectTech += findPercentage(job.technologyStack, projectArray);

                            // skills

                            if (item.skills.length && job.additionalSkills.length) {
                                skills += findPercentage(job.additionalSkills, item.skills);
                            }

                            if (skills === 0 && item.skills.length) {
                                skills = similarity(item.skills.join(' '), job.qualifications);
                            }

                            // certificates

                            let certificationNameList = [];
                            let certRelevence = 0;
                            let certScore = 0;
                            if (item.certificate.length) {
                                item.certificate.forEach((cert) => {
                                    certScore += parseInt(cert.score);
                                    certificationNameList.push(cert.title);
                                })
                            }

                            if (certificationNameList.length) {
                                certRelevence = similarity(certificationNameList.join(' '), job.technologyStack.concat([job.title, job.description]));
                            }

                            let certTotal = 0;

                            if (certificationList.length) {
                                certificationList.forEach((issuer) => {
                                    issuer.certificates.forEach((item) => {
                                        certTotal += parseInt(item.score);
                                    })
                                })
                            }

                            certificates = (certScore / certTotal) * 50 + certRelevence * 0.5;

                            // courses

                            let courseNameList = [];
                            let courseRelevence = 0;

                            if (item.course.length) {
                                item.course.forEach((courseItem) => {
                                    courseNameList.push(courseItem.course);
                                })
                            }

                            if (courseNameList.length) {
                                courseRelevence = similarity(courseNameList.join(' '), job.technologyStack.concat([job.title, job.description]));
                            }

                            courses = courseRelevence;

                            //extra curricular

                            if (item.volunteer.length) {
                                extraCurricular = (item.volunteer.length / 20) * 100;
                            }

                            if (extraCurricular > 100) {
                                extraCurricular = 100;
                            }

                            //extra curricular

                            if (item.award.length) {
                                awards = (item.award.length / 20) * 100;
                            }

                            if (awards > 100) {
                                awards = 100;
                            }

                            //total


                            total = education * (shortlistingSettings.education / 100) + experience * (shortlistingSettings.experience / 100) +
                                techStack * (shortlistingSettings.techStack / 100) + projectTech * (shortlistingSettings.projectTechStack / 100)
                                + skills * (shortlistingSettings.skills / 100) + certificates * (shortlistingSettings.certifications / 100)
                                + courses * (shortlistingSettings.courses / 100) + extraCurricular * (shortlistingSettings.extraCurricular / 100)
                                + awards * (shortlistingSettings.awards / 100);

                            // console.log("education: " + education);
                            // console.log("experience: " + experience);
                            // console.log("techStack: " + techStack);
                            // console.log("projectTech: " + projectTech);
                            // console.log("skills: " + skills);
                            // console.log("certificates: " + certificates);
                            // console.log("courses: " + courses);

                            let applicationIndex = job.applicationDetails.findIndex(applicant => applicant.userId == item._id);

                            let scoredItem = {
                                _id: job.applicationDetails[applicationIndex]._id,
                                status: job.applicationDetails[applicationIndex].status,
                                appliedDate: job.applicationDetails[applicationIndex].appliedDate,
                                userId: job.applicationDetails[applicationIndex].userId,
                                resumeName: job.applicationDetails[applicationIndex].resumeName,
                                matches: {
                                    education: education,
                                    experience: experience,
                                    techStack: techStack,
                                    projects: projectTech,
                                    skills: skills,
                                    certificates: certificates,
                                    courses: courses,
                                    extraCurricular: extraCurricular,
                                    awards: awards
                                }
                            }

                            if (shortlistingSettings.ignoreMinimum) {
                                scoredItem.score = total;
                                scoredItem.matches.score = total;
                                scoredApplicants.push(scoredItem);
                            } else if (noMin === 0) {
                                scoredItem.score = total;
                                scoredItem.matches.score = total;
                                scoredApplicants.push(scoredItem);
                            } else {
                                scoredItem.score = 0;
                                scoredItem.matches.score = 0;
                                scoredApplicants.push(scoredItem);
                            }

                        })
                    }

                    updateJob(scoredApplicants, job._id);

                    return res.status(200).json({
                        success: true,
                        existingData: scoredApplicants
                    });
                });

            });
        }
    });
}

const shortlistApplicantsCustoms = (req, res) => {

    var jobData = null;
    var jobSeekers = null;
    const scoredApplicants = [];
    var certificationList = [];
    var settingsList = [];

    Certifications.find().exec((err, certifications) => {
        certificationList = certifications
    });

    let settings = req.body.settings;


    // console.log(settings)
    if (settings) {

        let shortlistingSettings, educationShortlistings, experienceShortlistings;

        settings.forEach((setting) => {
            if (setting.tag === 'shortlisting') {
                shortlistingSettings = setting.settings;
            } else if (setting.tag === 'shortlistingEducation') {
                educationShortlistings = setting.settings;
            } else if (setting.tag === 'shortlistingExperience') {
                experienceShortlistings = setting.settings;
            }
        })


        Jobs.findById(req.body.jobId).exec((err, job) => {
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
                        let [education, experience, techStack, projectTech, skills, certificates, courses, extraCurricular, awards] = [0, 0, 0, 0, 0, 0, 0, 0, 0];


                        let total = 0;
                        let noMin = 0;

                        // education
                        let minEduc = false;
                        item.education.forEach((edu) => {
                            if (job.minimumEducation.includes(edu.type)) {
                                minEduc = true;
                            }

                            if (!minEduc) {
                                if (edu.type === "Diploma") {
                                    if (job.minimumEducation.includes("School")) {
                                        minEduc = true;
                                    }
                                } else if (edu.type === "Bachelor's") {
                                    if (job.minimumEducation.includes("School") || job.minimumEducation.includes("Diploma")) {
                                        minEduc = true;
                                    }
                                } else if (edu.type === "Bachelor's Honours") {
                                    if (job.minimumEducation.includes("School") || job.minimumEducation.includes("Diploma") || job.minimumEducation.includes("Bachelor's")) {
                                        minEduc = true;
                                    }
                                } else if (edu.type === "Masters") {
                                    if (job.minimumEducation.includes("School") || job.minimumEducation.includes("Diploma") || job.minimumEducation.includes("Bachelor's") || job.minimumEducation.includes("Bachelor's Honours")) {
                                        minEduc = true;
                                    }
                                } else if (edu.type === "PhD") {
                                    if (job.minimumEducation.includes("School") || job.minimumEducation.includes("Diploma") || job.minimumEducation.includes("Bachelor's") || job.minimumEducation.includes("Bachelor's Honours") || job.minimumEducation.includes("Masters")) {
                                        minEduc = true;
                                    }
                                }
                            }

                            if (edu.type === "Diploma") {
                                education += educationShortlistings.diploma;
                            } else if (edu.type === "Bachelor's") {
                                if (educationShortlistings.considerGpa) {
                                    if (edu.GPA) {
                                        education += educationShortlistings.bachelors * (parseFloat(edu.GPA) / 4);
                                    } else {
                                        education += educationShortlistings.bachelors * 0.5;
                                    }
                                } else {
                                    education += educationShortlistings.bachelors;
                                }
                            } else if (edu.type === "Bachelor's Honours") {

                                if (educationShortlistings.considerGpa) {
                                    if (edu.GPA) {
                                        education += educationShortlistings.bachelorsHons * (parseFloat(edu.GPA) / 4);
                                    } else {
                                        education += educationShortlistings.bachelorsHons * 0.5;
                                    }
                                } else {
                                    education += educationShortlistings.bachelorsHons;
                                }
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
                                projectArray.push.apply(projectArray, ProjectItem.usedTech);
                            }
                        });

                        projectTech += findPercentage(job.technologyStack, projectArray);

                        // skills

                        if (item.skills.length && job.additionalSkills.length) {
                            skills = findPercentage(job.additionalSkills, item.skills);
                        }

                        if (skills === 0 && item.skills.length) {
                            skills = similarity(item.skills.join(' '), job.qualifications);
                        }
                        // certificates

                        let certificationNameList = [];
                        let certRelevence = 0;
                        let certScore = 0;
                        if (item.certificate.length) {
                            item.certificate.forEach((cert) => {
                                certScore += parseInt(cert.score);
                                certificationNameList.push(cert.title);
                            })
                        }

                        if (certificationNameList.length) {
                            certRelevence = similarity(certificationNameList.join(' '), job.technologyStack.concat([job.title, job.description]));
                        }

                        let certTotal = 0;

                        if (certificationList.length) {
                            certificationList.forEach((issuer) => {
                                issuer.certificates.forEach((item) => {
                                    certTotal += parseInt(item.score);
                                })
                            })
                        }

                        certificates = (certScore / certTotal) * 50 + certRelevence * 0.5;

                        // courses

                        let courseNameList = [];
                        let courseRelevence = 0;

                        if (item.course.length) {
                            item.course.forEach((courseItem) => {
                                courseNameList.push(courseItem.course);
                            })
                        }

                        if (courseNameList.length) {
                            courseRelevence = similarity(courseNameList.join(' '), job.technologyStack.concat([job.title, job.description]));
                        }

                        courses = courseRelevence;

                        //extra curricular

                        if (item.volunteer.length) {
                            extraCurricular = (item.volunteer.length / 20) * 100;
                        }

                        if (extraCurricular > 100) {
                            extraCurricular = 100;
                        }

                        //extra curricular

                        if (item.award.length) {
                            awards = (item.award.length / 20) * 100;
                        }

                        if (awards > 100) {
                            awards = 100;
                        }

                        //total


                        total = education * (shortlistingSettings.education / 100) + experience * (shortlistingSettings.experience / 100) +
                            techStack * (shortlistingSettings.techStack / 100) + projectTech * (shortlistingSettings.projectTechStack / 100)
                            + skills * (shortlistingSettings.skills / 100) + certificates * (shortlistingSettings.certifications / 100)
                            + courses * (shortlistingSettings.courses / 100) + extraCurricular * (shortlistingSettings.extraCurricular / 100)
                            + awards * (shortlistingSettings.awards / 100);

                        // console.log("education: " + education);
                        // console.log("experience: " + experience);
                        // console.log("techStack: " + techStack);
                        // console.log("projectTech: " + projectTech);
                        // console.log("skills: " + skills);
                        // console.log("certificates: " + certificates);
                        // console.log("courses: " + courses);

                        let applicationIndex = job.applicationDetails.findIndex(applicant => applicant.userId == item._id);

                        let scoredItem = {
                            _id: job.applicationDetails[applicationIndex]._id,
                            status: job.applicationDetails[applicationIndex].status,
                            appliedDate: job.applicationDetails[applicationIndex].appliedDate,
                            userId: job.applicationDetails[applicationIndex].userId,
                            resumeName: job.applicationDetails[applicationIndex].resumeName,
                            matches: {
                                education: education,
                                experience: experience,
                                techStack: techStack,
                                projects: projectTech,
                                skills: skills,
                                certificates: certificates,
                                courses: courses,
                                extraCurricular: extraCurricular,
                                awards: awards
                            }
                        }

                        if (shortlistingSettings.ignoreMinimum) {
                            scoredItem.score = total;
                            scoredItem.matches.score = total;
                            scoredApplicants.push(scoredItem);
                        } else if (noMin === 0) {
                            scoredItem.score = total;
                            scoredItem.matches.score = total;
                            scoredApplicants.push(scoredItem);
                        } else {
                            scoredItem.score = 0;
                            scoredItem.matches.score = 0;
                            scoredApplicants.push(scoredItem);
                        }

                    })
                }

                updateJob(scoredApplicants, job._id);


                // let scoredIds = scoredApplicants.map(x => x.userId);
                return res.status(200).json({
                    success: true,
                    existingData: scoredApplicants
                });
            });

        });
    }
}

const shortlistOnApplicantChanges = (req, res) => {

    var jobData = null;
    var jobSeekers = null;
    var scoredApplicants = [];
    var certificationList = [];

    Certifications.find().exec((err, certifications) => {
        certificationList = certifications
    });

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

                        let [education, experience, techStack, projectTech, skills, certificates, courses, extraCurricular, awards] = [0, 0, 0, 0, 0, 0, 0, 0, 0];

                        let total = 0;
                        let noMin = 0;

                        // education
                        let minEduc = false;
                        jobseeker.education.forEach((edu) => {
                            if (job.minimumEducation.includes(edu.type)) {
                                minEduc = true;
                            }

                            if (!minEduc) {
                                if (edu.type === "Diploma") {
                                    if (job.minimumEducation.includes("School")) {
                                        minEduc = true;
                                    }
                                } else if (edu.type === "Bachelor's") {
                                    if (job.minimumEducation.includes("School") || job.minimumEducation.includes("Diploma")) {
                                        minEduc = true;
                                    }
                                } else if (edu.type === "Bachelor's Honours") {
                                    if (job.minimumEducation.includes("School") || job.minimumEducation.includes("Diploma") || job.minimumEducation.includes("Bachelor's")) {
                                        minEduc = true;
                                    }
                                } else if (edu.type === "Masters") {
                                    if (job.minimumEducation.includes("School") || job.minimumEducation.includes("Diploma") || job.minimumEducation.includes("Bachelor's") || job.minimumEducation.includes("Bachelor's Honours")) {
                                        minEduc = true;
                                    }
                                } else if (edu.type === "PhD") {
                                    if (job.minimumEducation.includes("School") || job.minimumEducation.includes("Diploma") || job.minimumEducation.includes("Bachelor's") || job.minimumEducation.includes("Bachelor's Honours") || job.minimumEducation.includes("Masters")) {
                                        minEduc = true;
                                    }
                                }
                            }

                            if (edu.type === "Diploma") {
                                education += educationShortlistings.diploma;
                            } else if (edu.type === "Bachelor's") {
                                if (educationShortlistings.considerGpa) {
                                    if (edu.GPA) {
                                        education += educationShortlistings.bachelors * (parseFloat(edu.GPA) / 4);
                                    } else {
                                        education += educationShortlistings.bachelors * 0.5;
                                    }
                                } else {
                                    education += educationShortlistings.bachelors;
                                }
                            } else if (edu.type === "Bachelor's Honours") {

                                if (educationShortlistings.considerGpa) {
                                    if (edu.GPA) {
                                        education += educationShortlistings.bachelorsHons * (parseFloat(edu.GPA) / 4);
                                    } else {
                                        education += educationShortlistings.bachelorsHons * 0.5;
                                    }
                                } else {
                                    education += educationShortlistings.bachelorsHons;
                                }
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
                                projectArray.push.apply(projectArray, ProjectItem.usedTech);
                            }
                        });
                        // console.log(projectArray)
                        projectTech += findPercentage(job.technologyStack, projectArray);

                        // skills

                        if (jobseeker.skills.length && job.additionalSkills.length) {
                            skills = findPercentage(job.additionalSkills, jobseeker.skills);
                        }

                        if (skills === 0 && jobseeker.skills.length) {
                            skills = similarity(jobseeker.skills.join(' '), job.qualifications);
                        }
                        // certificates

                        let certificationNameList = [];
                        let certRelevence = 0;
                        let certScore = 0;
                        if (jobseeker.certificate.length) {
                            jobseeker.certificate.forEach((cert) => {
                                certScore += parseInt(cert.score);
                                certificationNameList.push(cert.title);
                            })
                        }

                        if (certificationNameList.length) {
                            certRelevence = similarity(certificationNameList.join(' '), job.technologyStack.concat([job.title, job.description]));
                        }

                        let certTotal = 0;

                        if (certificationList.length) {
                            certificationList.forEach((issuer) => {
                                issuer.certificates.forEach((item) => {
                                    certTotal += parseInt(item.score);
                                })
                            })
                        }

                        certificates = (certScore / certTotal) * 50 + certRelevence * 0.5;

                        // courses

                        let courseNameList = [];
                        let courseRelevence = 0;

                        if (jobseeker.course.length) {
                            jobseeker.course.forEach((courseItem) => {
                                courseNameList.push(courseItem.course);
                            })
                        }

                        if (courseNameList.length) {
                            courseRelevence = similarity(courseNameList.join(' '), job.technologyStack.concat([job.title, job.description]));
                        }

                        courses = courseRelevence;

                        //extra curricular

                        if (jobseeker.volunteer.length) {
                            extraCurricular = (jobseeker.volunteer.length / 20) * 100;
                        }

                        if (extraCurricular > 100) {
                            extraCurricular = 100;
                        }

                        //extra curricular

                        if (jobseeker.award.length) {
                            awards = (jobseeker.award.length / 20) * 100;
                        }

                        if (awards > 100) {
                            awards = 100;
                        }

                        //total


                        total = education * (shortlistingSettings.education / 100) + experience * (shortlistingSettings.experience / 100) +
                            techStack * (shortlistingSettings.techStack / 100) + projectTech * (shortlistingSettings.projectTechStack / 100)
                            + skills * (shortlistingSettings.skills / 100) + certificates * (shortlistingSettings.certifications / 100)
                            + courses * (shortlistingSettings.courses / 100) + extraCurricular * (shortlistingSettings.extraCurricular / 100)
                            + awards * (shortlistingSettings.awards / 100);

                        let applicationIndex = job.applicationDetails.findIndex(applicant => applicant.userId == jobseeker._id);

                        let scoredItem = {
                            _id: job.applicationDetails[applicationIndex]._id,
                            status: job.applicationDetails[applicationIndex].status,
                            appliedDate: job.applicationDetails[applicationIndex].appliedDate,
                            userId: job.applicationDetails[applicationIndex].userId,
                            resumeName: job.applicationDetails[applicationIndex].resumeName,
                            matches: {
                                education: education,
                                experience: experience,
                                projects: projectTech,
                                techStack: techStack,
                                skills: skills,
                                certificates: certificates,
                                courses: courses,
                                extraCurricular: extraCurricular,
                                awards: awards
                            }
                        }

                        scoredApplicants = [...job.applicationDetails];

                        if (shortlistingSettings.ignoreMinimum) {
                            scoredItem.score = total;
                            scoredItem.matches.score = total;
                            scoredApplicants.splice(applicationIndex, 1, scoredItem);
                        } else if (noMin === 0) {
                            scoredItem.score = total;
                            scoredItem.matches.score = total;
                            scoredApplicants.splice(applicationIndex, 1, scoredItem);
                        } else {
                            scoredItem.score = 20;
                            scoredItem.matches.score = total;
                            scoredApplicants.splice(applicationIndex, 1, scoredItem);
                        }

                    }

                    updateJob(scoredApplicants, job._id);

                    return res.status(200).json({
                        success: true,
                        existingData: scoredApplicants
                    });
                });

            });
        }
    });
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

const updateJob = (scoredApplicants, jobId) => {

    let applicationDetails = scoredApplicants;
    Jobs.updateOne({ "_id": jobId },
        [{
            $set: {
                applicationDetails: applicationDetails
            }
        }], (err, jobs) => {
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
    shortlistOnApplicantChanges,
    shortlistApplicantsCustoms
}