const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  gender: { type: String },
  description: {
    type: String,
  },
  address: {
    type: Object,
  },
  contact: {
    type: Object,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  school: [
    {
      schoolName: { type: String },
      degree: { type: String },
      schoolFrom: { type: String },
      schoolTo: { type: String },
    },
  ],
  course: [
    {
      courseName: { type: String },
      institute: { type: String },
    },
  ],
  award: [
    {
      awardTitle: { type: String },
      awardDescription: { type: String },
    },
  ],
  achievement: [
    {
      achievementTitle: { type: String },
      achievementDescription: { type: String },
    },
  ],
  work: [
    {
      workPlace: { type: String },
      position: { type: String },
      workFrom: { type: String },
      workTo: { type: String },
    },
  ],
  project: [
    {
      projectName: { type: String },
      projectLink: { type: String },
    },
  ],
  volunteer: [
    {
      volunteerTitle: { type: String },
      volunteerDescription: { type: String },
    },
  ],
  technology: [
    {
      technologyName: { type: String },
      rate: { type: Number },
    },
  ],
});

module.exports = mongoose.model("Employee", employeeSchema);
