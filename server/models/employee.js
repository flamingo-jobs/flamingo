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
  description: {
    type: String,
    required: true,
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    city: { type: String, required: true },
    zipCode: { type: String, required: true },
  },
  contact: {
    phone: { type: String, required: true },
    mobile: { type: String, required: true },
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
      schoolName: { type: String, required: true },
      degree: { type: String, required: true },
      schoolFrom: { type: String, required: true },
      schoolTo: { type: String, required: true },
    },
  ],
  course: [
    {
      courseName: { type: String, required: true },
      institute: { type: String, required: true },
    },
  ],
  award: [
    {
      awardTitle: { type: String, required: true },
      awardDescription: { type: String, required: true },
    },
  ],
  achievement: [
    {
      achievementTitle: { type: String, required: true },
      achievementDescription: { type: String, required: true },
    },
  ],
  work: [
    {
      workPlace: { type: String, required: true },
      position: { type: String, required: true },
      workFrom: { type: String, required: true },
      workTo: { type: String, required: true },
    },
  ],project: [
    {
      projectName: { type: String, required: true },
      projectLink: { type: String, required: true },
    },
  ],volunteer: [
    {
      volunteerTitle: { type: String, required: true },
      volunteerDescription: { type: String, required: true },
    },
  ],technology: [
    {
      technologyName: { type: String, required: true },
      rate: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model("Employee", employeeSchema);
