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
import BillingPackageCard from "./components/BillingPackageCard";
import FloatCard from "./components/FloatCard";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundSize: "cover",
    // minHeight: "100vh",
    marginLeft: 10, 
    marginRight: 10, 
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

const Billing = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FloatCard>
        {/* <Grid container xs={12} direction="row" spacing={1}>
          <Grid item xs={12}> */}
            <BillingPackageCard></BillingPackageCard>
          {/* </Grid>
        </Grid> */}
      </FloatCard>

    </div>
  );
};

export default Billing;
