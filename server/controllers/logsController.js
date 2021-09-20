const fs = require("fs");
const path = require("path");

const returnFormattedDate = (date) => {
  const formattedDate = `${date.getFullYear()}-${(
    date.getMonth() + 1
  ).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })}-${date.getDate().toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })}`;
  return formattedDate;
};

const returnTime = (date) => {
  const time = `${date.getHours()}:${date.getMinutes().toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })}:${date.getSeconds().toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  })}`;
  return time;
};

// for jobs, Parameters: jobId, employerId, message, updatedFields
const createLogsForJobs = (req, res) => {
  // Not Activated
  if (1) {
    return res.status(200).json({
      success: true,
    });
  }

  const date = new Date();
  const formatedDate = returnFormattedDate(date);
  const time = returnTime(date);

  const fileName = `${formatedDate}.txt`;

  // Header
  const header =
    `Date & Time`.padEnd(25) +
    `Job Id`.padEnd(30) +
    `User Id`.padEnd(30) +
    `Status`.padEnd(20) +
    `Message\n\n`;

  // Log data
  const logDateTime = `${formatedDate} ${time}`.padEnd(25);
  const jobId = `${req.params.jobId}`.padEnd(30);
  const userId = `${req.params.userId}`.padEnd(30);
  const logStatus = req.body.status.toUpperCase().padEnd(20);
  var msg = req.body.msg;
  // console.log("Req.body", req.body)
  if (req.body.hasOwnProperty("updatedFields")) {
    msg = msg + " @Updated-Fields:" + req.body.updatedFields.join();
  }

  // Add header if file does not exists
  if (!fs.existsSync(path.join(__dirname, `../logFiles/jobs/${fileName}`))) {
    fs.writeFileSync(
      path.join(__dirname, `../logFiles/jobs/${fileName}`),
      header,
      "utf8",
      (err) => {}
    );
  }

  const log = `${logDateTime}${jobId}${userId}${logStatus}${msg}\n`;
  fs.appendFile(
    path.join(__dirname, `../logFiles/jobs/${fileName}`),
    log,
    "utf8",
    (err) => {
      if (err) {
        fs.appendFile(
          path.join(__dirname, `../logFiles/${fileName}`),
          "Log module failed"
        );
      }

      return res.status(200).json({
        success: true,
      });
    }
  );
};

const userSignInLogs = (req, res) => {
  // Not Activated
  if (1) {
    return res.status(200).json({
      success: true,
    });
  }
  const date = new Date();
  const formatedDate = returnFormattedDate(date);
  const time = returnTime(date);

  const fileName = `${formatedDate}.txt`;

  // Header
  const header = `Date & Time`.padEnd(25) + `Status`.padEnd(20) + `Message\n\n`;

  // Log data
  const logDateTime = `${formatedDate} ${time}`.padEnd(25);
  const logStatus = `informational`.toUpperCase().padEnd(20);
  var msg = ``;

  if (req.body.hasOwnProperty("email")) {
    msg = `Authentication failure @email: ${req.body.email}`.padEnd(30);
  } else if (
    req.body.hasOwnProperty("userId") &&
    req.body.hasOwnProperty("role")
  ) {
    msg =
      `Session opened for user ${req.body.userId} @role: ${req.body.role}`.padEnd(
        40
      );
  }

  // Add header if file does not exists
  if (!fs.existsSync(path.join(__dirname, `../logFiles/users/${fileName}`))) {
    fs.writeFileSync(
      path.join(__dirname, `../logFiles/users/${fileName}`),
      header,
      "utf8",
      (err) => {}
    );
  }

  const log = `${logDateTime}${logStatus}${msg}\n`;
  fs.appendFile(
    path.join(__dirname, `../logFiles/users/${fileName}`),
    log,
    "utf8",
    (err) => {
      if (err) {
        fs.appendFile(
          path.join(__dirname, `../logFiles/${fileName}`),
          "Log module failed"
        );
      }

      return res.status(200).json({
        success: true,
      });
    }
  );
};

module.exports = {
  createLogsForJobs,
  userSignInLogs,
};
