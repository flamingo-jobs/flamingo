import { React, useState } from "react";
import { useForm } from "react-hooks-helper";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import cardImage from "../../signIn/images/flamingo.gif";
import logo from "../images/logo.jpg";
import FloatCard from "../../components/FloatCard";
import {
  Chip,
  Container,
  IconButton,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Box,
  Grid,
  Typography,
  CardMedia,
  Snackbar,
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";

import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";

import axios from "axios";
import BACKEND_URL from "../../Config";

const jwt = require("jsonwebtoken");

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

const useStyles = makeStyles((theme) => ({
  root: {},
  container: {
    paddingTop: "6vh",
    paddingBottom: "6vh",
    minHeight: "100vh",
  },
  overlay: {
    minHeight: "100vh",
  },
  background: {
    backgroundColor: theme.palette.flamingo,
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
    margin: " 5% 35% 10% 35%",
    borderRadius: 25,
    padding: "10px 5px 10px 5px",
    "&:hover": {
      backgroundColor: theme.palette.tuftsBlue,
      color: "white",
      boxShadow: "none",
    },
  },
  media: {
    height: "80vh",
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
  },
  animation: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  return: {
    alignSelf: "self-start",
  },
}));

export default function SignInSide() {
  // Form data register
  const defaultData = {
    email: "",
    password: "",
  };
  const [formData, setForm] = useForm(defaultData);
  const [remember, setRemember] = useState(false);
  const handleRemember = () => setRemember(!remember);

  const login = (e) => {
    e.preventDefault();

    const loginData = {
      email: formData.email,
      password: formData.password,
    };

    axios
      .post(`${BACKEND_URL}/api/signin`, loginData)
      .then((res) => {
        if (res.data.success) {
          if (remember) {
            localStorage.setItem("userToken", res.data.token);
            sessionStorage.setItem("userToken", res.data.token);
          } else {
            sessionStorage.setItem("userToken", res.data.token);
          }
          const header = jwt.decode(res.data.token, { complete: true });
          window.location = "/" + header.payload.userRole;
        } else {
          handleAlert();
        }
      })
      .catch((err) => {
        handleAlert();
      });
  };

  const classes = useStyles();

  // Alert Handler
  const [open, setOpen] = useState(false);
  const handleAlert = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  if (sessionStorage.getItem("userToken")) {
    return <Redirect to="/" />;
  }

  return (
    <div className={classes.background}>
      <Container className={classes.container}>
        <Grid container direction="row" className={classes.root}>
          <CssBaseline />

          {/* Flamingo Animation */}
          <Grid item sm={5} md={7} className={classes.animation}>
            <CardMedia
              className={classes.media}
              image={cardImage}
              alt="image"
            />
          </Grid>

          {/* Login Card */}
          <Grid item xs={12} sm={7} md={5}>
            <FloatCard>
              <div className={classes.paper}>
                {/* Return Back */}
                <Link to="/">
                  <img src={logo} className={classes.logo} />
                </Link>

                {/* Title */}
                <Typography
                  component="h1"
                  variant="h5"
                  className={classes.title}
                >
                  Sign In
                </Typography>

                {/* Social Login */}
                <div className={classes.socialSection}>
                  <Typography className={classes.text}>Use</Typography>
                  <div className={classes.icons}>
                    <IconButton>
                      <Avatar className={classes.avatar}>
                        <FacebookIcon />
                      </Avatar>
                    </IconButton>
                    <IconButton>
                      <Avatar className={classes.avatar}>
                        <LinkedInIcon />
                      </Avatar>
                    </IconButton>
                    <IconButton>
                      <Avatar className={classes.avatar}>
                        <GitHubIcon />
                      </Avatar>
                    </IconButton>
                  </div>
                  <Typography className={classes.text}>Or</Typography>
                </div>

                {/* Login Form */}
                <form className={classes.form} onSubmit={login}>
                  <TextField
                    required
                    name="email"
                    onChange={setForm}
                    value={formData.email}
                    id="outlined-required"
                    label="Email Address"
                    type="email"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                  />
                  <TextField
                    required
                    name="password"
                    onChange={setForm}
                    value={formData.password}
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={remember}
                        color="primary"
                        onClick={handleRemember}
                      />
                    }
                    label="Remember me"
                    style={{ marginTop: "5%" }}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    className={classes.submit}
                  >
                    Sign In
                  </Button>

                  {/* Forgot Password or Register */}
                  <Grid container>
                    <Grid item xs style={{ textAlign: "left" }}>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item style={{ textAlign: "right" }}>
                      <Link href="#" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>

                  <Box mt={5}>
                    <Copyright />
                  </Box>
                </form>
              </div>
            </FloatCard>
          </Grid>
        </Grid>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            Login Failed! Incorrect email address or password!
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
}
