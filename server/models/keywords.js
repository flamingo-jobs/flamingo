const mongoose = require("mongoose");

const keywordsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Keywords", keywordsSchema);
