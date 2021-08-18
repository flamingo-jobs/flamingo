const mongoose = require("mongoose");

const employerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
  },
  description: {
    type: String,
  },
  locations: {
    type: Array,
  },
  openings: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
  },
  technologyStack: {
    type: Array,
  },
  dateRegistered: {
    type: Date,
    required: true,
  },
  subscription: {
    type: { type: String },
    startDate: { type: Date }
  },
  scale: {
    type: String,
  },
  isFeatured: {
    type: Boolean,
  },
  links: {
    website: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedIn: {
      type: String,
    },
    twitter: {
      type: String,
    },
    blog: {
      type: String,
    },
  },
  categories: {
    type: Array,
  },
  reviews:[
    {
      review: {type: String},
      rating: {type: Number},
      createdDate: {type: Date},
      jobseekerId: {type: String},
      jobseekerName: {type: String},

    }
  ],
});

module.exports = mongoose.model("Employers", employerSchema);
