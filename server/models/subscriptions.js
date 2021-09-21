const mongoose = require("mongoose");

const subscriptionsSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  maxJobs: {
    type: Number,
    required: true,
  },
  maxResumes: {
    type: Number,
    required: true,
  },
  maxUsers: {
    type: Number,
    required: true,
  },
  shortlisting: {
    type: Boolean,
    required: true,
  },
  customizedShortlisting: {
    type: Boolean,
    required: true,
  },
  jobSpecificShortlisting: {
    type: Boolean,
    required: true,
  },
  applicantFiltering: {
    type: Boolean,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Subscriptions", subscriptionsSchema);
