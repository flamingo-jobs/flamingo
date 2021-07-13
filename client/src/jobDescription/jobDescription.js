import React, { useState, useEffect, useRef } from "react";
import { Grid, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import BACKEND_URL from "../Config";
import { useParams } from "react-router";
// Custom components
import JobSummary from "./components/jobSummary";
import Responsibilities from "./components/responsibilities";
import Requirements from "./components/requirements";
import ApplyForm from "./components/applyForm";
import FloatCard from "../components/FloatCard";
import MoreFromJobs from "./components/MoreFromJobs";
import RelatedJobs from "./components/RelatedJobs";
import CompanySummary from "./components/companySummary";

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
    marginBottom: theme.spacing(1),
  },
}));

// style={{border: "1px solid red"}}

function JobDescription() {
  const classes = useStyles();

  const [job, setJob] = useState("empty");
  const [moreFromJobs, setMoreFromJobs] = useState(null);

  let isSignedIn = false;
  if (sessionStorage.getItem("loginId") !== null) {
    isSignedIn = true;
  }

  const userId = sessionStorage.getItem("loginId");

  let { id } = useParams();
  const [jobId, setJobId] = useState(window.location.pathname.split("/")[2]);

  useEffect(() => {
    setJobId(window.location.pathname.split("/")[2]);
  }, [window.location.pathname]);

  useEffect(() => {
    retrieveJob();
    displayMoreFromJobs();
    displayRelatedJobs();
  }, [jobId]);

  const retrieveJob = () => {
    axios.get(`${BACKEND_URL}/jobs/${jobId}`).then((res) => {
      if (res.data.success) {
        setJob(res.data.job);
      } else {
        setJob(null);
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
          <JobSummary job={job} 
            isSignedIn={isSignedIn}
          ></JobSummary>
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
          <Responsibilities
            responsibilities={job.tasksAndResponsibilities}
          ></Responsibilities>
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
          <Requirements requirements={job.qualifications}></Requirements>
        </Grid>
      );
    }
  };

  const displayApplyForm = () => {
    if (isSignedIn === true && userId !== "empty" && job !== "empty") {

      return (
        <Grid item sm={12}>
          <ApplyForm userId={userId} jobId={jobId}></ApplyForm>
        </Grid>
      );
    }
  };

  const displayCompanySummary = () => {
    if (job != "empty") {
      return <CompanySummary job={job} />;
    }
  };

  const displayMoreFromJobs = () => {
    if (job != "empty") {
      return <MoreFromJobs job={job} />;
    }
  };

  const displayRelatedJobs = () => {
    if (job != "empty") {
      return <RelatedJobs job={job} />;
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
        <Grid item xs={12} lg={7} spacing={0}>
          <Grid item container xs={12}>
            <FloatCard>
              <Grid item xs={12}>
                {displaySummary()}
              </Grid>
              <Grid item xs={12}>
                {displayResponsibilities()}
              </Grid>
              <Grid item xs={12}>
                {displayRequirements()}
              </Grid>
            </FloatCard>
            <Grid item xs={12}>
              {displayApplyForm()}
            </Grid>
          </Grid>

        </Grid>

        <Grid item md={12} lg={5}>
          {displayCompanySummary()}
          {displayMoreFromJobs()}
          {displayRelatedJobs()}
        </Grid>
      </Grid>
    </>
  );
}

export default JobDescription;
