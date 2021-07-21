import React from "react";
import Lottie from "react-lottie";
import {Typography } from "@material-ui/core";
import Hourglass from "../lotties/hourglass.json";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  resumeStatus: {
    width: "75%",
    borderRadius: 12,
    padding: 10,
    background: theme.palette.tagYellow,
    // background: "#fae588",
    display: "flex",
    justifyContent: "center",
  },
  animation: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "column",
  },
  lottie: {
    height: "7px",
    [theme.breakpoints.down("xs")]: {
      width: "7px",
    },
  },
  statusText: {
    marginLeft: "10px",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "column",
    color: theme.palette.black,
  },
}));

const Pending = (props) => {
  const classes = useStyles();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Hourglass,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className={classes.resumeStatus}>
      <div className={classes.animation}>
        <Lottie
          className={classes.lottie}
          options={defaultOptions}
          height="20px"
          width="20px"
        />
      </div>

      <div className={classes.statusText}>
        <Typography>Pending ....</Typography>
      </div>
    </div>
  );
};

export default Pending;
