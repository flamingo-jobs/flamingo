const mongoose = require('mongoose');

const certificationsSchema = new mongoose.Schema({
    issuer: {
        type: String,
        required: true
    },
    certificates: {
        type: Array,
    }

});


module.exports = mongoose.model('Certifications', certificationsSchema);