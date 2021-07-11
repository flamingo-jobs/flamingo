import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  CardMedia,
  Link,
  Chip,
  Box,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import FloatCard from "../../components/FloatCard";
import cardImage from "../../signIn/images/flamingo.gif";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import theme from "../../Theme";
import axios from "axios";
import BACKEND_URL from "../../Config";

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
  error: { color: theme.palette.red },
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

export const ForgotPassword = () => {
  const classes = useStyles();

  const [emailValue, setEmailValue] = useState("");
  const [errorMessage, setErrorMesssage] = useState("");
  const [success, setSuccess] = useState(false);
  const history = useHistory();
  const onSubmitClicked = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${BACKEND_URL}/api/forgot-password/${emailValue}`);
      setSuccess(true);
      setTimeout(() => {
        history.push("/signin");
      }, 3000);
    } catch (e) {
      if (e.message.includes("502")) setErrorMesssage("Unregistered User");
      else if (e.message.includes("500")) setErrorMesssage("Email send failed");
      else setErrorMesssage("Server Eror");
    }
  };
  return (
    <div className={classes.root}>
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

          {/* Login Card */}
          <Grid item xs={12} sm={7} md={5} lg={4}>
            <FloatCard>
              <div className={classes.paper}>
                {/* Return Back */}

                <Link to="/signin" className={classes.return}>
                  <Chip
                    clickable
                    icon={<ArrowBackRoundedIcon />}
                    label="Return"
                    style={{ backgroundColor: theme.palette.lightSkyBlue }}
                  />
                </Link>

                {/* Title */}
                <Typography
                  component="h1"
                  variant="h5"
                  className={classes.title}
                >
                  Forgot Password
                </Typography>

                {!success ? (
                  <div>
                    <Typography>
                      Enter your email and we'll send you an email
                    </Typography>
                    {errorMessage && (
                      <div className={classes.error}>{errorMessage}</div>
                    )}
                    <form className={classes.form} onSubmit={onSubmitClicked}>
                      <TextField
                        required
                        name="email"
                        onChange={(e) => setEmailValue(e.target.value)}
                        value={emailValue}
                        id="outlined-required"
                        label="Email Address"
                        type="email"
                        variant="outlined"
                        fullWidth
                        className={classes.textField}
                      />
                      <Button disabled={!emailValue} type="submit">
                        Send Reset Link
                      </Button>
                      <Box mt={5} />
                    </form>
                  </div>
                ) : (
                  <div>
                    <h2>Success</h2>
                    <p>Check email for reset link. Redirecting you to login</p>
                  </div>
                )}
              </div>
            </FloatCard>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
