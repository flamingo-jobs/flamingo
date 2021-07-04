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
  tagLine: {
    type: String,
  },
  address: {
    type: Object,
  },
  contact: {
    type: Object,
  },
  university: {
    type: Array,
  },
  college: {
    type: Array,
  },
  highschool: {
    type: Array,
  },
  course: {
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
