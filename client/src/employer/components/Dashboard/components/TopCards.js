import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import FloatCard from "../../../../components/FloatCard";

import axios from "axios";
import BACKEND_URL from "../../../../Config";
import { useState, useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundSize: "cover",
    marginLeft: 10,
    marginRight: 10,
  },
  cardTitle: {
    fontWeight: "bolder",
    fontSize: 15,
    color: theme.palette.stateBlue,
    marginBottom: 3,
    float: "center",
  },
  cardNumber: {
    fontWeight: "bolder",
    fontSize: 40,
    color: theme.palette.stateBlue,
    float: "center",
  },
  pieChart: {
    width: 90,
    height: 90,
    padding: "0 0 0 0",
    marginTop: -190,
    marginBottom: -200,
    marginLeft: 65,
  },
  applicationCard: {
    paddingBottom: 20,
  },
  applicationsTitle: {
    fontWeight: "bolder",
    fontSize: 15,
    color: theme.palette.stateBlue,
    marginBottom: 20,
    float: "center",
  },
  applicationsNumber: {
    fontWeight: "bolder",
    fontSize: 51,
    color: theme.palette.stateBlue,
    float: "center",
  },
  maintitle: {
    fontWeight: "bolder",
    fontSize: 20,
    color: theme.palette.stateBlue,
  },
}));

const TopCards = (props) => {
  const [value, setValue] = React.useState(2);

  const [state, setState] = useState({
    allJobs: [],
  });

  const allJobs = state.allJobs;

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/jobs/filterAllByOrganization/${props.employerId}`)
      .then((res) => {
        // console.log(res.data.employerJobs);
        if (res.data.success) {
          setState({
            allJobs: res.data.employerJobs,
          });
        }
      });
  }, []);

  const getTotalApplications = () => {
    var noOfApplications = 0;

    allJobs.forEach((job) => {
      noOfApplications = noOfApplications + job.applicationDetails.length;
    });
    return noOfApplications;
  };

  const getTotalPending = () => {
    var totalPending = 0;

    allJobs.forEach((job) => {
      job.applicationDetails.forEach((jobApplication) => {
        if (jobApplication.status == "pending") {
          totalPending++;
        }
      });
    });
    return totalPending;
  };

  const getTotalReviewing = () => {
    var totalReviewing = 0;

    allJobs.forEach((job) => {
      job.applicationDetails.forEach((jobApplication) => {
        if (jobApplication.status == "reviewing") {
          totalReviewing++;
        }
      });
    });
    return totalReviewing;
  };

  const getTotalShortlisted = () => {
    var totalShortlisted = 0;

    allJobs.forEach((job) => {
      job.applicationDetails.forEach((jobApplication) => {
        if (jobApplication.status == "shortlisted") {
          totalShortlisted++;
        }
      });
    });
    return totalShortlisted;
  };

  const getTotalRejected = () => {
    var totalRejected = 0;

    allJobs.forEach((job) => {
      job.applicationDetails.forEach((jobApplication) => {
        if (jobApplication.status == "rejected") {
          totalRejected++;
        }
      });
    });
    return totalRejected;
  };

  const getTotalActiveJobs = () => {
    var totalActive = 0;

    allJobs.forEach((job) => {
      if (job.isPublished == true) {
        totalActive++;
      }
    });
    return totalActive;
  };

  const getTotalInactiveJobs = () => {
    var totalInactive = 0;

    allJobs.forEach((job) => {
      if (job.isPublished == false) {
        totalInactive++;
      }
    });
    return totalInactive;
  };

  const getTotalExpiredJobs = () => {
    var totalExpired = 0;
    var today = new Date();

    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();

    var today = yyyy + "-" + mm + "-" + dd;

    allJobs.forEach((job) => {
      if (job.dueDate.slice(0, 10) < today) {
        totalExpired++;
      }
    });
    return totalExpired;
  };

  const classes = useStyles();

  return (
    <Grid
      container
      spacing={1}
      direction="row"
      justifyContent="space-between"
      alignItems="stretch"
    >
      <Grid item xs={12}>
        <FloatCard>
          <Typography className={classes.maintitle}>
            Hi, Welcome back!
          </Typography>
        </FloatCard>
      </Grid>

      <Grid item xs={12} sm={6}>
        <FloatCard>
          <Typography variant="body2" className={classes.cardTitle}>
            TOTAL JOBS
          </Typography>
          <Typography variant="h5" className={classes.cardNumber}>
            {allJobs.length}
          </Typography>
        </FloatCard>
      </Grid>

      <Grid item xs={12} sm={6}>
        <FloatCard>
          <Typography variant="body2" className={classes.cardTitle}>
            TOTAL APPLICATIONS
          </Typography>
          <Typography variant="h5" className={classes.cardNumber}>
            {getTotalApplications()}
          </Typography>
        </FloatCard>
      </Grid>

      <Grid item xs={12} sm={6}>
        <FloatCard>
          <Typography variant="body2" className={classes.cardTitle}>
            ACTIVE JOBS
          </Typography>
          <Typography variant="h5" className={classes.cardNumber}>
            {getTotalActiveJobs()}
          </Typography>
        </FloatCard>
      </Grid>

      <Grid item xs={12} sm={6}>
        <FloatCard>
          <Typography variant="body2" className={classes.cardTitle}>
            INACTIVE JOBS
          </Typography>
          <Typography variant="h5" className={classes.cardNumber}>
            {getTotalInactiveJobs()}
          </Typography>
        </FloatCard>
      </Grid>

      <Grid item xs={12}>
        <FloatCard>
          <Typography className={classes.maintitle}>
            You have {getTotalExpiredJobs()} Expired Jobs! 
          </Typography>
        </FloatCard>
      </Grid>

    </Grid>
  );
};

export default TopCards;
