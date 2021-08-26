import React, { useState, useEffect } from "react";
import FloatCard from "../../components/FloatCard";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Container,
  CircularProgress,
} from "@material-ui/core";
import SavedJob from "./components/savedJob";
import BACKEND_URL from "../../Config";
import axios from "axios";
import SnackBarAlert from "../../components/SnackBarAlert";
import Loading from "../../components/Loading";

const useStyles = makeStyles((theme) => ({
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
const SavedJobs = () => {
  const classes = useStyles();
  const [savedJobIds, setSavedJobIds] = useState([]);
  const userId = sessionStorage.getItem("loginId");

  // Alert related states
  const [alertShow, setAlertShow] = useState(false);
  const [alertData, setAlertData] = useState({ severity: "", msg: "" });

  useEffect(() => {
    retrieveJobseeker();
  }, []);

  // Error related stuff
  const displayAlert = () => {
    return (
      <SnackBarAlert
        open={alertShow}
        onClose={handleAlertClose}
        severity={alertData.severity}
        msg={alertData.msg}
      />
    );
  };

  const handleAlert = () => {
    setAlertShow(true);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertShow(false);
  };

  const retrieveJobseeker = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/jobseeker/${userId}`);
      if (response.data.success) {
        setSavedJobIds(response.data.jobseeker.savedJobs);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const displaySavedJobs = () => {
    if (!savedJobIds.length) {
      return (
        <Grid item xs={12}>
          <Loading />
        </Grid>
      );
    }
    if (savedJobIds === "empty") {
      return (
        <Grid item xs={12}>
          <FloatCard>
            <Typography>You don't have any saved jobs yet.</Typography>
          </FloatCard>
        </Grid>
      );
    }
    return (
      savedJobIds.map((jobId) => (
        <Grid item key={jobId + "grid"} xs={12} className={classes.gridCard}>
          <SavedJob
            key={jobId}
            jobId={jobId}
            userId={userId}
            savedJobIds={savedJobIds}
            setSavedJobIds={setSavedJobIds}
            setAlertData={setAlertData}
            handleAlert={handleAlert}
          ></SavedJob>
        </Grid>
      ))
    );
  };

  return (
    <Grid item container xs={12} spacing={3} direction="row"
      justify="space-between"
      alignItems="flex-start" className={classes.mainGrid}>
      {displayAlert()}
      <Grid item container xs={12} spacing={0} direction="row"
        justify="space-between"
        alignItems="flex-start" className={classes.jobsGrid}>
        {displaySavedJobs()}
      </Grid>
    </Grid>
  );
};

export default SavedJobs;
