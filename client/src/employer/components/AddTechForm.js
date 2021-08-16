import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import FloatCard from "./FloatCard";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { useState, useEffect } from "react";
import axios from "axios";
import BACKEND_URL from "../../Config";
import Lottie from "react-lottie";
import WorkingImage from "../lotties/working.json";
import theme from "../../Theme";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import Technologies from "./Technologies";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundSize: "cover",
  },
  title: {
    fontWeight: "bolder",
    color: theme.palette.stateBlue,
    float: "left",
    marginLeft: 10,
  },
  notificationsIcon: {
    color: theme.palette.stateBlue,
    marginTop: 5,
    marginLeft: 150,
  },
  comboBox: {
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 40,
    marginRight: 20,
  },
  button: {
    backgroundColor: theme.palette.blueJeans,
    color: "white",
    borderRadius: 25,
    paddingLeft: 20,
    paddingRight: 20,
    "&:hover": {
      backgroundColor: theme.palette.blueJeansHover,
      color: "white",
    }, 
  },
}));

const AddTechForm = (props) => {
  const [value, setValue] = React.useState(2);

  const classes = useStyles();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: WorkingImage,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Grid container direction="column" xs={12} spacing={3}>
      <FloatCard>
        <Grid item className={classes.comboBox}>
          <Typography variant="h6" className={classes.title}>
            Add Technologies
          </Typography>
          <AddIcon className={classes.notificationsIcon} />
        </Grid>

        <Grid item xs={12}>
          <Technologies jobseekerID={"60c246913542f942e4c84454"} />
        </Grid>



        <Grid item className={classes.comboBox}>
          <Lottie
            className={classes.lottie}
            options={defaultOptions}
            height={"inherit"}
            width={"inherit"}
          />
        </Grid>
      </FloatCard>
    </Grid>
  );
};

export default AddTechForm;
