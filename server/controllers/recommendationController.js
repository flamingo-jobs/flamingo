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
                        if (job.education === degree) {
                            education += 100;
                        }
                    });

                    // experience

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
                        skills = similarity(item.skills.join(' '),job.qualifications.join(' '));
                    }

                    total = education * 0.1 + experience * 0.2 + techStack * 0.2 + projectTech * 0.2 + skills * 0.2 + certificates * 0.1;

                    recommendedJobSeekers.push({ jobSeekerId: item._id, score: total });
                })
            }

            return res.status(200).json({
                success: true,
                exsitingData: recommendedJobSeekers
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

module.exports = {
    generateRecommendations
}