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
import FloatCard from "../components/FloatCard";
import FeaturedJobs from "./components/featuredJobs";

const useStyles = makeStyles((theme) => ({
  border: {
    border: "1px solid red",
  },
  root: {
    marginLeft: "12px",
  },
  title: {
    fontWeight: 600,
    color: theme.palette.black,
  },
  emptyContentText: {
    color: theme.palette.black,
  },
  outterWrapper: {
    // paddingLeft: theme.spacing(1.5),
    // paddingRight: theme.spacing(1.5),
  },
  container: {
    marginBottom: theme.spacing(3),
  },
}));

// style={{border: "1px solid red"}}

function JobDescription() {
  const classes = useStyles();

  const [job, setJob] = useState("empty");
  const [allJobs, setAllJobs] = useState("empty");

  const isSignedIn = false;
  const jobId = "60c60c2c22a5b249ec118d95";

  useEffect(() => {
    retrieveJob();
    retrieveAllJobs();
  }, []);

  const retrieveJob = () => {
    axios.get(`${BACKEND_URL}/jobs/${jobId}`).then((res) => {
      if (res.data.success) {
        setJob(res.data.job);
      } else {
        setJob(null);
      }
    });
  };

  const retrieveAllJobs = () => {
    axios.get(`${BACKEND_URL}/jobs`).then((res) => {
      if (res.data.success) {
        setAllJobs(res.data.existingJobs);
      } else {
        setAllJobs(null);
      }
    });
  };

  const displaySummary = () => {
    if (job == "empty") {
      return (
        <Grid item sm={12}>
          <Typography>No infromation to display</Typography>
        </Grid>
      );
    } else {
      return (
        <Grid item sm={12} className={classes.container}>
          <FloatCard>
            <JobSummary job={job}></JobSummary>
          </FloatCard>
        </Grid>
      );
    }
  };


  const displayResponsibilities = () => {
    if (job == "empty") {
      return (
        <Grid item sm={12}>
          <Typography>No infromation to display</Typography>
        </Grid>
      );
    } else {
      return (
        <Grid item xs={12} lg={12} className={classes.container}>
          <FloatCard>
            <Responsibilities
              responsibilities={job.tasksAndResponsibilities}
            ></Responsibilities>
          </FloatCard>
        </Grid>
      );
    }
  };

  // **** add margin bottom to the last component when signed in ***
  const displayRequirements = () => {
    if (job == "empty") {
      return (
        <Grid item sm={12}>
          <Typography>No infromation to display</Typography>
        </Grid>
      );
    } else {
      return (
        <Grid
          item
          xs={12}
          lg={12}
          className={isSignedIn === false ? "" : classes.container}
        >
          <FloatCard>
            <Requirements requirements={job.qualifications}></Requirements>
          </FloatCard>
        </Grid>
      );
    }
  };

  const displayApplyForm = () => {
    if (isSignedIn === true) {
      return (
        <Grid item sm={12}>
          <FloatCard>
            <ApplyForm></ApplyForm>
          </FloatCard>
        </Grid>
      );
    }
  };

  const displayFeaturedJobs = () => {
    if (allJobs == "empty") {
      return (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FloatCard>
              <Typography variant="h6" className={classes.title}>
                Featured Jobs
              </Typography>
            </FloatCard>
          </Grid>
          <Grid item xs={12}>
            <FloatCard>
              <Typography variant="body1" className={classes.emptyContentText}>
                There are no featured Jobs
              </Typography>
            </FloatCard>
          </Grid>
        </Grid>
      );
    } else {
      const featuredJobs = allJobs.filter((job) => (job.isFeatured === true && job._id !== jobId));
      return <FeaturedJobs featuredJobs={featuredJobs}></FeaturedJobs>;
    }
  };

  return (
    <>
      <Grid
        item
        container
        className={classes.outterWrapper}
        xs={12}
        spacing={3}
      >
        <Grid item xs={12} lg={8} spacing={0}>
          <Grid item container>
            <Grid item xs={12}>
              {displaySummary()}
            </Grid>
            <Grid item xs={12}>
              {displayResponsibilities()}
            </Grid>
            <Grid item xs={12}>
              {displayRequirements()}
            </Grid>
            {displayApplyForm()}
          </Grid>
        </Grid>

        <Grid item md={12} lg={4}>
          {displayFeaturedJobs()}
        </Grid>
      </Grid>
    </>
  );
}

export default JobDescription;
