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
  volunteer: {
    type: Array,
  },
});

module.exports = mongoose.model("Jobseeker", jobseekerSchema);
