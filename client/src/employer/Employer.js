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
import CompanyInfo from "./components/CompanyInfo";
import TechStack from "./components/TechStack";
import FeaturedJobs from "./components/FeaturedJobs";
import Reviews from "./components/Reviews";

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

const Employer = (props) => {
  const classes = useStyles();

  return (
    <Grid
      container
      xs={12}
      spacing={3}
      direction="row"
      justify="space-between"
      alignItems="flex-start"
    >
      <Grid item container xs={12} sm={12} md={7} spacing={3}>
        <CompanyInfo userRole={props.userRole}></CompanyInfo>
      </Grid>

      <Grid item xs={12} sm={12} md={5} spacing={3}>
        <TechStack userRole={props.userRole}></TechStack>
      </Grid>
    </Grid>
  );
};

export default Employer;
