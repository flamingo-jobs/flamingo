import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import BACKEND_URL from "../../Config";
import FloatCard from "../../components/FloatCard";
import Job from "./components/job";
import Loading from '../../components/Loading';
import NoInfo from '../../components/NoInfo';

const useStyles = makeStyles((theme) => ({
  border: {
    border: "1px solid red",
  },
  jobsGrid: {
    [theme.breakpoints.down('sm')]: {
      maxWidth: 'unset',
      flexDirection: 'column',
      alignItems: "stretch",
      order: 3
    },
  },
  mainGrid: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: "stretch"
    },
  },
  pagination: {
    justifyContent: 'center',
  },
  gridCard: {
    display: "grid",
    marginBottom: 12
  }
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
    if(jobseeker === "empty"){
      return (
        <FloatCard>
          <Loading />
        </FloatCard>
      );
    }
    else if (jobseeker !== "empty") {
      if (jobseeker.applicationDetails.length > 0) {
        return jobseeker.applicationDetails.map((item, index) => (
          <Grid item key={index + "grid"} xs={12} className={classes.gridCard}>
            <Job
              key={item.jobId}
              userId={userId}
              jobId={item.jobId}
              applicationDetails={jobseeker.applicationDetails[index]}
            ></Job>
          </Grid>
        ));
      } else {
        return (
          <FloatCard>
            <NoInfo message=" You haven't applied for any jobs" />
          </FloatCard>
        );
      }
    }
  };

  return (
    <>
      <Grid item container xs={12} spacing={3} direction="row"
        justify="space-between"
        alignItems="flex-start" className={classes.mainGrid}>
        <Grid item container xs={12} spacing={0} direction="row"
          justify="space-between"
          alignItems="flex-start" className={classes.jobsGrid}>
          {displayAppliedJobs()}
        </Grid>
      </Grid>
    </>
  );
}

export default AppliedJobs;
