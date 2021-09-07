const mongoose = require("mongoose");

const verificationSchema = new mongoose.Schema({
  status: {
    type: String,
  },
  fileName: {
    type: String,
  },
  requestedDate: {
    type: Date,
  },
  employerName: {
    type: String,
  },
  employer: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model("Verification", verificationSchema);
