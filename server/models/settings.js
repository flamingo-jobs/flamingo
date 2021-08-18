const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    settings: {
        type: Object,
        required: true
    }

});


module.exports = mongoose.model('Settings', settingsSchema);