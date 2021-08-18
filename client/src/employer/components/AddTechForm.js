import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import FloatCard from "./FloatCard";
import AddIcon from "@material-ui/icons/Add";
import Lottie from "react-lottie";
import WorkingImage from "../lotties/working.json";
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
    marginBottom: -40,
    marginTop: 20,
    marginLeft: 40,
    marginRight: 20,
  },
  lottie:{
    marginTop: -100,
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

  let loginId;
  let login = false;
  const jwt = require("jsonwebtoken");
  const token = sessionStorage.getItem("userToken");
  const header = jwt.decode(token, { complete: true });
  if (token === null) {
    loginId = props.employerID;
  } else if (header.payload.userRole === "employer") {
    login = true;
    loginId = sessionStorage.getItem("loginId");
  } else {
    loginId = props.employerID;
  }

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

        <Grid item xs={12} style={{marginLeft:15}}>
          <Technologies showEdit={true} login={login} employerId={loginId} />
        </Grid>

        <Grid item className={classes.lottie}>
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
