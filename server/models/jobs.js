const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  organization: {
    type: Object,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tasksAndResponsibilities: {
    type: Array,
    required: true,
  },
  qualifications: {
    type: Array,
    required: true,
  },
  technologyStack: {
    type: Array,
  },
  minimumEducation: {
    type: String,
    required: true,
  },
  minimumExperience: {
    type: String,
    required: true,
  },
  salaryRange: {
    min: {
      type: String,
    },
    max: {
      type: String,
    },
  },
  location: {
    type: String,
    required: true,
  },
  additionalSkills: {
    type: Array,
  },
  postedDate: {
    type: Date,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  isPublished: {
    type: Boolean,
    required: true,
  },
  isFeatured: {
    type: Boolean,
    required: true,
  },
  applicationDetails: [
    {
      status: { type: String },
      appliedDate: { type: Date },
      userId: { type: String },
      resumeName: { type: String },
      score: {type: Number},
      matches: {type: Object}
    },
  ],
  recommendedJobs: {
    type: Array,
  },
  numberOfVacancies:{
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model("Jobs", jobSchema);
