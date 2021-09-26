import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FloatCard from "../../components/FloatCard";
import Lottie from "react-lottie";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import BillingImage from "../lotties/billingImage.json";
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
  mainGrid: {
    paddingLeft: 12,
    paddingRight: 12,
    [theme.breakpoints.down("xs")]: {
      paddingRight: 12,
      paddingLeft: 20,
      paddingBottom: 12,
    },
  },
}));

function PackageList(props) {
  const classes = useStyles();
  return (
    <Grid container spacing={3}>
      {props.info.map((subscription, index) => {
        return (
          <Grid item xs={12} lg={4} key={index}>
            <FloatCard className={classes.root}>
              <Typography variant="h4" gutterBottom>
                <Box
                  fontWeight={400}
                  fontSize={20}
                  m={1}
                  className={classes.title}
                >
                  {subscription.type.toUpperCase()}
                </Box>

                <Box
                  fontWeight={800}
                  fontSize={30}
                  m={1}
                  className={classes.price}
                >
                  {subscription.price === 0
                    ? "FREE"
                    : "LKR" + subscription.price + "/mo"}
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

              <Grid
                container
                direction="column"
                className={classes.featuresContainer}
              >
                <Grid item xs={12}>
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
                </Grid>
                <Grid item xs={12}>
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
                </Grid>
                <Grid item xs={12}>
                  <Chip
                    icon={
                      subscription.applicantFiltering ? (
                        <CheckCircleIcon className={classes.icon} />
                      ) : (
                        <CancelIcon className={classes.cancelIcon} />
                      )
                    }
                    label="Applicant filtering"
                    className={classes.features}
                  />
                </Grid>
                <Grid item xs={12}>
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
                </Grid>
                <Grid item xs={12}>
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
                </Grid>
              </Grid>
              <br />
              <br />
            </FloatCard>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default PackageList;
