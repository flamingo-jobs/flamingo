const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    organization: {
        type: Object,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    tasksAndResponsibilities: {
        type: Array,
        required: true
    },
    qualifications: {
        type: Array,
        required: true
    },
    technologyStack: {
        type: Array,
    },
    minimumEducation:{
        type: String,
        required: true
    },
    minimumExperience:{
        type: String,
        required: true
    },
    salaryRange: {
        min: {
            type: Number,
        },
        max: {
            type: Number
        }
        
    },
    location: {
        type: String,
        required: true
    },
    keywords: {
        type: Array,
    },
    postedDate: {
        type: Date,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    isPublished: {
        type: Boolean,
        required: true
    },
    isFeatured: {
        type:Boolean,
        required: true
    },   
    applicationDetails:{
        type: Array,
    }, 

});

module.exports = mongoose.model('Jobs', jobSchema);