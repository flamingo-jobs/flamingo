import { Avatar, Box } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import React, { useEffect, useState } from "react";
import FloatCard from "../../components/FloatCard";
import payhereLogo from "./images/PayHere-Logo.png";
import PayHereCheckoutForm from "./PayHereCheckoutForm";
import BACKEND_URL from "../../Config";
import axios from "axios";
import Loading from "../../components/Loading";
import SnackBarAlert from "../../components/SnackBarAlert";

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

export default function Payment() {
  const classes = useStyles();
  const [packagesList, setPackageList] = useState();
  const retrievePackages = async () => {
    await axios
      .get(`${BACKEND_URL}/subscriptions`)
      .then((res) => {
        if (res.data.success) {
          setPackageList(res.data.existingData);
        }
      })
      .catch((err) => {
        if (err) {
          setAlertData({
            severity: "error",
            msg: "Failed to connect to server. Please come back later!",
          });
          handleAlert();
        }
      });
  };

  const [subscription, setSubscription] = useState({});
  const [nextDates, setNextDates] = useState();

  useEffect(() => {
    retrievePackages();
    getNextDays();
  }, []);

  useEffect(() => {
    const selectedPackage = window.location.pathname.split("/")[3];
    setSubscription(
      packagesList?.find((item) => {
        return item.type.toLowerCase() === selectedPackage.toLowerCase();
      })
    );
  }, [window.location.pathname, packagesList]);

  const getNextDays = () => {
    axios
      .get(`${BACKEND_URL}/get-next-dates/${sessionStorage.getItem("loginId")}`)
      .then((res) => {
        if (res.data.success) {
          setNextDates(res.data.nextDates);
        }
      })
      .catch((err) => {
        if (err) {
          setNextDates(undefined);
        }
      });
  };

  // Alert stuff
  const [alertShow, setAlertShow] = useState(false);
  const [alertData, setAlertData] = useState({ severity: "", msg: "" });
  const displayAlert = () => {
    return (
      <SnackBarAlert
        open={alertShow}
        onClose={handleAlertClose}
        severity={alertData.severity}
        msg={alertData.msg}
      />
    );
  };
  const handleAlert = () => {
    setAlertShow(true);
  };
  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertShow(false);
  };

  return (
    <>
      {displayAlert()}

      {/* PAYMENT DETAILS */}
      {subscription ? (
        <Grid
          container
          sm={12}
          spacing={3}
          direction="row"
          alignItems="flex-start"
        >
          <Grid item container xs={12} lg={8}>
            <FloatCard className={classes.root}>
              <Typography variant="h4" gutterBottom>
                <Box
                  fontWeight={400}
                  fontSize={20}
                  m={1}
                  className={classes.title}
                >
                  {subscription.type}
                </Box>

                <Box
                  fontWeight={800}
                  fontSize={30}
                  m={1}
                  className={classes.price}
                >
                  LKR {subscription.price}/mo
                </Box>
                <Box
                  fontWeight={400}
                  fontSize={12}
                  m={1}
                  className={classes.annual}
                >
                  {subscription.description}
                </Box>
                <Divider variant="middle" />
              </Typography>
              <div className={classes.featuresContainer}>
                <Chip
                  icon={<CheckCircleIcon className={classes.icon} />}
                  label={
                    "Post " +
                    (subscription.maxJobs > 0
                      ? "upto " + subscription.maxJobs
                      : "unlimited") +
                    " jobs"
                  }
                  className={classes.features}
                />
                <Chip
                  icon={<CheckCircleIcon className={classes.icon} />}
                  label={
                    "Receive " +
                    (subscription.maxResumes > 0
                      ? "upto " + subscription.maxResumes
                      : "unlimited") +
                    " resumes"
                  }
                  className={classes.features}
                />
                <Chip
                  icon={<CheckCircleIcon className={classes.icon} />}
                  label="Applicant Filtering"
                  className={classes.features}
                />
                <Chip
                  icon={
                    subscription.maxUsers === 1 ? (
                      <CancelIcon className={classes.cancelIcon} />
                    ) : (
                      <CheckCircleIcon className={classes.icon} />
                    )
                  }
                  label={
                    subscription.maxUsers < 2
                      ? subscription.maxUsers < 0
                        ? "Unlimited users"
                        : "Multi User Access"
                      : "Upto " + subscription.maxUsers + " users"
                  }
                  className={classes.features}
                />
                <Chip
                  icon={
                    subscription.customizedShortlisting ||
                    subscription.jobSpecificShortlisting ? (
                      <CheckCircleIcon className={classes.icon} />
                    ) : (
                      <CancelIcon className={classes.cancelIcon} />
                    )
                  }
                  label={
                    subscription.jobSpecificShortlisting
                      ? "Job specific resume shortlisting"
                      : "Customized resume shortlisting"
                  }
                  className={classes.features}
                />
              </div>

              <Divider variant="middle" />
              <br />
              <Grid
                container
                className={classes.mainGrid}
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
                        direction="row"
                        align="left"
                      >
                        <Grid item xs={8}>
                          <Typography variant="caption">
                            Package: {subscription.type}
                          </Typography>
                        </Grid>
                        <Grid item xs={4} align="right">
                          <Typography variant="caption">
                            LKR {subscription.price}.00
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
                            <b>LKR {subscription.price}.00</b>
                          </Typography>
                        </Grid>
                      </Grid>
                    </FloatCard>
                  </Typography>
                </Grid>
              </Grid>
            </FloatCard>
          </Grid>
          {/* PAYHERE PAYMENT */}
          <Grid item container xs={12} lg={4}>
            <FloatCard className={classes.root}>
              <Typography variant="h4" gutterBottom>
                <Box
                  fontWeight={400}
                  fontSize={20}
                  m={1}
                  className={classes.title}
                >
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

              {nextDates ? (
                <PayHereCheckoutForm info={nextDates} message={subscription} />
              ) : (
                <Loading />
              )}
              <br />
            </FloatCard>
          </Grid>
        </Grid>
      ) : (
        <Loading />
      )}
    </>
  );
}
