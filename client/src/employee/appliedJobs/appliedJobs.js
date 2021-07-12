import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import BACKEND_URL from "../../Config";
import { useParams } from "react-router";
import FloatCard from "../../components/FloatCard";
import Job from "./components/job";

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

function AppliedJobs() {
  const classes = useStyles();
  const dateNow = new Date();
  // const userId = "60e88763e523bf3354852516";
  const userId = sessionStorage.getItem("loginId");
  const [jobseeker, setJobseeker] = useState("empty");

  useEffect(() => {
    retrieveJobseeker();
  }, []);

  const retrieveJobseeker = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/jobseeker/${userId}`);
      if (response.data.success) {
        setJobseeker(response.data.jobseeker);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const displayAppliedJobs = () => {
    if (jobseeker !== "empty") {
      if (jobseeker.applicationDetails.length > 0) {
        return jobseeker.applicationDetails.map((item, index) => (
          <Job
            key={item.jobId}
            userId={userId}
            jobId={item.jobId}
            applicationDetails={jobseeker.applicationDetails[index]}
          ></Job>
        ));
      } else {
        return (
          <FloatCard>
            <Typography variant="h6">
              You haven't applied for any jobs
            </Typography>
          </FloatCard>
        );
      }
    } else {
      return (
        <FloatCard>
          <Typography variant="h6">You must log in first</Typography>
        </FloatCard>
      );
    }
  };

  return (
    <>
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={12}>
          {displayAppliedJobs()}
        </Grid>
      </Grid>
    </>
  );
}

export default AppliedJobs;
