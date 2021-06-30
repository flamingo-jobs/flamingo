const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { createJWT } = require("../utils/auth");
const User = require("../models/users");

// Regex for validation of email address
const emailRegexp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// User signup
exports.signup = (req, res, next) => {
  let { name, email, password, password_confirmation, role } = req.body;
  let errors = [];

  // Validate inputs
  if (!name) {
    errors.push({ name: "required" });
  }
  if (!email) {
    errors.push({ email: "required" });
  }
  if (!emailRegexp.test(email)) {
    errors.push({ email: "invalid" });
  }
  if (!password) {
    errors.push({ password: "required" });
  }
  if (!password_confirmation) {
    errors.push({
      password_confirmation: "required",
    });
  }
  if (password != password_confirmation) {
    errors.push({ password: "mismatch" });
  }
  if (!role) {
    errors.push({ role: "required" });
  }

  // Return error array as response if validation fails
  if (errors.length > 0) {
    return res.status(422).json({ errors: errors });
  }

  // Check whether email already exists in database
  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        return res
          .status(422)
          .json({ errors: [{ user: "email already exists" }] });
      }

      // Create new user
      else {
        const user = new User({
          username: name,
          email: email,
          password: password,
          role: role,
        });

        // Hash password
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(password, salt, function (err, hash) {
            if (err) throw err;
            user.password = hash;

            // Save user
            user
              .save()
              .then((response) => {
                res.status(200).json({
                  success: true,
                  result: response,
                });
              })
              .catch((err) => {
                res.status(500).json({
                  errors: [{ error: err }],
                });
              });
          });
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        errors: [{ error: "Something went wrong" }],
      });
    });
};

// User Login
exports.signin = (req, res) => {
  let { email, password } = req.body;
  let errors = [];

  // Validate inputs
  if (!email) {
    errors.push({ email: "required" });
  }
  if (!emailRegexp.test(email)) {
    errors.push({ email: "invalid email" });
  }
  if (!password) {
    errors.push({ passowrd: "required" });
  }

  // Return error array as response if validation fails
  if (errors.length > 0) {
    return res.status(422).json({ errors: errors });
  }

  // Check if user exists
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          errors: [{ user: "not found" }],
        });
      } else {
        bcrypt
          .compare(password, user.password)
          .then((isMatch) => {
            if (!isMatch) {
              return res
                .status(400)
                .json({ errors: [{ password: "incorrect" }] });
            }

            // Create an access token
            let access_token = createJWT( user._id, user.username, user.email, user.role, 3600);
            jwt.verify(
              access_token,
              process.env.TOKEN_SECRET,
              (err, decoded) => {
                if (err) {
                  res.status(500).json({ errors: "err1" });
                }
                if (decoded) {
                  return res.status(200).json({
                    success: true,
                    token: access_token,
                  });
                }
              }
            );
          })
          .catch((err) => {
            res.status(500).json({ errors: "err2" });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({ errors: err });
    });
};
