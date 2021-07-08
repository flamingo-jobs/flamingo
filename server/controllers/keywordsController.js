const Keywords = require("../models/keywords");

const create = async (req, res) => {
  const newKeyword = new Keywords(req.body);
  try {
    const savedKeyword = await newKeyword.save();
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err
    });
  }
};

const getAll = async (req, res) => {
  try {
    const keywords = await Keywords.find();
    res.status(200).json({
      success: true,
      existingKeywords: keywords,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      err: err,
    });
  }
};

// Update the keyword belongs to the given id
const updateKeyword = async (req, res) => {
  try {
    const updatedPost = await Keywords.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ 
      success: false, 
      error: err 
    });
  }
};

const removeKeyword = async (req, res) => {
  try {
    const removedPost = await Keywords.findByIdAndDelete({
      _id: req.params.id,
    });
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err,
    });
  }
};

module.exports = {
  getAll,
  create,
  updateKeyword,
  removeKeyword,
};
