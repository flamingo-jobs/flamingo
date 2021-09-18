import { Grid, makeStyles, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useState, useEffect } from "react";
import FloatCard from "../components/FloatCard";
import NoAccess from "../components/NoAccess";
import Loading from "../components/Loading";
import BillingPackageCard from "./components/BillingPackageCard";
import BillingDetails from "./components/BillingDetails";
import Payment from "./components/Payment";
import BACKEND_URL from "../Config";
const jwt = require("jsonwebtoken");

const useStyles = makeStyles((theme) => ({
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
          <Grid item container sm={12} direction="row" alignItems="center">
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
  const [subscribedPackage, setSubscribedPackage] = useState("");
  const loginId = sessionStorage.getItem("loginId");
  useEffect(() => {
    axios.get(`${BACKEND_URL}/employers/${loginId}`).then((res) => {
      if (res.data.success) {
        setSubscribedPackage(res.data.employer.subscription.type);
      }
    });
  }, []);

  return (
    <Grid item container xs={12} spacing={3} direction="row"
      justify="space-between"
      alignItems="flex-start" className={classes.mainGrid}>
      <Grid item xs={12} className={classes.searchGrid}>
        <div className={classes.root}>
          {haveAccess ? (
            subscribedPackage ? (
              subscribedPackage === "Basic" ? (
                <BillingPackageCard />
              ) : (
                <BillingDetails info={subscribedPackage} />
              )
            ) : (
              <Loading />
            )
          ) : (
            <NoAccess />
          )}
        </div>
      </Grid>
    </Grid>
  );
};

export default Billing;
