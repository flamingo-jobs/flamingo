const jwt = require("jsonwebtoken");
exports.createJWT = (userId, username, email, userRole, duration) => {
  const payload = {
    userId,
    username,
    email,
    userRole,
    duration,
  };
  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: duration,
  });
};
