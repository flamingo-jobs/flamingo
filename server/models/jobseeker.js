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
    work: {
        type: Array,
        required: true
    },
    project: {
        type: Array,
        required: true
    },
    award: {
        type: Array,
        required: true
    },
    volunteer: {
        type: Array,
        required: true
    },
    
});


module.exports = mongoose.model('Jobseeker', jobseekerSchema);