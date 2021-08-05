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
  university: {
    type: Array,
  },
  school: {
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
  skills: {
    type: Array,
  },
  applicationDetails:{
    type: Array,
  },
  notifications:{
    type: Array
  },
  savedJobs:{
    type: Array,
  },
  favoriteOrganizations:{
    type: Array,
  },
  recommendedJobs: {
    type: Array,
  },
  recommendedOrgs: {
    type: Array
  }
});

module.exports = mongoose.model("Jobseeker", jobseekerSchema);
