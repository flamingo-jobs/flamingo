const mongoose = require('mongoose');

const technologySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    stack: {
        type: Object,
    }

});


module.exports = mongoose.model('Technologies', technologySchema);