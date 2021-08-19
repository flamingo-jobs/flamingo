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
    color: theme.palette.white,
    backgroundColor: theme.palette.vividSkyBlue,
    "&:hover": {
      backgroundColor: theme.palette.vividSkyBlueHover,
    },
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

  const [alertShow, setAlertShow] = React.useState(false);
  const [alertData, setAlertData] = React.useState({ severity: "", msg: "" });

  const [shortlistCount, setShortlistCount] = useState(0);

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
      // console.log(err);
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
        console.log(err);
      }
    }
  };

  const displayApplicants = () => {
    if (applicants !== "empty") {
      if (isSignedIn && role === "employer" && userId) {
        return applicants.map((user) => (
          <ApplicantCard
            key={user.userId}
            jobseeker={user}
            jobId={jobId}
            setAlertData={setAlertData}
            handleAlert={handleAlert}
          ></ApplicantCard>
        ));
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
          <Typography variant="h6">There are no applicants</Typography>
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

  const displayShortlistButton = () => {
    return (
      <div>
        <div className={classes.shortlistBtnContainer}>
          <Button
            className={classes.shortlistBtn}
            variant="contained"
            startIcon={<PeopleIcon />}
            onClick={handleOpenShortlistModal}
          >
            Shortlist the Applicants
          </Button>
        </div>
        {displayApplicants()}
      </div>
    );
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

  const handleShortlistSubmit = (e) => {
    e.preventDefault();
    
  }

  return (
    <>
      {displayAlert()}
      {displayShortlistModal()}

      <Grid container spacing={3} className={classes.root} justify="center">
        <Grid item xs={9}>
          {resumeAccess || singleResumeAccess ? (
            displayShortlistButton()
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
