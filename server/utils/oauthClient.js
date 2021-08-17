const google = require("googleapis").google;

exports.oauthClient = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SERVER,
  "http://localhost:8000/api/google/callback"
);
