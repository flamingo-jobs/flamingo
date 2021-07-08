import React from "react";
// import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  CssBaseline,
  Container,
  ThemeProvider,
  makeStyles,
  useTheme,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundSize: "cover",
    minHeight: "100vh",
  },
  container: {
    paddingTop: 20,
    [theme.breakpoints.down("xs")]: {
      paddingTop: 0,
    },
  },
  FeaturedOrganizations: {
    paddingTop: 25,
  },
  topBarGrid: {
    [theme.breakpoints.down("xs")]: {
      display: "block",
      maxWidth: "unset",
    },
  },
  sideDrawerGrid: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
}));

const EmployerJobList = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      xs={12}
      spacing={3}
      direction="row"
      justify="space-between"
      alignItems="flex-start"
    ></Grid>
  );
};

export default EmployerJobList;
