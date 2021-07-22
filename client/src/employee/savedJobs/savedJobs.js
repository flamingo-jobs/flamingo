import React, { useState, useEffect } from "react";
import FloatCard from "../../components/FloatCard";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import FavoriteJob from "./components/savedJob";
import BACKEND_URL from "../../Config";
import axios from "axios";

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
  // Used for updating DB
  const [savedJobIdsForDB, setSavedJobIdsForDB] = useState([]);
  const userId = sessionStorage.getItem("loginId");

  useEffect(() => {
    retrieveJobseeker();
  }, []);

  const retrieveJobseeker = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/jobseeker/${userId}`);
      if (response.data.success) {
        setSavedJobIds(response.data.jobseeker.savedJobs);
        setSavedJobIdsForDB(response.data.jobseeker.savedJobs);
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
            <Typography>You don't have any saved jobs yet.</Typography>
          </FloatCard>
        </Grid>
      );
    }
    return (
      <Grid item xs={9}>
        {savedJobIds.map((jobId) => (
          <FavoriteJob
            key={jobId}
            jobId={jobId}
            userId={userId}
            savedJobIds={savedJobIds}
            setSavedJobIds={setSavedJobIds}
            savedJobIdsForDB={savedJobIdsForDB}
            setSavedJobIdsForDB={setSavedJobIdsForDB}
          ></FavoriteJob>
        ))}
      </Grid>
    );
  };

  return (
    <Container className={classes.root}>
      <Grid container>
        {displaySavedJobs()}
      </Grid>
    </Container>
  );
};

export default SavedJobs;
