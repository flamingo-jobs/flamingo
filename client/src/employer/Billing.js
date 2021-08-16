import React from "react";
import theme from "../Theme";
import { makeStyles, Grid, Card, Typography } from "@material-ui/core";
import BillingPackageCard from "./components/BillingPackageCard";
import Payment from "./components/Payment";
import NoAccess from "../components/NoAccess";
import FloatCard from "../components/FloatCard";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const jwt = require("jsonwebtoken");

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundSize: "cover",
    marginLeft: 10,
    marginRight: 10,
  },
  container: {
    paddingTop: 20,
    [theme.breakpoints.down("xs")]: {
      paddingTop: 0,
    },
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
  paymentBox: { color: "white" },
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

const PaymentSection = () => {
  const classes = useStyles();
  return (
    <Grid
      item
      container
      className={classes.mainGrid}
      sm={12}
      direction="row"
      alignItems="center"
    >
      <Grid item md={6}></Grid>
      <Grid item md={6}>
        <FloatCard backColor="#6772e5">
          <Grid
            item
            container
            sm={12}
            direction="row"
            alignItems="center"
          >
            <Grid item xs={12}>
              <Typography className={classes.paymentBox} variant="h5">
                Powered by
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Payment />
            </Grid>
          </Grid>
        </FloatCard>
      </Grid>
    </Grid>
  );
};

const Billing = () => {
  const classes = useStyles();

  return (
    <Grid
      item
      container
      sm={12}
      spacing={3}
      direction="row"
      className={classes.mainGrid}
      alignItems="center"
      justify="center"
    >
      <Grid item xs={12}>
        <FloatCard>
          <div className={classes.root}>
            {haveAccess ? <BillingPackageCard /> : <NoAccess />}
          </div>
        </FloatCard>
      </Grid>
    </Grid>
  );
};

export default Billing;
