import React from "react";
import {
  makeStyles,
} from "@material-ui/core";
import BillingPackageCard from "./components/BillingPackageCard";
import NoAccess from "../components/NoAccess";
const jwt = require("jsonwebtoken");

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

let haveAccess = false;

if (sessionStorage.getItem("userToken")) {
  var accessTokens = jwt.decode(sessionStorage.getItem("userToken"), {
    complete: true,
  }).payload.accessTokens;
  if (accessTokens.includes("all") || accessTokens.includes("billing")) {
    haveAccess = true;
  }
}

const Billing = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <FloatCard> */}
      {/* <Grid container xs={12} direction="row" spacing={1}>
          <Grid item xs={12}> */}
      {haveAccess ? <BillingPackageCard /> : <NoAccess/>}
      {/* </Grid>
        </Grid> */}
      {/* </FloatCard> */}
    </div>
  );
};

export default Billing;
