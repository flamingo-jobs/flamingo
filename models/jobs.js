const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('Users', userSchema);