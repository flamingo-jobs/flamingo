import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Loading from "../../components/Loading";
import SnackBarAlert from "../../components/SnackBarAlert";
import Lottie from "react-lottie";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import BillingImage from "../lotties/billingImage";
import PackageDetails from "./PackageDetails";
import axios from "axios";
import BACKEND_URL from "../../Config";

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.grey,
    marginBottom: 10,
  },
  price: {
    color: theme.palette.stateBlue,
    marginBottom: 20,
  },
  features: {
    backgroundColor: theme.palette.white,
    float: "left",
    marginLeft: "18%",
  },
  icon: {
    color: theme.palette.darkGreen,
  },
  cancelIcon: {
    color: theme.palette.lightRed,
  },
  featuresContainer: {
    //marginBottom: "70%",
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
  topCard: {
    minWidth: "100%",
    borderRadius: 12,
    boxShadow: "rgba(83, 144, 217, 0.1) 0px 4px 12px",
    overflow: "unset",
    marginBottom: 24,
  },
  topCardContent: {
    padding: 20,
    justifyContent: "center",
    display: "grid",
    justifyItems: "center",
  },
  topCardText: {
    alignSelf: "center",
    padding: "20px !important",
  },
  topCardTitle: {
    fontWeight: "bolder",
    color: theme.palette.stateBlue,
    marginBottom: 20,
  },
  topCardTextBody: {
    color: theme.palette.black,
    marginBottom: 20,
  },
  lottie: {
    height: 200,
    [theme.breakpoints.down("xs")]: {
      width: 300,
    },
  },
}));

export default function BillingPackageCard() {
  const classes = useStyles();
  
  const [packagesList, setPackageList] = useState();
  const retrievePackages = () => {
    axios
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
  useEffect(() => {
    retrievePackages();
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: BillingImage,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
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
      <Grid item xs={12} spacing={3}>
        {displayAlert()}
        <Card className={classes.topCard}>
          <CardContent className={classes.topCardContent}>
            <Grid
              container
              direction="row"
              spacing={3}
              justify="space-between"
              alignItems="center"
              style={{ maxWidth: "100%" }}
            >
              <Grid item xs={11} md={9} className={classes.topCardText}>
                <Typography variant="h4" className={classes.topCardTitle}>
                  With Flamingo, you can advance your recruitment process like
                  never before!
                </Typography>

                <Typography variant="body1" className={classes.topCardTextBody}>
                  <Box fontWeight={400} fontSize={16} m={1}>
                    Flamingo goes few steps further from a typical job portal
                    and brings a novel recruitment experience for the Sri Lankan
                    IT industry by making use of cutting edge technology.
                    Upgrade your account today to experience advanced features!
                  </Box>
                </Typography>
              </Grid>
              <Grid item xs={11} md={3}>
                <Lottie
                  className={classes.lottie}
                  options={defaultOptions}
                  height={"inherit"}
                  width={"inherit"}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      {packagesList ? <PackageDetails info={packagesList} /> : <Loading />}
    </>
  );
}
