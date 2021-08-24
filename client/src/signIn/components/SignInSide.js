import { React, useState, useEffect } from "react";
import { useForm } from "react-hooks-helper";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import theme from "../../Theme";
import backgroundImage from "../images/background.jpg";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import cardImage from "../../signIn/images/flamingo.gif";
import FloatCard from "../../components/FloatCard";
import {
  Chip,
  Container,
  IconButton,
  CardMedia,
  Snackbar,
  Dialog,
  ListItem,
} from "@material-ui/core";
import { Redirect, useHistory } from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import GoogleIcon from "../images/google.png";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import { Link } from "react-router-dom";
import { useQueryParams } from "../../utils/useQueryparams";
import { useToken } from "./useToken";
import axios from "axios";
import BACKEND_URL from "../../Config";

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
  root: {
    background: `url(${backgroundImage}) no-repeat`,
    backgroundAttachment: "fixed",
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
    backgroundColor: "rgba(157, 221, 249, 0.705)",
    minHeight: "100vh",
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
  iconLogo: {
    height: 25,
    width: 25,
    marginRight: 20,
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

export default function SignInSide() {
  // Form data register
  const defaultData = {
    email: "",
    password: "",
  };
  const [formData, setForm] = useForm(defaultData);
  const [remember, setRemember] = useState(false);
  const handleRemember = () => setRemember(!remember);

  const [googleOauthUrl, setGoogleOauthUrl] = useState("");
  const { token, loginId, error } = useQueryParams();

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
            localStorage.setItem("loginId", res.data.loginId);
          }
          sessionStorage.setItem("userToken", res.data.token);
          sessionStorage.setItem("loginId", res.data.loginId);
          const jwt = require("jsonwebtoken");
          const token = sessionStorage.getItem("userToken");
          const header = jwt.decode(token, { complete: true });
          if (header.payload.userRole === "jobseeker") {
            const urlQuery = new URLSearchParams(window.location.search);
            const redirect = urlQuery.get("redirectTo");
            if (redirect) {
              window.location = `/jobDescription/${redirect}#applyJob`;
            } else {
              window.location = "/jobseeker/dashboard";
            }
          } else if (header.payload.userRole === "employer") {
            window.location = "/employer/dashboard";
          } else if (header.payload.userRole === "admin") {
            window.location = "/admin/dashboard";
          } else {
            handleCredentialError();
          }
        }
      })
      .catch((err) => {
        console.log(err.message);
        if (err.message === "Network Error") handleServerError();
        else handleCredentialError();
      });
  };

  useEffect(() => {
    if (token) {
      sessionStorage.setItem("userToken", token);
      sessionStorage.setItem("loginId", loginId);
      window.location = "/";
    }
    if (error) {
      handleUserError();
    }
  }, [token, loginId, error]);

  useEffect(() => {
    const loadOauthUrl = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/google/url`);
        const { url } = response.data;
        setGoogleOauthUrl(url);
      } catch (e) {
        handleServerError();
      }
    };
    loadOauthUrl();
  }, []);

  const classes = useStyles();

  // Alert Handler
  const [credentialError, setCredentialError] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [userError, setUserError] = useState(false);
  const handleCredentialError = () => {
    setCredentialError(true);
  };
  const handleServerError = () => {
    setServerError(true);
  };
  const handleUserError = () => {
    setUserError(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setCredentialError(false);
    setServerError(false);
  };
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const [choice, setChoice] = useState(false);
  const handleClickChoice = () => {
    setChoice(true);
  };
  const handleCloseChoice = () => {
    setChoice(false);
  };
  const DialogTitle = withStyles(classes)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
      </MuiDialogTitle>
    );
  });
  const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);

  const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);

  if (sessionStorage.getItem("userToken")) {
    return <Redirect to="/" />;
  }

  return (
    <div className={classes.root}>
      <div className={classes.overlay}>
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

                  <Link to="/" className={classes.return}>
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
                    Sign In
                  </Typography>
                  <div className={classes.socialSection}>
                    <Grid className={classes.paper}>
                      <Button
                        disable={!googleOauthUrl}
                        onClick={() => {
                          window.location.href = googleOauthUrl;
                        }}
                      >
                        <Avatar
                          className={classes.iconLogo}
                          src={GoogleIcon}
                          variant="square"
                        />
                        <Typography>
                          {" "}
                          Sign In with Google
                        </Typography>
                      </Button>
                    </Grid>
                    <Typography className={classes.text} style={{ marginBottom: 16 }}>or</Typography>

                    {/* Social Login */}

                    {/* <div className={classes.icons}>
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
                    </div> */}
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
                      <Grid item xs={12} sm={4} className={classes.forgotPwd}>
                        <Link to="/forgot-password" className={classes.link}>
                          Forgot password?
                        </Link>
                      </Grid>
                      <Grid item xs={12} sm={8} className={classes.signUp}>
                        <Link
                          className={classes.link}
                          onClick={handleClickChoice}
                        >
                          Don't have an account? Sign Up
                        </Link>
                      </Grid>
                    </Grid>

                    <Box mt={3}>
                      <Copyright />
                    </Box>
                  </form>
                </div>
              </FloatCard>
            </Grid>
          </Grid>

          <Snackbar
            open={credentialError}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="error">
              Login Failed! Incorrect email address or password!
            </Alert>
          </Snackbar>

          <Snackbar
            open={serverError}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="error">
              Server Error! We can't connect to the server right now. Please try
              again later!
            </Alert>
          </Snackbar>

          <Snackbar
            open={userError}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="warning">
              Looks like you are not an registered user. Please create an
              account using signup!
            </Alert>
          </Snackbar>

          <Dialog
            onClose={handleCloseChoice}
            aria-labelledby="customized-dialog-title"
            open={choice}
          >
            <DialogTitle
              id="customized-dialog-title"
              onClose={handleCloseChoice}
            >
              Sign up as
            </DialogTitle>
            <DialogContent dividers>
              <Grid container direction="row">
                <Grid item xs={12} md={6}>
                  <Link to="/getHired">
                    <ListItem button>
                      <Box mt={5} mb={5} ml={10} mr={10}>
                        <Typography>JobSeeker</Typography>
                      </Box>
                    </ListItem>
                  </Link>
                </Grid>
                <Grid item xs={12} md={6}>
                  <ListItem
                    button
                    onClick={() => {
                      window.location = "/startHiring";
                    }}
                  >
                    <Box mt={5} mb={5} ml={10} mr={10}>
                      <Typography>Employer</Typography>
                    </Box>
                  </ListItem>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleCloseChoice} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </div>
    </div>
  );
}
