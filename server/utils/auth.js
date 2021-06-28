const jwt = require("jsonwebtoken");
exports.createJWT = (email, userId, userRole, duration) => {
  const payload = {
    email,
    userId,
    userRole,
    duration,
  };
  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: duration,
  });
};
