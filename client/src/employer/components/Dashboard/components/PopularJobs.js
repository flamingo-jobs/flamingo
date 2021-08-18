import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import FloatCard from "../../FloatCard";
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useState, useEffect } from "react";
import axios from "axios";
import BACKEND_URL from "../../../../Config";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundSize: "cover",
    marginRight: -12,
  },
  title: {
    fontWeight: "bolder",
    color: theme.palette.stateBlue,
    float: "left",
    marginLeft: 10,
  },
  notificationsIcon: {
    color: theme.palette.stateBlue,
    marginTop: 5,
    marginLeft: 20,
  },
}));

const PopularJobs = (props) => {
  const classes = useStyles();

  const [state, setState] = useState({
    allJobs: [],
  });

  const allJobs = state.allJobs;

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/jobs/filterAllByOrganization/${props.employerId}`)
      .then((res) => {
        console.log(res.data.employerJobs);
        if (res.data.success) {
          setState({
            allJobs: res.data.employerJobs,
          });
        }
      });
  }, []);

  return (
    <div className={classes.root}>
      <FloatCard>
        <Grid container direction="row" xs={12}>
          <Grid item>
            <Typography variant="h6" className={classes.title}>
              Most Popular Jobs
            </Typography>
            <FavoriteIcon className={classes.notificationsIcon} />
          </Grid>

          <Grid item container direction="row" xs={12}>
            
          </Grid>
        </Grid>
      </FloatCard>
    </div>
  );
};

export default PopularJobs;
