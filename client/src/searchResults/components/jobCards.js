import React, { useState, useEffect } from "react";
import { makeStyles, Grid } from "@material-ui/core";
import JobCard from "../../jobs/components/JobCard";
import FloatCard from "../../components/FloatCard";
import SearchNotFound from "./searchNotFound";

const useStyles = makeStyles((theme) => ({
  jobCardWrapper: {
    marginBottom: theme.spacing(2),
  },
}));

const JobCards = (props) => {
  const classes = useStyles();
  const userId = sessionStorage.getItem("loginId");

  const displayJobs = () => {
    if (props.jobs.length === 0) {
      return (
        <Grid item xs={9}>
          <FloatCard>
            <SearchNotFound></SearchNotFound>
          </FloatCard>
        </Grid>
      );
    } else {
      return (
        <Grid item xs={9}>
          {props.jobs.map((job) => (
            <div className={classes.jobCardWrapper}>
              <JobCard 
                key={job._id} 
                info={job}
                userId={userId}
                userRole={props.userRole} 
                savedJobIds={props.savedJobIds} 
                setSavedJobIds={props.setSavedJobIds}
              ></JobCard>
            </div>
          ))}
        </Grid>
      );
    }
  };

  return displayJobs();
};

export default JobCards;
