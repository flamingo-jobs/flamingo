const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    settings: {
        education: {
            type: Number,
            required: true
        },
        experience: {
            type: Number,
            required: true
        },
        techStack: {
            type: Number,
            required: true
        },
        projectTechStack: {
            type: Number,
            required: true
        },
        skills: {
            type: Number,
            required: true
        },
        certifications: {
            type: Number,
            required: true
        }
    }

});


module.exports = mongoose.model('Settings', settingsSchema);