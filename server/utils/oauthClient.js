const google = require("googleapis").google;
const BACKEND_URL = require("../Config").BACKEND_URL;

exports.oauthClient = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${BACKEND_URL}/api/google-callback`
);
