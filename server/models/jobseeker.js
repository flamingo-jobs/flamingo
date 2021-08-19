const mongoose = require("mongoose");

const jobseekerSchema = new mongoose.Schema({
  isPublic: {
    type: Boolean,
    required: true,
  },
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
  certificate: {
    type: Array,
  },
  // school: {
  //   type: Array,
  // },
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
    type: Array,
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
  applicationDetails: [
    {
      status: { type: String },
      appliedDate: { type: Date },
      jobId: { type: String },
      resumeName: { type: String },
    },
  ],
  notifications: {
    type: Array,
  },
  savedJobs: {
    type: Array,
  },
  favoriteOrganizations: {
    type: Array,
  },
  recommendedJobs: {
    type: Array,
  },
  recommendedOrgs: {
    type: Array,
  },
  dateRegistered: {
    type: Date,
    required: true,
  },
  reach: {
    type: Array,
  },
});

module.exports = mongoose.model("Jobseeker", jobseekerSchema);
