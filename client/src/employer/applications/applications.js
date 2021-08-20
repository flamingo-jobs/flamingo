import React, { useState, useEffect } from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import BACKEND_URL from "../../Config";
import FloatCard from "../../components/FloatCard";
import ApplicantCard from "./components/applicantCard";
import SnackBarAlert from "../../components/SnackBarAlert";
import NoAccess from "../../components/NoAccess";
import PeopleIcon from "@material-ui/icons/People";
import ShortlistModal from "./components/shortlistModal";
import NoInfo from '../../components/NoInfo';

const jwt = require("jsonwebtoken");

let resumeAccess = false;
let singleResumeAccess = false;

if (sessionStorage.getItem("userToken")) {
  var accessTokens = jwt.decode(sessionStorage.getItem("userToken"), {
    complete: true,
  }).payload.accessTokens;
  if (accessTokens.includes("all") || accessTokens.includes("allresume")) {
    resumeAccess = true;
  } else if (accessTokens.includes("singleresume")) {
    singleResumeAccess = true;
  }
}

const useStyles = makeStyles((theme) => ({
  border: {
    border: "1px solid red",
  },
  root: {
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
  },
  shortlistBtnContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: theme.spacing(2),
  },
  shortlistBtn: {
    paddingLeft: "13px",
    paddingRight: "13px",
    borderRadius: 12,
    color: theme.palette.white,
    backgroundColor: theme.palette.vividSkyBlue,
    "&:hover": {
      backgroundColor: theme.palette.vividSkyBlueHover,
    },
  },
  applicantTitle: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  applicantTitleText: {
    color: theme.palette.vividSkyBlue,
  },
  shorlistTitle: {
    marginBottom: theme.spacing(2),
  },
  shorlistTitleText: {
    color: theme.palette.vividSkyBlue,
  },
}));

// style={{border: "1px solid red"}}

