import React, { useState, useEffect } from "react";
import { Grid, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import BACKEND_URL from "../Config";
// Custom components
import JobSummary from "./components/jobSummary";
import Responsibilities from "./components/responsibilities";
import Requirements from "./components/requirements";
import ApplyForm from "./components/applyForm";
import Organization from "./../employer/components/Organization";
import FloatCard from "../components/FloatCard";
import JobCard from "../jobs/components/JobCard";

const useStyles = makeStyles((theme) => ({
  border: {
    border: "1px solid red",
  },
  root: {
    marginLeft: "12px",
  },
  outterWrapper: {
    // paddingLeft: theme.spacing(1.5),
    // paddingRight: theme.spacing(1.5),
  },
  container: {
    // marginBottom: theme.spacing(3),
  },
}));

function JobDescription() {
  const classes = useStyles();

  const [job, setJob] = useState("empty");

  useEffect(() => {
    retrieveJob();
  });

  const retrieveJob = () => {
    axios.get(`${BACKEND_URL}/jobs/60c184a2c76c4d325461e7f0`).then(res => {
      if (res.data.success) {
        setJob(res.data.job)
      } else {
        setJob(null)
      }
    })
  }

  const displayJob = () => {
    if (job == "empty") {
      return (
        <Grid item sm={12}>
          <Typography>No infromation to display</Typography>
        </Grid>)
    } else {
      return (
        <Grid item sm={12} className={classes.container}>
          <FloatCard>
            <JobSummary
              job={job}
            ></JobSummary>
          </FloatCard>
        </Grid>
      )

    }
  }

    const displayResponsibilities = () => {
    if (job == "empty") {
      return (
        <Grid item sm={12}>
          <Typography>No infromation to display</Typography>
        </Grid>)
    } else {
      return (
        <Grid item xs={12} lg={6} className={classes.container}>
          <FloatCard>
            <Responsibilities
              responsibilities={job.tasksAndResponsibilities}
            ></Responsibilities>
          </FloatCard>
        </Grid>
      )

    }
  }

  const displayRequirements = () => {
    if (job == "empty") {
      return (
        <Grid item sm={12}>
          <Typography>No infromation to display</Typography>
        </Grid>)
    } else {
      return (
        <Grid item xs={12} lg={6} className={classes.container}>
          <FloatCard>
            <Requirements requirements={job.qualifications}></Requirements>
          </FloatCard>
        </Grid>
      )

    }
  }
  return (
    <>
      <Grid item container className={classes.outterWrapper} xs={12} spacing={3}>


        {displayJob()}
        
        {displayResponsibilities()}

        {displayRequirements()}

        <Grid item sm={12}>
          <FloatCard>
            {/* <ApplyForm></ApplyForm> */}
          </FloatCard>
        </Grid>
      </Grid>
    </>
  );
};

export default JobDescription;
