import { React, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Container,
  CardMedia,
  Link,
  Grid,
  TextField,
  Button,
  Box,
} from "@material-ui/core";
import SnackBarAlert from "../../components/SnackBarAlert";
import cardImage from "../../signIn/images/flamingo.gif";
import FloatCard from "../../components/FloatCard";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import BACKEND_URL from "../../Config";
import { PasswordResetFailure } from "./PasswordResetFailure";
import { PasswordResetSuccess } from "./PasswordResetSuccess";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="">
        Flamingo
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const passwordRegexp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#6fbada",
    minHeight: "100vh",
    backgroundSize: "cover",
  },
  container: {
    display: "flex",
    width: "100%",
    margin: "0 auto",
    padding: 10,
    paddingLeft: 40,
    paddingRight: 40,
    minHeight: "100vh",
    [theme.breakpoints.down("xs")]: {
      paddingLeft: 8,
      paddingRight: 8,
    },
  },
  overlay: {
    // minHeight: "100vh",
  },
  background: {
    backgroundColor: theme.palette.lightSkyBlue,
    backgroundSize: "cover",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
  },
  avatar: {
    backgroundColor: theme.palette.lightSkyBlue,
    color: theme.palette.stateBlue,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: 20,
    display: "contents",
  },
  submit: {
    width: "30%",
    boxShadow: "none",
    color: theme.palette.white,
    backgroundColor: theme.palette.skyBlueCrayola,
    margin: " 5% 35% 5% 35%",
    borderRadius: 25,
    padding: "10px 5px 10px 5px",
    "&:hover": {
      backgroundColor: theme.palette.skyBlueCrayolaHover,
      color: "white",
      boxShadow: "none",
    },
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  media: {
    height: "60vh",
    backgroundSize: "contain",
  },
  logo: {
    height: 40,
  },
  textField: {
    margin: 10,
    width: 300,
    [theme.breakpoints.down("xs")]: {
      width: 250,
    },
    "& fieldset": {
      borderColor: theme.palette.tuftsBlue,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.pinkyRed + " !important",
    },
  },
  title: {
    marginBottom: 20,
    fontWeight: 500,
  },
  link: {
    cursor: "pointer",
  },
  animation: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  return: {
    alignSelf: "end",
  },
  forgotPwd: {
    textAlign: "left",
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
      marginBottom: 15,
    },
  },
  signUp: {
    textAlign: "right",
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
    },
  },
}));

export const AcceptInvitation = () => {
  const classes = useStyles();

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

  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");

  const { passwordResetCode } = useParams();

  const badPassword = (password) => {
    if (!passwordRegexp.test(password)) {
      return true;
    }
  };

  const onResetClicked = async (e) => {
    e.preventDefault();
    if (badPassword(passwordValue)) {
      setAlertData({
        severity: "error",
        msg: "Please make an stronger password! Your password must contain minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character",
      });
      handleAlert();
    } else {
      try {
        await axios.put(
          `${BACKEND_URL}/api/reset-password/${passwordResetCode}`,
          { newPassword: passwordValue }
        );
        setIsSuccess(true);
      } catch (err) {
        setIsFailure(true);
        console.log(err);
      }
    }
  };

  if (isSuccess) return <PasswordResetSuccess />;
  if (isFailure) return <PasswordResetFailure />;

  return (
    <div className={classes.root}>
      {displayAlert()}
      <Container maxWidth={false} className={classes.container}>
        <Grid
          item
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <CssBaseline />

          {/* Flamingo Animation */}
          <Grid item sm={5} md={5} lg={5} className={classes.animation}>
            <CardMedia
              className={classes.media}
              image={cardImage}
              alt="image"
            />
          </Grid>

          {/* Reset Password Card */}
          <Grid item xs={12} sm={7} md={5} lg={4}>
            <FloatCard>
              <div className={classes.paper}>
                {/* Title */}
                <Typography
                  component="h1"
                  variant="h5"
                  className={classes.title}
                >
                  Accept Invitation
                </Typography>
                <Grid
                  container
                  direction="row"
                  justify="left"
                  alignItems="left"
                >
                  <Grid item sm={12}>
                    Create a new password to activate your account!
                    <Typography variant="caption" display="block">
                      Please make sure that your password contains at least,
                    
                        <li>8 characters</li>
                        <li>1 uppercase letter</li>
                        <li>1 lowercase letter</li>
                        <li>1 number and 1 special character</li>
                    </Typography>
                  </Grid>
                </Grid>
                <Box mt={3} />
                {/* Login Form */}
                <form className={classes.form} onSubmit={onResetClicked}>
                  <TextField
                    required
                    name="password"
                    id="outlined-password-input"
                    label="Password"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                    type="password"
                    value={passwordValue}
                    onChange={(e) => setPasswordValue(e.target.value)}
                  />
                  <TextField
                    required
                    name="confirmPassword"
                    id="outlined-password-input"
                    label="Confirm Password"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                    type="password"
                    value={confirmPasswordValue}
                    onChange={(e) => setConfirmPasswordValue(e.target.value)}
                  />
                  <Button
                    disabled={
                      !passwordValue ||
                      !confirmPasswordValue ||
                      passwordValue !== confirmPasswordValue
                    }
                    type="submit"
                    fullWidth
                    variant="contained"
                    className={classes.submit}
                  >
                    Activate
                  </Button>
                  <Box mt={3}>
                    <Copyright />
                  </Box>
                </form>
              </div>
            </FloatCard>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
