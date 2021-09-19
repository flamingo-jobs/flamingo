import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import FloatCard from "../../components/FloatCard";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import BACKEND_URL from "../../Config";

const useStyles = makeStyles(() => ({
  cardContainer: {
    paddingTop: "50px",
  },
}));

function WeeklyApplications() {
  const classes = useStyles();
  const [weeklyApplications, setWeeklyApplications] = useState(0);

  useEffect(() => {
    retrieveWeeklyApplications();
  }, []);

  const retrieveWeeklyApplications = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/analytics/getWeeklyApplications`
      );
      if (response.data.success) {
        setWeeklyApplications(response.data.weeklyApplications);
      }
    } catch (err) {
      // console.log(err);
    }
  };

  // style={{border: "1px solid red"}}
  return (
    <FloatCard>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h2">{weeklyApplications}</Typography>
            <Typography>Applications</Typography>
          </Grid>
        </Grid>
    </FloatCard>
  );
}

export default WeeklyApplications;
