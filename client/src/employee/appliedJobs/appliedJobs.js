import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import BACKEND_URL from "../../Config";
import FloatCard from "../../components/FloatCard";
import Job from "./components/job";
import Loading from '../../components/Loading';
import NoInfo from '../../components/NoInfo';
import ApplicationFilters from "./components/applicationFilters";

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
    marginBottom: 6
  },
  filterGrid: {
    [theme.breakpoints.down('sm')]: {
        order: 2
    },
  },
}));

// style={{border: "1px solid red"}}

function AppliedJobs() {
  const classes = useStyles();
  const dateNow = new Date();

  const [filters, setFilters] = useState([]);

  const userId = sessionStorage.getItem("loginId");
  const [jobseeker, setJobseeker] = useState("empty");
  const [filteredApplications, setFilteredApplications] = useState([]);

  useEffect(() => {
    retrieveJobseeker();
  }, []);

  useEffect(() => {
    filterApplications();
  }, [filters]);

  const retrieveJobseeker = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/jobseeker/${userId}`);
      if (response.data.success) {
        const temp1 = new Date("2021-09-08T13:43:50.039Z");
        const temp2 = new Date("2021-09-09T03:53:30.669Z");

        response.data.jobseeker.applicationDetails.sort((a, b) => {
          const temp1 = new Date(a.appliedDate);
          const temp2 = new Date(b.appliedDate);
          return temp2 - temp1;
        });
        console.log("ddd", response.data.jobseeker)

        setJobseeker(response.data.jobseeker);
      }
    } catch (err) {
      // console.log(err);
    }
  };

  const filterApplications = () => {
    if (jobseeker !== "empty" && jobseeker.applicationDetails.length > 0){
      if(filters.length > 0){
        const newFiltered = jobseeker.applicationDetails.filter(a => {
          if(filters.includes(a.status)){
            return a;
          }
        });
        setFilteredApplications(newFiltered);
      }
    }
  }
  

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
        if(filters.length === 0){
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
        } else if (filters.length > 0) {
          return filteredApplications.map((item, index) => (
            <Grid item key={index + "grid"} xs={12} className={classes.gridCard}>
              <Job
                key={item.jobId}
                userId={userId}
                jobId={item.jobId}
                applicationDetails={filteredApplications[index]}
              ></Job>
            </Grid>
          ));
        }
      } else {
        return (
          <FloatCard>
            <NoInfo message=" You haven't applied for any jobs" />
          </FloatCard>
        );
      }
    }
  };

  const updateFilters = (filters) => {
    setFilters(filters);
  }

  return (
    <>
      <Grid item container xs={12} spacing={3} direction="row"
        justify="space-between"
        alignItems="flex-start" className={classes.mainGrid}>
        <Grid item container xs={12} md={8} lg={9} spacing={0} direction="row"
          justify="space-between"
          alignItems="flex-start" className={classes.jobsGrid}>
          {displayAppliedJobs()}
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={3} className={classes.filterGrid}>
          <ApplicationFilters updateFilters={updateFilters} />
        </Grid>
      </Grid>
    </>
  );
}

export default AppliedJobs;
