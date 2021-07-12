import React from "react";
// import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  CssBaseline,
  Container,
  ThemeProvider,
  makeStyles,
  useTheme,
  Avatar,
  Typography,
  Button,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import FloatCard from "../../FloatCard";
import Box from "@material-ui/core/Box";



const useStyles = makeStyles((theme) => ({
  root: {
    backgroundSize: "cover",
    marginLeft:15,
    marginTop:5,
    marginRight: -15,
  },
  title: {
    fontWeight: "bolder",
    color: theme.palette.stateBlue,
    float: "left",
    marginLeft: 10,
  },
  title2:{
    // fontWeight: "bolder",
    color: theme.palette.stateBlue,
    float: "Right",
    marginRight:10,
  },
  notificationsIcon:{
    color: theme.palette.stateBlue,
    marginTop: 5,
    marginLeft: 50,
  },
}));

const LineGraph = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FloatCard>
        <Typography variant="h6" className={classes.title}>
          Top Jobs
        </Typography>
        <Typography variant="body1" className={classes.title2}>
          This Month
        </Typography>

      </FloatCard>
    </div>
  );
};

export default LineGraph;
