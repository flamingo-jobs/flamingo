const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    logo: {
        type: String,
    },
    description: {
        type: String,
    },
    locations: {
        type: Array,
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
    },
    dateRegistered: {
        type: Date,
        required: true
    },
    subscription: {
        type: String,
    },
    scale: {
        type: String,
    },
    isFeatured: {
        type: Boolean,
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