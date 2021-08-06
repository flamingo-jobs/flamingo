import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import BACKEND_URL from "../../Config";
import FloatCard from "../../components/FloatCard";
import ApplicantCard from "./components/applicantCard";
import SnackBarAlert from "../../components/SnackBarAlert";

const useStyles = makeStyles((theme) => ({
  border: {
    border: "1px solid red",
  },
  root: {
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
  },
}));

// style={{border: "1px solid red"}}

const Applications = () => {
  const classes = useStyles();
  const userId = sessionStorage.getItem("loginId");
  const [jobId, setJobId] = useState(window.location.pathname.split("/")[3]);
  const [job, setJob] = useState("empty");
  const [applicantIds, setApplicantIds] = useState([]);
  const [applicants, setApplicants] = useState([]);

  const [alertShow, setAlertShow] = React.useState(false);
  const [alertData, setAlertData] = React.useState({ severity: "", msg: "" });

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
    if (applicants.length !== 0) {
      if (userId) {
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

  return (
    <>
      {displayAlert()}
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={9}>
          {displayApplicants()}
        </Grid>
      </Grid>
    </>
  );
};

export default Applications;
