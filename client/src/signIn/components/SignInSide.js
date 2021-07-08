
import { React, useState, forwardRef } from "react";
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
  Slide,
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import { Link } from 'react-router-dom'
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
  root: {
    backgroundColor: "#6fbada",
    minHeight: '100vh',
    backgroundSize: 'cover',
  },
  container: {
    display: 'flex',
    width: '100%',
    margin: '0 auto',
    padding: 10,
    paddingLeft: 40,
    paddingRight: 40,
    minHeight: '100vh',
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
    backgroundSize: 'contain'
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
    fontWeight: 500
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
    textAlign: 'left',
    [theme.breakpoints.down("xs")]: {
      textAlign: 'center',
      marginBottom: 15
    },
  },
  signUp: {
    textAlign: 'right',
    [theme.breakpoints.down("xs")]: {
      textAlign: 'center',
    },

  }
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
          window.location = "/";
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

  const [choice, setChoice] = useState(false);
  const handleClickChoice = () => {
    setChoice(true);
  };
  const handleCloseChoice = () => {
    setChoice(false);
  };
  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
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
      <Container maxWidth={false} className={classes.container}>
        <Grid item container direction="row"
          justify="center"
          alignItems="center">
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
                    style={{ backgroundColor: theme.palette.lightSkyBlue, }}
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

                {/* Social Login */}
                <div className={classes.socialSection}>
                  <Typography className={classes.text}>with</Typography>
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
                  <Typography className={classes.text}>or</Typography>
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
                      <Link className={classes.link}>Forgot password?</Link>
                    </Grid>
                    <Grid item xs={12} sm={8} className={classes.signUp}>
                      <Link className={classes.link} onClick={handleClickChoice}>
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
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            Login Failed! Incorrect email address or password!
          </Alert>
        </Snackbar>
        <Dialog
          onClose={handleCloseChoice}
          aria-labelledby="customized-dialog-title"
          open={choice}
        >
          <DialogTitle id="customized-dialog-title" onClose={handleCloseChoice}>
            Sign up as
          </DialogTitle>
          <DialogContent dividers>
            <Grid container direction="row">
              <Grid item xs={12} md={6}>
                <ListItem
                  button
                  onClick={() => {
                    window.location = "/getHired";
                  }}
                >
                  <Box mt={5} mb={5} ml={10} mr={10}>
                    <Typography>JobSeeker</Typography>
                  </Box>
                </ListItem>
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
  );
}
