import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import FloatCard from "../../components/FloatCard";
import axios from "axios";
import BACKEND_URL from "../../Config";

const useStyles = makeStyles(() => ({
  cardContainer: {
    paddingTop: "50px",
  },
}));

function NewJobPostings() {
  const classes = useStyles();
  const [weeklyJobPostings, setWeeklyJobPostings] = useState(0);

  useEffect(() => {
    retrieveWeeklyJobPostings();
  }, []);

  const retrieveWeeklyJobPostings = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/analytics/getWeeklyJobPostings`
      );
      if (response.data.success) {
        setWeeklyJobPostings(response.data.weeklyJobPostings);
      }
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <FloatCard>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h2">{weeklyJobPostings}</Typography>
            <Typography>New Job Postings</Typography>
          </Grid>
        </Grid>
    </FloatCard>
  );
}

export default NewJobPostings;
