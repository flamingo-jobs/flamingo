const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    locations: {
        type: Array,
        required: true
    },
    openings: {
        type: Number,
    },
    email: {
        type: String,
        required: true
    },
    technologyStack: {
        type: Object,
        required: true
    },
    dateRegistered: {
        type: Date,
        required: true
    },
    subscription: {
        type: String,
        required: true
    },
    scale: {
        type: String,
        required: true
    },
    isFeatured: {
        type: Boolean,
        required: true
    },
    links: {
        website: {
            type: String
        },
        facebook: {
            type: String
        },
        linkedIn: {
            type: String
        },
        twitter: {
            type: String
        },
        blog: {
            type: String
        }
    }

});


module.exports = mongoose.model('Employers', employerSchema);