import React, { useState, useEffect } from "react";
import { makeStyles, Grid } from "@material-ui/core";
import JobCard from "../../jobs/components/JobCard";
import FloatCard from "../../components/FloatCard";
import SearchNotFound from "./searchNotFound";
const jwt = require("jsonwebtoken");
require("dotenv").config();


const useStyles = makeStyles((theme) => ({
  jobCardWrapper: {
    marginBottom: theme.spacing(2),
  },
}));

const JobCards = (props) => {
  const classes = useStyles();
  const userId = sessionStorage.getItem("loginId");

  const token = sessionStorage.getItem("userToken");
  const [role, setRole] = useState(
    jwt.decode(token, { complete: true })
    ? jwt.decode(token, { complete: true }).payload.userRole
    : null
  );

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
            <div className={classes.jobCardWrapper} key={job._id} >
              <JobCard 
                info={job}
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
