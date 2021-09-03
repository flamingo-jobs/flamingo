import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import FloatCard from '../../components/FloatCard';
import Lottie from "react-lottie";
import WorkingImage from "../lotties/working.json";
import TechnologiesStackEdit from "./TechnologiesStackEdit";

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
    marginTop: -200,
    marginLeft: 380,
  },
  comboBox: {
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 0,
  },
  lottie: {
    marginTop: 100,
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
    <Grid
      container
      direction="column"
      xs={12}
      spacing={3}
      style={{ marginRight: -10 }}
    >
      <FloatCard>
        <Grid container direction="row">
          <Grid item container direction="column" xs={7}>

            <Grid item style={{ marginLeft: 15 }}>
              <TechnologiesStackEdit
                showEdit={true}
                login={login}
                employerId={loginId}
              />
            </Grid>
          </Grid>

          <Grid item container xs={5} className={classes.lottie}>
            <Grid item>
              {/* <ComputerIcon className={classes.notificationsIcon} /> */}
            </Grid>
            <Grid item>
              <Lottie
                className={classes.lottie}
                options={defaultOptions}
                height={"inherit"}
                width={"inherit"}
              />
            </Grid>
          </Grid>
        </Grid>
      </FloatCard>
    </Grid>
  );
};

export default AddTechForm;
