const mongoose = require("mongoose");

const jobseekerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tagline: {
    type: String,
  },
  gender: {
    type: String,
  },
  intro: {
    type: String,
  },
  address: {
    type: Object,
  },
  contact: {
    type: Object,
  },
  education: {
    type: Array,
  },
  work: {
    type: Array,
  },
  project: {
    type: Array,
  },
  award: {
    type: Array,
  },
  volunteer: {
    type: Array,
  },
});

module.exports = mongoose.model("Jobseeker", jobseekerSchema);
