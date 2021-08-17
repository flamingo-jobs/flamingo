import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FloatCard from "./FloatCard";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import { Box, Avatar, TextField } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import stripeLogo from "./images/stripe-logo-blue.png";
import payhereLogo from "./images/PayHere-Logo.png";
import StripeCheckoutForm from "./StripeCheckoutForm";
import PayHereCheckoutForm from "./PayHereCheckoutForm";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    border: `1px solid #5E60CE`,
    borderRadius: 10,
    margin: "30px 10px 30px 10px",
    //background: "linear-gradient(45deg, #64DFDF 30%, #FFFFFF 90%)",
  },
  mainGrid: {
    paddingLeft: 12,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "stretch",
    },
    [theme.breakpoints.down("xs")]: {
      paddingRight: 12,
      paddingLeft: 20,
      paddingBottom: 12,
    },
  },
  title: {
    color: theme.palette.grey,
    marginBottom: 10,
    textTransform: "uppercase",
  },
  price: {
    color: theme.palette.stateBlue,
    marginBottom: 20,
  },
  features: {
    backgroundColor: theme.palette.white,
    float: "left",
    marginLeft: "15%",
  },
  icon: {
    color: theme.palette.darkGreen,
  },
  featuresContainer: {
    marginBottom: "20%",
  },
  annual: {
    color: theme.palette.stateBlue,
    marginTop: -15,
    marginBottom: 20,
  },
  button: {
    backgroundColor: theme.palette.stateBlue,
    color: theme.palette.white,
    "&:hover": {
      backgroundColor: theme.palette.stateBlueHover,
    },
    float: "center",
  },
  firstDivider: {
    marginTop: "12%",
  },
  logo: {
    width: 80,
  },
}));

const packageList = [
  { name: "standard", value: "1990" },
  { name: "premium", value: "4990" },
];

export default function Payment() {
  const classes = useStyles();

  const [subscription, setSubscription] = useState({});

  useEffect(() => {
    const selectedPackage = window.location.pathname.split("/")[3];
    setSubscription(
      packageList.find((x) => {
        return x.name === selectedPackage;
      })
    );
  }, [window.location.pathname]);

  return (
    <Grid container sm={12} spacing={3} direction="row" alignItems="flex-start">
      {/* PAYMENT DETAILS */}
      <Grid item container xs={12} lg={8}>
        <FloatCard className={classes.root}>
          <Typography variant="h4" gutterBottom>
            <Box fontWeight={400} fontSize={20} m={1} className={classes.title}>
              {subscription.name}
            </Box>

            <Box fontWeight={800} fontSize={30} m={1} className={classes.price}>
              LKR {subscription.value}/mo
            </Box>
            <Box
              fontWeight={400}
              fontSize={12}
              m={1}
              className={classes.annual}
            >
              LKR {subscription.value}/mo when billed annually
            </Box>
            <Divider variant="middle" />
          </Typography>

          <div className={classes.featuresContainer}>
            <Chip
              icon={<CheckCircleIcon className={classes.icon} />}
              label="Post upto 25 jobs"
              className={classes.features}
            />
            <Chip
              icon={<CheckCircleIcon className={classes.icon} />}
              label="Receive upto 100 resumes"
              className={classes.features}
            />
            <Chip
              icon={<CheckCircleIcon className={classes.icon} />}
              label="Applicant Tracking"
              className={classes.features}
            />
            <Chip
              icon={<CheckCircleIcon className={classes.icon} />}
              label="Resume Shortlisting"
              className={classes.features}
            />
            <Chip
              icon={<CheckCircleIcon className={classes.icon} />}
              label="Personalized Recommendations"
              className={classes.features}
            />
          </div>
          <Divider variant="middle" />
          <br />
          <Grid
            container
            className={classes.mainGrid}
            sm={12}
            spacing={2}
            direction="row"
            align="left"
          >
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom>
                <Box
                  fontWeight={400}
                  fontSize={20}
                  m={1}
                  className={classes.title}
                >
                  Payment info
                </Box>
              </Typography>
            </Grid>
          </Grid>
        </FloatCard>
      </Grid>

      {/* STRIPR PAYENT 
      <Grid item container xs={12} lg={4}>
        <FloatCard className={classes.root}>
          <Typography variant="h4" gutterBottom>
            <Box fontWeight={400} fontSize={20} m={1} className={classes.title}>
              <center>
                <Avatar
                  className={classes.logo}
                  src={stripeLogo}
                  variant="square"
                />
              </center>
            </Box>

            <Box
              fontWeight={400}
              fontSize={12}
              m={1}
              className={classes.annual}
            >
              Payment infrastructure for the internet
            </Box>
            <Divider variant="middle" />
          </Typography>

          <StripeCheckoutForm subscription={subscription} />
          <br />
        </FloatCard>
      </Grid>
      */}

      {/* PAYHERE PAYMENT */}
      <Grid item container xs={12} lg={4}>
        <FloatCard className={classes.root}>
          <Typography variant="h4" gutterBottom>
            <Box fontWeight={400} fontSize={20} m={1} className={classes.title}>
              <center>
                <Avatar
                  className={classes.logo}
                  src={payhereLogo}
                  variant="square"
                />
              </center>
            </Box>

            <Box
              fontWeight={400}
              fontSize={12}
              m={1}
              className={classes.annual}
            >
              Payment infrastructure for the internet
            </Box>
            <Divider variant="middle" />
          </Typography>

          <PayHereCheckoutForm subscription={subscription} />
          <br />
        </FloatCard>
      </Grid>
    </Grid>
  );
}
