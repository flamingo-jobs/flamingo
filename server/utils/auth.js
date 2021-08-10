const jwt = require("jsonwebtoken");
exports.createJWT = (
  userId,
  username,
  email,
  userRole,
  accessTokens,
  duration
) => {
  const payload = {
    userId,
    username,
    email,
    userRole,
    accessTokens,
    duration,
  };
  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: duration,
  });
};
