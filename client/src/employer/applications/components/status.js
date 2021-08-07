import React from "react";
import Lottie from "react-lottie";
import { Typography } from "@material-ui/core";
import Hourglass from "../lotties/hourglass.json";
import List from "../lotties/list.json";
import Check from "../lotties/check.json";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  resumeStatus: {
    borderRadius: 12,
    padding: 10,
    paddingLeft: "50px",
    paddingRight: "50px",
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

const Status = (props) => {
  const classes = useStyles();

  const pendingOptions = {
    loop: true,
    autoplay: true,
    animationData: Hourglass,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const shortlistedOptions = {
    loop: true,
    autoplay: true,
    animationData: List,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const selectedOptions = {
    loop: true,
    autoplay: true,
    animationData: Check,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className={classes.resumeStatus}>
      <div className={classes.animation}>
        {props.status === "pending" && (
          <Lottie
            className={classes.lottie}
            options={pendingOptions}
            height="20px"
            width="20px"
          />
        )}
        {props.status === "shortlisted" && (
          <Lottie
            className={classes.lottie}
            options={shortlistedOptions}
            height="30px"
            width="30px"
          />
        )}
        {/* {props.status === "rejected" && (
          <Lottie
            className={classes.lottie}
            options={selectedOptions}
            height="30px"
            width="30px"
          />
        )} */}
      </div>

      <div className={classes.statusText}>
        <Typography>{props.text}</Typography>
      </div>
    </div>
  );
};

export default Status;
