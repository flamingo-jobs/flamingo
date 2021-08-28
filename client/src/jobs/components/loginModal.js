import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Modal,
  Button,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Flamingo from "../lotties/flamingo.json";
import Lottie from "react-lottie";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "800px",
    padding: `0px 30px`,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: 10,
    paddingBottom: "30px",
    maxHeight: "98vh",
    overflowY: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "350px",
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  closeBtnContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    marginTop: theme.spacing(2),
  },
  cardContent: {
    "&:last-child": {
      paddingBottom: "20px !important",
    },
    padding: "20px !important",
    margin: "0px",
  },
  closeButton: {
    width: "20px",
    "&:hover": {
      backgroundColor: "#fff",
    },
    padding: "0px",
  },
  closeIcon: {
    color: "#888",
    "&:hover": {
      color: "#555",
    },
  },
  loginContent: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  text: {
    color: theme.palette.tuftsBlueHover,
    fontSize: "20px",
    fontWeight: 500,
    textAlign: "center",
  },
  signIn: {
    backgroundColor: theme.palette.white,
    color: theme.palette.tuftsBlue,
    border: "2px solid" + theme.palette.tuftsBlue,
    borderRadius: 25,
    paddingLeft: 20,
    paddingRight: 20,
    "&:hover": {
      backgroundColor: theme.palette.tuftsBlueHover,
      color: "white",
    },
  },
  signInBtnContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "30px",
  },
}));

// style={{border: "1px solid red"}}
const LoginModal = (props) => {
  const classes = useStyles();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Flamingo,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        <Card className={classes.root}>
          <CardContent className={classes.cardContent}>
            <Grid container>
              <div className={classes.closeBtnContainer}>
                <IconButton
                  onClick={props.handleClose}
                  className={classes.closeButton}
                >
                  <CloseIcon className={classes.closeIcon} />
                </IconButton>
              </div>
              {/* style={{border: "1px solid red"}} */}
              <Grid container>
                <Grid item xs={12} md={4}>
                  <div className={classes.animation}>
                    <Lottie
                      className={classes.lottie}
                      options={defaultOptions}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} md={8}>
                  <div className={classes.loginContent}>
                    <Typography className={classes.text}>
                      To save a job opportunity for later,
                      <br />
                      You must sign in first.
                    </Typography>
                    <div className={classes.signInBtnContainer}>
                      <Link to="/signin">
                        <Button
                          className={classes.signIn}
                        >
                          Sign In
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Modal>
    </>
  );
};

export default LoginModal;
