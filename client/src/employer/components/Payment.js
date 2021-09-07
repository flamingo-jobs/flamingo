import { Avatar, Box } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import React, { useEffect, useState } from "react";
import FloatCard from "../../components/FloatCard";
import payhereLogo from "./images/PayHere-Logo.png";
import PayHereCheckoutForm from "./PayHereCheckoutForm";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    border: `1px solid #5E60CE`,
    borderRadius: 10,
    //background: "linear-gradient(45deg, #64DFDF 30%, #FFFFFF 90%)",
  },
  mainGrid: {
    paddingLeft: 12,
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
  featuresContainer: {
    marginBottom: "17%",
    display: "inline",
  },
  features: {
    backgroundColor: theme.palette.white,
    justifyContent: "left",
    marginLeft: "10%",
    width: "250px",
  },
  icon: {
    color: theme.palette.darkGreen,
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
  { desc: "standard", value: "1990" },
  { desc: "premium", value: "4990" },
];

export default function Payment() {
  const classes = useStyles();

  const [subscription, setSubscription] = useState({});

  useEffect(() => {
    const selectedPackage = window.location.pathname.split("/")[3];
    setSubscription(
      packageList.find((x) => {
        return x.desc === selectedPackage;
      })
    );
  }, [window.location.pathname]);

  const props = { subscription };

  return (
    <Grid container sm={12} spacing={3} direction="row" alignItems="flex-start">
      {/* PAYMENT DETAILS */}
      <Grid item container xs={12} lg={8}>
        <FloatCard className={classes.root}>
          <Typography variant="h4" gutterBottom>
            <Box fontWeight={400} fontSize={20} m={1} className={classes.title}>
              {subscription.desc}
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
          {subscription.desc === "standard" ? (
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
          ) : (
            <div className={classes.featuresContainer}>
              <Chip
                icon={<CheckCircleIcon className={classes.icon} />}
                label="Post any number of jobs"
                className={classes.features}
              />
              <Chip
                icon={<CheckCircleIcon className={classes.icon} />}
                label="Receive any number of resumes"
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
              <Chip
                icon={<CheckCircleIcon className={classes.icon} />}
                label="Advanced Analytics"
                className={classes.features}
              />
            </div>
          )}
          <Divider variant="middle" />
          <br />
          <Grid
            container
            className={classes.mainGrid}
            xs={12}
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
                <FloatCard backColor="#eeeeee">
                  <Grid
                    container
                    className={classes.mainGrid}
                    xs={12}
                    direction="row"
                    align="left"
                  >
                    <Grid item xs={8}>
                      <Typography variant="caption">
                        {subscription.desc === "standard"
                          ? "Standard"
                          : "Premium"}{" "}
                        Package
                      </Typography>
                    </Grid>
                    <Grid item xs={4} align="right">
                      <Typography variant="caption">
                        LKR {subscription.value}.00
                      </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="caption">
                        Remaining Payments
                      </Typography>
                    </Grid>
                    <Grid item xs={4} align="right">
                      <Typography variant="caption">LKR 0.00</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="caption">Discounts</Typography>
                    </Grid>
                    <Grid item xs={4} align="right">
                      <Typography variant="caption">LKR 0.00</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider variant="middle" />
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="caption">
                        <b>Total</b>
                      </Typography>
                    </Grid>
                    <Grid item xs={4} align="right">
                      <Typography variant="caption">
                        <b>LKR {subscription.value}.00</b>
                      </Typography>
                    </Grid>
                  </Grid>
                </FloatCard>
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

          <PayHereCheckoutForm />
          <br />
        </FloatCard>
      </Grid>
    </Grid>
  );
}
