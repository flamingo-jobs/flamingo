const mongoose = require("mongoose");

const subscriptionsSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  maxJobs: {
    type: Number,
  },
  maxResumes: {
    type: Number,
  },
  maxUsers: {
    type: Number,
  },
});

module.exports = mongoose.model("Subscriptions", subscriptionsSchema);
