const mongoose = require("mongoose");

const jobseekerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
  },
  intro: {
    type: String,
  },
  tagLine: {
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
  interests: {
    type: Array
  },
  volunteer: {
    type: Array,
  },
  technologyStack: {
    type: Array,
  },
});

module.exports = mongoose.model("Jobseeker", jobseekerSchema);
