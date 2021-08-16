import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FloatCard from "./FloatCard";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import { Box, Avatar } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import stripeLogo from "./images/stripe-logo-blue.png";
import StripeCheckoutForm from "./StripeCheckoutForm";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    border: `1px solid #5E60CE`,
    borderRadius: 10,
    margin: "30px 10px 30px 10px",
    //background: "linear-gradient(45deg, #64DFDF 30%, #FFFFFF 90%)",
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

export default function BillingPackageCard() {
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
    <Grid container xs={12} spacing={3} direction="row">
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
          <br />
        </FloatCard>
      </Grid>

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
    </Grid>
  );
}
