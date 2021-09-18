import React from "react";
import Lottie from "react-lottie";
import Anim from "./lotties/reached.json";
import { Link } from "react-router-dom";
import { makeStyles, Typography, Grid, Button, Chip } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import FloatCard from "./FloatCard";

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "stretch",
    },
    [theme.breakpoints.down("xs")]: {
      paddingRight: 12,
      paddingLeft: 12,
    },
  },
  button: {
    boxShadow: "none",
    color: theme.palette.white,
    backgroundColor: theme.palette.skyBlueCrayola,
    borderRadius: 25,
    "&:hover": {
      backgroundColor: theme.palette.skyBlueCrayolaHover,
      color: "white",
      boxShadow: "none",
    },
  },
  advertisement: {
    margin: "2em",
  },
  featuresContainer: {
    marginLeft: "10%",
  },
  features: {
    backgroundColor: theme.palette.white,
    float: "left",
    marginLeft: "15%",
  },
  icon: {
    color: theme.palette.darkGreen,
  },
}));

function Reached(props) {
  const classes = useStyles();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Anim,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Grid
      item
      container
      sm={12}
      spacing={3}
      direction="row"
      className={classes.mainGrid}
      alignItems="center"
      align="center"
    >
      <Grid item xs={12}>
        <FloatCard>
          <Grid container style={{ padding: 24 }}>
            <Grid item xs={12}>
              <Lottie options={defaultOptions} height={150} width={150} />
            </Grid>
            <Grid item xs={12} style={{ marginTop: 16 }}>
              <Typography variant="h6">
                Sorry! {props.message ? props.message : ""}
              </Typography>
            </Grid>{" "}
            <Grid item xs={12} style={{ marginTop: 16 }}>
              <div className={classes.advertisement}>
                <Typography>
                  Purchase our premium package for LKR 4990/mo to enjoy
                  unlimited service without interruptions.
                </Typography>
                <Grid
                  container
                  direction="row"
                  className={classes.featuresContainer}
                >
                  <Grid item xs={12} lg={6}>
                    <Chip
                      icon={<CheckCircleIcon className={classes.icon} />}
                      label="Post unlimited jobs"
                      className={classes.features}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Chip
                      icon={<CheckCircleIcon className={classes.icon} />}
                      label="Receive unlimited resumes"
                      className={classes.features}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Chip
                      icon={<CheckCircleIcon className={classes.icon} />}
                      label="Applicant Tracking"
                      className={classes.features}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Chip
                      icon={<CheckCircleIcon className={classes.icon} />}
                      label="Unlimited users"
                      className={classes.features}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Chip
                      icon={<CheckCircleIcon className={classes.icon} />}
                      label="Job Specific Resume Shortlisting"
                      className={classes.features}
                    />
                  </Grid>
                </Grid>
                <Link to="/employer/payment/premium">
                  <Button className={classes.button}>Get Started</Button>
                </Link>
              </div>
              <Typography variant="caption">
                If you think this is a mistake, please contact our support
                center.
              </Typography>
            </Grid>
          </Grid>
        </FloatCard>
      </Grid>
    </Grid>
  );
}

export default Reached;
