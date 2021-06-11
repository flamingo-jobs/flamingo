const mongoose = require('mongoose');

const jobseekerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    intro: {
        type: String,
        required: true
    }
    
});


module.exports = mongoose.model('Jobseeker', jobseekerSchema);