const mongoose = require('mongoose');

const jobseekerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    intro: {
        type: String,
        required: true
    },
    education: {
        type: Array,
        required: true
    },
    workExperience: {
        type: Array,
        required: true
    },
    projects: {
        type: Array,
        required: true
    }
    
});


module.exports = mongoose.model('Jobseeker', jobseekerSchema);