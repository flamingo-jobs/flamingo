const uuid = require("uuid").v4;
const sendEmail = require("../utils/sendEmail").sendEmail;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { createJWT } = require("../utils/auth");
const User = require("../models/users");
const JobSeeker = require("../models/jobseeker");
const Employer = require("../models/employers");
const FRONTEND_URL = require("../Config").FRONTEND_URL;
const getGoogleOauthUrl =
  require("../utils/getGoogleOauthUrl").getGoogleOauthUrl;
const getGoogleUser = require("../utils/getGoogleUser").getGoogleUser;
const updateOrCreateUserFromOauth =
  require("../utils/updateOrCreateUserFromOauth").updateOrCreateUserFromOauth;

// Regex for validation of email address
const emailRegexp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// User signup
exports.signup = (req, res, next) => {
  let {
    name,
    email,
    password,
    password_confirmation,
    role,
    accessTokens,
    dateRegistered,
  } = req.body;
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
  if (password !== password_confirmation) {
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
          accessTokens: accessTokens,
          dateRegistered: dateRegistered,
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
                let access_token = createJWT(
                  response._id,
                  user.username,
                  user.email,
                  user.role,
                  user.accessTokens,
                  3600
                );

                /*
                  // Send verification email
                */

                res.status(200).json({
                  success: true,
                  token: access_token,
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

exports.linkAccount = (req, res) => {
  let { id, loginId } = req.body;
  User.findByIdAndUpdate(id, { $set: { loginId } }, (err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
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
            let access_token = createJWT(
              user._id,
              user.username,
              user.email,
              user.role,
              user.accessTokens,
              3600
            );
            jwt.verify(
              access_token,
              process.env.TOKEN_SECRET,
              (err, decoded) => {
                if (err) {
                  res.status(500).json({ errors: "token-error" });
                }
                if (decoded) {
                  return res.status(200).json({
                    success: true,
                    loginId: user.loginId,
                    token: access_token,
                  });
                }
              }
            );
          })
          .catch((err) => {
            res.status(500).json({ errors: err });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({ errors: err });
    });
};

exports.forgotPassword = async (req, res) => {
  const email = req.params;
  const passwordResetCode = uuid();
  const result = await User.updateOne(email, { $set: { passwordResetCode } });
  if (result.nModified > 0) {
    try {
      await sendEmail({
        to: email,
        from: "flamingojobs.help@gmail.com",
        subject: "Password Reset - Flamingo",
        text: `
      Hi, We're sending you this email because you requested
      a password reset. Click on this link to create a new password:
      ${FRONTEND_URL}/reset-password/${passwordResetCode}
      If you didn't request a password reset, you can
      ignore this email. Your password will not be changed.
      `,
      });
    } catch (e) {
      // console.log(e);
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(502);
  }
  res.sendStatus(200);
};

exports.resetPassword = async (req, res) => {
  const { passwordResetCode } = req.params;
  const { newPassword } = req.body;
  const newPasswordHash = await bcrypt.hash(newPassword, 10);
  await User.findOneAndUpdate(
    { passwordResetCode: passwordResetCode },
    {
      $set: { password: newPasswordHash },
      $unset: { passwordResetCode: "" },
    }
  ).then((result) => {
    if (!result) {
      return res.sendStatus(500);
    }
  });
  res.sendStatus(200);
};

exports.inviteEmlpoyee = async (req, res) => {
  const { id, empName, email, loginId, adminName, adminEmail, message } =
    req.body;
  const passwordResetCode = uuid();
  const result = await User.findByIdAndUpdate(
    id,
    {
      $set: { loginId, passwordResetCode },
    },
    (err) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      try {
        sendEmail({
          to: email,
          from: "flamingojobs.help@gmail.com",
          subject: "Invitation - Flamingo",
          text: `
        Hi ${empName}, ${adminName} (${adminEmail}) is inviting you to join Flamingo. Click on this link to activate your account:
        ${FRONTEND_URL}/invitation/${passwordResetCode} Message: ${message}
        `,
        });
        return res.status(200).json({
          success: true,
        });
      } catch (e) {
        return res.status(500).json({
          error: e,
        });
      }
    }
  );
};

exports.getUsersByEmployer = async (req, res) => {
  User.find({ loginId: req.params.id }, (err, employerUsers) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      employerUsers: employerUsers,
    });
  });
};

exports.checkPassword = async (req, res) => {
  const { userId, password } = req.body;
  User.findOne({ _id: userId })
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
              return res.json({ success: false });
            }
            return res.status(200).json({
              success: true,
            });
          })
          .catch((err) => {
            res.status(500).json({ success: false, error: err });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({ success: false });
    });
};

exports.deleteUser = async (req, res) => {
  const { userId, loginId, role, accessTokens } = req.body;
  if (role === "jobseeker" || role === "admin") {
    User.findByIdAndDelete(userId, function (err) {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
    });
    if (role === "jobseeker") {
      JobSeeker.findByIdAndDelete(loginId, function (err) {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
      });
    }
    return res.status(200).json({
      success: "User deleted successfully",
    });
  } else if (role === "employer") {
    if (accessTokens[0] === "all") {
      //If admin-employer deletes whole company
      let errorList = [];
      User.deleteMany(loginId).exec((err, deletedUser) => {
        if (err) {
          errorList.push(err);
        }
      });
      Employer.findByIdAndDelete(loginId).exec((err, deletedEmployer) => {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
      });
      if (errorList.length) {
        return res.status(400).json({ errors: errorList });
      }
      return res.status(200).json({
        success: "User deleted successfully",
      });
    } else {
      //If non-admin employers delete their accounts
      User.findByIdAndDelete(userId).exec((err, deletedUser) => {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        }
        return res.status(200).json({
          success: "User deleted successfully",
        });
      });
    }
  }
};

exports.updateAccessTokens = async (req, res) => {
  const { email, accessTokens } = req.body;
  const result = await User.updateOne(
    { email: email },
    { $set: { accessTokens } }
  );
  if (result.nModified > 0) {
    return res.status(200).json({
      success: true,
    });
  } else {
    return res.status(500).json({
      success: false,
    });
  }
};

exports.changePassword = async (req, res) => {
  const { userId, newPassword } = req.body;
  const newPasswordHash = await bcrypt.hash(newPassword, 10);
  await User.findByIdAndUpdate(userId, {
    $set: { password: newPasswordHash },
  }).then((result) => {
    if (!result) {
      return res.status(500).json({
        success: false,
      });
    }
  });
  res.status(200).json({
    success: true,
  });
};

exports.getGoogleOauthUrlRoute = async (req, res) => {
  const url = getGoogleOauthUrl();
  res.status(200).json({ url });
};

exports.googleOauthCallbackRoute = async (req, res) => {
  const { code } = req.query;
  const oauthUserInfo = await getGoogleUser({ code });
  const updatedUser = await updateOrCreateUserFromOauth({ oauthUserInfo });
  if (updatedUser) {
    let access_token = createJWT(
      updatedUser._id,
      updatedUser.username,
      updatedUser.email,
      updatedUser.role,
      updatedUser.accessTokens,
      3600
    );
    jwt.verify(access_token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.redirect(`${FRONTEND_URL}/signIn?error=tokenfail`);
      }
      if (decoded) {
        res.redirect(
          `${FRONTEND_URL}/signIn?token=${access_token}&loginId=${updatedUser.loginId}`
        );
      }
    });
  } else {
    res.redirect(`${FRONTEND_URL}/signIn?error=nouser`);
  }
};
