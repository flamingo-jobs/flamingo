const { check, validationResult } = require("express-validator");

const applyFormValidationResults = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const error = result.errors[0].msg;
    return res.status(200).json({ success: false, error: error });
  }
  next();
};

const applyFormValidations = [
  check("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("First name must be 3 chars long")
    .isAlpha()
    .withMessage("Name must only contain alphabetical characters"),

  check("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email"),
    
  check("phoneNumber")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Phone number is required")
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone number must be 10 characters long")
    .isNumeric()
    .withMessage("Phone number must only contain numbers"),
];

module.exports = {
  applyFormValidations,
  applyFormValidationResults,
};
