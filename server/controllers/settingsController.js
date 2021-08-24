const Settings = require("../models/settings");

const create = async (req, res) => {
  const { loginId } = req.body;
  let shortlistingSettings = await Settings.find().or([
    { type: "shortlistingDefaults" },
    { type: "shortlistingExperienceDefaults" },
    { type: "shortlistingEducationDefaults" },
  ]);

  let newSettings = [];
  let errorList = [];
  await shortlistingSettings.map((x) => {
    x.type = x.type.replace("Defaults", "-" + loginId);
    newSettings.push(
      new Settings({
        type: x.type,
        settings: x.settings,
        tag: x.tag,
      })
    );
  });

  if (newSettings.length) {
    newSettings.forEach((element) => {
      element
        .save()
        .then((res) => {})
        .catch((err) => {
          if (err) errorList.push(err);
        });
    });
  }
  if (errorList.length)
    return res
      .status(500)
      .json({ error: "settings-save-failed", errorAt: errorList.length });

  return res.status(200).json({
    success: true,
  });
};

const getAll = (req, res) => {
  Settings.find().exec((err, settings) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingData: settings,
    });
  });
};

const getById = (req, res) => {
  Settings.findById(req.params.id).exec((err, settings) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingData: settings,
    });
  });
};

const getByType = (req, res) => {
  Settings.find({ type: req.params.typeString }).exec((err, settings) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingData: settings,
    });
  });
};

const update = (req, res) => {
  Settings.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, settings) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: "Updated successfully",
      });
    }
  );
};

module.exports = {
  create,
  getByType,
  getAll,
  getById,
  update,
};
