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

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
  },
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
          <FloatCard>
          <CircularProgress />
          </FloatCard>
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
      <Grid item xs={9}>
        {savedJobIds.map((jobId) => (
          <SavedJob
            key={jobId}
            jobId={jobId}
            userId={userId}
            savedJobIds={savedJobIds}
            setSavedJobIds={setSavedJobIds}
            setAlertData={setAlertData}
            handleAlert={handleAlert}
          ></SavedJob>
        ))}
      </Grid>
    );
  };

  return (
    <Container className={classes.root}>
      {displayAlert()}
      <Grid container justify="center">
        {displaySavedJobs()}
      </Grid>
    </Container>
  );
};

export default SavedJobs;
