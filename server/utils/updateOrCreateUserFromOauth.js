const User = require("../models/users");

exports.updateOrCreateUserFromOauth = async ({ oauthUserInfo }) => {
  const { id: googleId, verified_email: isVerified, email } = oauthUserInfo;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const result = await User.findOneAndUpdate(
      { email },
      { $set: { googleId, isVerified } },
      { returnOriginal: false }
    );
    return result;
  } else {
    return null;
  }
};
