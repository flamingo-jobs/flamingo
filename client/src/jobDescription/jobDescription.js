import React, { useState, useEffect } from "react";
import { Grid, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

// Custom components
import JobSummary from "./components/jobSummary";
import Responsibilities from "./components/responsibilities";
import Requirements from "./components/requirements";
import ApplyForm from "./components/applyForm";
import Organization from "./../employer/components/Organization";
import FloatCard from "../components/FloatCard";

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

const JobDescription = () => {
  const classes = useStyles();

  const [job, setJob] = useState([]);

  useEffect(() => {
    retrieveJob();
  }, []);

  const retrieveJob = async () => {
    const { data } = await axios.get(
      "http://localhost:8000/jobs/60c60c2c22a5b249ec118d95"
    );

    if (data.success) {
      setJob(data.job);
    } else {
      setJob(null);
    }
  };

  return (
    <>
      <Grid item container className={classes.outterWrapper} xs={12} spacing={3}>

        <Grid item sm={12} className={classes.container}>
          <FloatCard>
            <JobSummary
              title={job.title}
              organization={job.organization}
              location={job.location}
              type={job.type}
              postedDate={job.postedDate}
              dueDate={job.dueDate}
              description={job.description}
            ></JobSummary>
          </FloatCard>
        </Grid>

        <Grid item xs={12} lg={6} className={classes.container}>
          <FloatCard>
            <Responsibilities
              responsibilities={job.tasksAndResponsibilities}
            ></Responsibilities>
          </FloatCard>
        </Grid>

        <Grid item xs={12} lg={6} className={classes.container}>
          <FloatCard>
            <Requirements></Requirements>
          </FloatCard>
        </Grid>

        <Grid item sm={12}>
          <FloatCard>
            <ApplyForm></ApplyForm>
          </FloatCard>
        </Grid>
      </Grid>
    </>
  );
};

export default JobDescription;
