const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    mobile: {
        type: String,
    },
    message: {
        type: String,
    },
    date: {
        type: Date,
    },
    isRead: {
        type: Boolean
    }
});

module.exports = mongoose.model("Contact", contactSchema);