const Applications = () => {
  const classes = useStyles();
  const userId = sessionStorage.getItem("loginId");
  const isSignedIn = sessionStorage.getItem("userToken") ? true : false;
  const [jobId, setJobId] = useState(window.location.pathname.split("/")[3]);
  const [job, setJob] = useState("empty");
  const [applicantIds, setApplicantIds] = useState([]);
  const [applicants, setApplicants] = useState("empty");

  const [alertShow, setAlertShow] = useState(false);
  const [alertData, setAlertData] = useState({ severity: "", msg: "" });

  const [shortlistCount, setShortlistCount] = useState(0);
  const [shortlistedIds, setShortlistedIds] = useState("empty");

  const [shortlisted, setShortlisted] = useState(false);

  const handleSliderChange = (e, newCount) => {
    setShortlistCount(newCount);
  };

  const token = sessionStorage.getItem("userToken");
  const [role, setRole] = useState(
    jwt.decode(token, { complete: true })
      ? jwt.decode(token, { complete: true }).payload.userRole
      : null
  );

  const [openShortlistModal, setOpenShortlistModal] = useState(false);

  const handleOpenShortlistModal = () => {
    setOpenShortlistModal(true);
  };
  const handleCloseShortlistModal = () => {
    setOpenShortlistModal(false);
  };

  const handleAlert = () => {
    setAlertShow(true);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertShow(false);
  };
  useEffect(() => {
    retrieveJob();
  }, [jobId]);

  useEffect(() => {
    retrieveJobseekers();
  }, [applicantIds]);

  const retrieveJob = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/jobs/${jobId}`);
      if (response.data.success) {
        setJob(response.data.job);
        let userIds = [];
        response.data.job.applicationDetails.map((user) => {
          userIds = [...userIds, user.userId];
        });
        setApplicantIds(userIds);
      } else {
        console.log("404 Job not found");
      }
    } catch (err) {
      console.log("Could not retreive job");
      setAlertData({
        severity: "error",
        msg: "Something Went Wrong, Please Try Again Later.",
      });
      handleAlert();
    }
  };

  const retrieveJobseekers = async () => {
    if (applicantIds.length) {
      const ids = applicantIds.join("$$");
      try {
        const response = await axios.get(
          `${BACKEND_URL}/jobseeker/applicants/${ids}`
        );
        if (response.data.success) {
          setApplicants(response.data.jobseekers);
        }
      } catch (err) {
        setAlertData({
          severity: "error",
          msg: "Something Went Wrong, Please Try Again Later.",
        });
        handleAlert();
      }
    }
  };

  const displayApplicantCards = () => {
    if (applicants !== "empty") {
      if (isSignedIn && role === "employer" && userId) {
        return (
          <div>
            {!shortlisted &&
              applicants.map((user) => (
                <ApplicantCard
                  key={user._id}
                  jobseeker={user}
                  jobId={jobId}
                  setAlertData={setAlertData}
                  handleAlert={handleAlert}
                ></ApplicantCard>
              ))}
          </div>
        );
      } else {
        return (
          <FloatCard>
            <Typography variant="h6">You must log in first</Typography>
          </FloatCard>
        );
      }
    } else {
      return (
        <FloatCard>
          <NoInfo message="Sorry, There are no any applications yet." />
        </FloatCard>
      );
    }
  };

  const displayAlert = () => {
    return (
      <SnackBarAlert
        open={alertShow}
        onClose={handleAlertClose}
        severity={alertData.severity}
        msg={alertData.msg}
      />
    );
  };

  const displayApplicants = () => {
    return (
      <div>
        {!shortlisted && applicantIds.length !== 0 && (
          <div className={classes.shortlistBtnContainer}>
            <Button
              className={classes.shortlistBtn}
              startIcon={<PeopleIcon />}
              onClick={handleOpenShortlistModal}
            >
              Shortlist the Applicants
            </Button>
          </div>
        )}

        {displayApplicantCards()}
      </div>
    );
  };

  const displayShortlistedApplicants = () => {
    if (applicants !== "empty" && shortlistedIds !== "empty") {
      const shortlistedJobseekers = applicants.filter((applicant) =>
        shortlistedIds.includes(applicant._id)
      );

      const otherJobseekers = applicants.filter(
        (applicant) => !shortlistedIds.includes(applicant._id)
      );

      if (isSignedIn && role === "employer" && userId) {
        return (
          <div>
            {shortlisted && (
              <div className={classes.shortlistBtnContainer}>
                <Button
                  className={classes.shortlistBtn}
                  startIcon={<PeopleIcon />}
                  onClick={handleOpenShortlistModal}
                >
                  Shortlist the Applicants
                </Button>
              </div>
            )}
            <div className={classes.shorlistTitle}>
              <FloatCard>
                <Typography className={classes.shorlistTitleText} variant="h6">
                  Shortlisted Applicants
                </Typography>
              </FloatCard>
            </div>

            {shortlistedJobseekers.map((user) => (
              <ApplicantCard
                key={user._id}
                jobseeker={user}
                jobId={jobId}
                setAlertData={setAlertData}
                handleAlert={handleAlert}
              ></ApplicantCard>
            ))}
            {otherJobseekers.length !== 0 && (
              <div className={classes.applicantTitle}>
                <FloatCard>
                  <Typography
                    className={classes.shorlistTitleText}
                    variant="h6"
                  >
                    Other Applicants
                  </Typography>
                </FloatCard>
              </div>
            )}

            {otherJobseekers.map((user) => (
              <ApplicantCard
                key={user._id}
                jobseeker={user}
                jobId={jobId}
                setAlertData={setAlertData}
                handleAlert={handleAlert}
              ></ApplicantCard>
            ))}
          </div>
        );
      } else {
        return (
          <FloatCard>
            <Typography variant="h6">No applicants</Typography>
          </FloatCard>
        );
      }
    }
  };

  const displayShortlistModal = () => {
    if (applicants !== "empty") {
      return (
        <ShortlistModal
          openShortlistModal={openShortlistModal}
          handleCloseShortlistModal={handleCloseShortlistModal}
          shortlistCount={shortlistCount}
          handleSliderChange={handleSliderChange}
          max={applicants.length}
          handleShortlistSubmit={handleShortlistSubmit}
        ></ShortlistModal>
      );
    }
  };

  const handleShortlistSubmit = async (e) => {
    e.preventDefault();

    if (jobId && shortlistCount > 0) {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/jobs/shortlistForGivenCount/${jobId}/${shortlistCount}`
        );
        if (response.data.success) {
          handleCloseShortlistModal();
          setShortlisted(true);

          var applications = response.data.applications.sort((a, b) => {
            return b.score - a.score;
          });
          // console.log("sort", applications.slice(0, shortlistCount));
          var applicantIds = applications.slice(0, shortlistCount).map(obj => obj.userId);
          setShortlistedIds(applicantIds);
        }
      } catch (err) {
        handleCloseShortlistModal();
        setAlertData({
          severity: "error",
          msg: "Something Went Wrong, Please Try Again Later.",
        });
        handleAlert();
      }
    } else {
      setAlertData({
        severity: "info",
        msg: "Shortlist count should be greater than 0",
      });
      handleAlert();
    }
  };

  return (
    <>
      {displayAlert()}
      {displayShortlistModal()}

      <Grid container spacing={3} className={classes.root} justify="center">
        <Grid item xs={12} lg={9}>
          {resumeAccess || singleResumeAccess ? (
            displayShortlistedApplicants()
          ) : (
            <NoAccess />
          )}
          {resumeAccess || singleResumeAccess ? (
            displayApplicants()
          ) : (
            <NoAccess />
          )}
        </Grid>
      </Grid>
    </>
  );
};
// style={{border: "1px solid red"}}
export default Applications;
