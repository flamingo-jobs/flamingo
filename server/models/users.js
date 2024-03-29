const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  passwordResetCode: {
    type: String,
    required: false,
  },
  emailResetCode: {
    type: String,
    required: false,
  },
  loginId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
  googleId: {
    type: String,
  },
  isVerified: {
    type: Boolean,
  },
  accessTokens: {
    type: Array,
  },
  dateRegistered: {
    type: Date,
  },
});

module.exports = mongoose.model("Users", userSchema);
