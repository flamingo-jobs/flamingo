const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const compression = require("compression");
const helmet = require("helmet");
const app = express();

//import routes
const userRoutes = require("./routes/users");
const jobRoutes = require("./routes/jobs");
const categoryRoutes = require("./routes/categories");
const skillsRoutes = require("./routes/skills");
const certificationsRoutes = require("./routes/certifications");
const technologyRoutes = require("./routes/technologies");
const typeRoutes = require("./routes/types");
const employerRoutes = require("./routes/employers");
const jobSeekerRoutes = require("./routes/jobseeker");
const authRoutes = require("./routes/auth");
const resumeRoutes = require("./routes/resumes");
const logoRoutes = require("./routes/logos");
const keywordsRoutes = require("./routes/keywords");
const analyticsRoutes = require("./routes/analytics");
const settingsRoutes = require("./routes/settings");
const paymentRoutes = require("./routes/payment");
const contactRoutes = require("./routes/contact");
const logsRoutes = require("./routes/logs");
const verificationRoutes = require("./routes/verification");
const applicationRoutes = require("./routes/applications");
const subscriptionRoutes = require("./routes/subscriptions");

app.use("/companyImage", express.static("companyImage"));

// app middleware
app.use(bodyParser.json());
app.use(helmet());
app.use(
  helmet.frameguard({
    action: "deny"
  })
);
app.use(cors());
app.use(compression());
// route middleware
app.use(userRoutes);
app.use(jobRoutes);
app.use(categoryRoutes);
app.use(skillsRoutes);
app.use(technologyRoutes);
app.use(typeRoutes);
app.use(employerRoutes);
app.use(jobSeekerRoutes);
app.use(resumeRoutes);
app.use(logoRoutes);
app.use(keywordsRoutes);
app.use(analyticsRoutes);
app.use(settingsRoutes);
app.use(certificationsRoutes);
app.use("/api", authRoutes);
app.use(paymentRoutes);
app.use(contactRoutes);
app.use(logsRoutes);
app.use(verificationRoutes);
app.use(applicationRoutes);
app.use(subscriptionRoutes);

const PORT = 8000;

const DB_URL = process.env.MONGO_TOKEN;

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log("Error in DB connection", err);
  });

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
