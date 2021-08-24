import { React, useState } from "react";
import { useForm } from "react-hooks-helper";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  LinearProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import FloatCard from "../components/FloatCard";
import backgroundImage from "./images/background.jpg";
import SnackBarAlert from "../components/SnackBarAlert";
import axios from "axios";
import BACKEND_URL from "../Config";
import { Link } from "react-router-dom";

const jwt = require("jsonwebtoken");
const passwordRegexp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/;

const useStyles = makeStyles((theme) => ({
  root: {
    background: `url(${backgroundImage}) no-repeat`,
    backgroundAttachment: "fixed",
    minHeight: "100vh",
    backgroundSize: "cover",
  },
  container: {
    width: "auto",
    margin: "0 auto",
    paddingTop: 10,
    paddingBottom: 10,
    minHeight: "100vh",
  },
  overlay: {
    backgroundColor: "rgba(213, 239, 247, 0.605)",
    minHeight: "100vh",
  },
  background: {
    background: `url(${backgroundImage}) no-repeat`,
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
    boxShadow: "none",
    color: theme.palette.white,
    backgroundColor: theme.palette.skyBlueCrayola,
    borderRadius: 25,
    "&:hover": {
      backgroundColor: theme.palette.skyBlueCrayolaHover,
      color: "white",
      boxShadow: "none",
    },
  },
  cancel: {
    boxShadow: "none",
    color: theme.palette.black,
    backgroundColor: theme.palette.white,
    borderRadius: 25,
    "&:hover": {
      backgroundColor: theme.palette.white,
      color: "black",
      boxShadow: "none",
    },
  },
  media: {
    height: "80vh",
  },
  textField: {
    [theme.breakpoints.up("md")]: {
      width: "100%",
    },
    "& fieldset": {
      borderColor: theme.palette.tuftsBlue,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.pinkyRed + " !important",
    },
  },
  title: {
    marginTop: 10,
    fontWeight: 500,
    marginBottom: 5,
  },
  animation: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  return: {
    alignSelf: "self-start",
  },
  jobDetailsContainer: {
    textAlign: "left",
    marginBottom: theme.spacing(4),
  },
  link: {
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.pinkyRed + "!important",
    },
  },
  actions: {
    justifyContent: "flex-end",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  signIn: {
    justifyContent: "flex-start",
    marginRight: 24,
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  mainTitle: {
    fontSize: 36,
    fontWeight: 500,
    marginTop: 20,
  },
  select: {
    "& :focus": {
      backgroundColor: "transparent",
    },
  },
  mainGrid: {
    minHeight: "100vh",
  },
  footer: {
    marginBottom: 10,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      justifyContent: "space-between",
    },
  },
}));

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

const defaultData = {
  firstName: "",
  lastName: "",
  tagline: "",
  description: "",
  street: "",
  city: "",
  mobile: "",
  email: "",
  password: "",
  condirmPassword: "",
};

export default function GetHired() {
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

  const [progress, setProgress] = useState(0);
  /*
    useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prevProgress) =>
          prevProgress >= 100 ? 10 : prevProgress + 10
        );
      }, 800);
      return () => {
        clearInterval(timer);
      };
    }, []);
  */
  const [formData, setForm] = useForm(defaultData);
  const [gender, setGender] = useState("Male");
  const selectGender = (e) => {
    setGender(e.target.value);
  };

  const badPassword = (password) => {
    if (!passwordRegexp.test(password)) {
      return true;
    }
  };

  const createJobSeeker = (e) => {
    setProgress(20);
    e.preventDefault();
    const signupData = {
      name: formData.firstName,
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.confirmPassword,
      role: "jobseeker",
      accessTokens: ["all"],
      dateRegistered: new Date(),
    };
    if (badPassword(formData.password)) {
      setProgress(0);
      setAlertData({
        severity: "error",
        msg: "Please make an stronger password! Your password must contain minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character",
      });
      handleAlert();
    } else {
      if (formData.password === formData.confirmPassword) {
        axios
          .post(`${BACKEND_URL}/api/signup`, signupData)
          .then((res) => {
            if (res.data.success) {
              setProgress(30);
              sessionStorage.setItem("userToken", res.data.token);
              const userId = jwt.decode(res.data.token, { complete: true })
                .payload.userId;
              setProgress(40);
              sendData(userId);
            } else {
              setProgress(0);
              setAlertData({
                severity: "error",
                msg: "Failed to create user account!",
              });
              handleAlert();
            }
          })
          .catch((err) => {
            setProgress(0);
            if (err) {
              setAlertData({
                severity: "error",
                msg: "Failed to connect with server!",
              });
              handleAlert();
            }
          });
      } else {
        setProgress(0);
        setAlertData({
          severity: "error",
          msg: "Please check whether your passwords are matching",
        });
        handleAlert();
      }
    }
  };
  const sendData = (userId) => {
    const jobSeekerData = {
      name: formData.firstName + " " + formData.lastName,
      gender: gender,
      tagline: formData.tagline,
      intro: formData.description,
      dateRegistered: new Date(),
      address: {
        street: formData.street,
        city: formData.city,
      },
      contact: {
        email: formData.email,
        mobile: formData.mobile,
      },
      isPublic: true,
    };
    setProgress(50);
    axios
      .post(`${BACKEND_URL}/jobseeker/create`, jobSeekerData)
      .then((res) => {
        if (res.data.success) {
          setProgress(60);
          handleSuccessLogin(userId, res.data.existingData);
        } else {
          setProgress(0);
          setAlertData({
            severity: "error",
            msg: "Failed to create job seeker account!",
          });
          handleAlert();
        }
      })
      .catch((err) => {
        if (err) {
          setAlertData({
            severity: "error",
            msg: "There is an error with server! Please contact support",
          });
          handleAlert();
        }
      });
  };

  const handleSuccessLogin = (id, loginId) => {
    const linker = { id: id, loginId: loginId };
    setProgress(70);
    axios
      .post(`${BACKEND_URL}/api/link-account`, linker)
      .then((res) => {
        if (res.data.success) {
          setProgress(85);
          sessionStorage.setItem("loginId", loginId);
          setProgress(100);
          window.location = "/setupprofile";
        } else {
          setProgress(0);
          setAlertData({
            severity: "error",
            msg: "Failed to link accounts!",
          });
          handleAlert();
        }
      })
      .catch((err) => {
        if (err) {
          setAlertData({
            severity: "error",
            msg: "There is an error with server! Please contact support",
          });
          handleAlert();
        }
      });
  };
  return (
    <div className={classes.background}>
      <div className={classes.overlay}>
        {displayAlert()}
        <Container className={classes.container}>
          <Grid
            container
            spacing={3}
            justify="center"
            alignItems="center"
            className={classes.mainGrid}
          >
            <Grid item xs={12} align="center">
              <FloatCard>
                <Container>
                  <form onSubmit={createJobSeeker}>
                    <Grid
                      container
                      spacing={4}
                      justify="space-between"
                      className={classes.gridCont}
                    >
                      <Grid item xs={12} align="left">
                        <Typography className={classes.mainTitle}>
                          Sign Up
                        </Typography>
                      </Grid>

                      {/* Basic details */}
                      <Grid item xs={12} md={5} lg={4}>
                        <Grid container alignItems="center" spacing={3}>
                          <Grid item xs={12} align="left">
                            <Typography className={classes.title}>
                              Basic Details
                            </Typography>
                          </Grid>
                          <Grid item xs={12} md={6} align="left">
                            <TextField
                              label="First Name"
                              name="firstName"
                              value={formData.firstName}
                              onChange={setForm}
                              variant="outlined"
                              className={classes.textField}
                              size="small"
                              fullWidth
                              required
                            />
                          </Grid>
                          <Grid item xs={12} md={6} align="left">
                            <TextField
                              label="Last Name"
                              name="lastName"
                              value={formData.lastName}
                              onChange={setForm}
                              variant="outlined"
                              className={classes.textField}
                              size="small"
                              fullWidth
                              required
                            />
                          </Grid>
                          <Grid item xs={12} md={6} align="left">
                            <FormControl
                              variant="outlined"
                              className={classes.textField}
                              size="small"
                              fullWidth
                              required
                            >
                              <InputLabel id="demo-simple-select-outlined-label">
                                Gender
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={gender}
                                onChange={selectGender}
                                label="Gender"
                                className={classes.select}
                              >
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                                <MenuItem value="Secret">
                                  Prefer not to say
                                </MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} md={12} align="left">
                            <Typography className={classes.title}>
                              About
                            </Typography>
                          </Grid>
                          <Grid item xs={12} md={12} align="left">
                            <TextField
                              label="Tagline"
                              name="tagline"
                              variant="outlined"
                              value={formData.tagline}
                              onChange={setForm}
                              multiline
                              size="small"
                              className={classes.textField}
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={12} md={12} align="left">
                            <TextField
                              label="Description"
                              name="description"
                              value={formData.description}
                              onChange={setForm}
                              variant="outlined"
                              size="small"
                              multiline
                              className={classes.textField}
                              fullWidth
                            />
                          </Grid>
                        </Grid>
                      </Grid>

                      {/* Address */}
                      <Grid item xs={12} md={5} lg={4}>
                        <Grid container alignItems="center" spacing={3}>
                          <Grid item xs={12} md={12} align="left">
                            <Typography className={classes.title}>
                              Location
                            </Typography>
                          </Grid>
                          <Grid item xs={12} md={6} align="center">
                            <TextField
                              label="Street"
                              name="street"
                              value={formData.street}
                              onChange={setForm}
                              variant="outlined"
                              className={classes.textField}
                              size="small"
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={12} md={6} align="center">
                            <TextField
                              label="City"
                              name="city"
                              value={formData.city}
                              onChange={setForm}
                              variant="outlined"
                              className={classes.textField}
                              size="small"
                              fullWidth
                            />
                          </Grid>

                          {/* Contact */}
                          <Grid item xs={12} align="left">
                            <Typography className={classes.title}>
                              Contact Details
                            </Typography>
                          </Grid>
                          <Grid item xs={12} align="center">
                            <TextField
                              label="Mobile"
                              name="mobile"
                              value={formData.mobile}
                              onChange={setForm}
                              variant="outlined"
                              className={classes.textField}
                              size="small"
                              fullWidth
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    +94
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>

                      {/* Login Credentials */}
                      <Grid item xs={12} md={5} lg={4}>
                        <Grid container alignItems="center" spacing={3}>
                          <Grid item xs={12} md={12} align="left">
                            <Typography className={classes.title}>
                              Login Credentials
                            </Typography>
                          </Grid>
                          <Grid item xs={12} align="left">
                            <TextField
                              label="E-mail Address"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={setForm}
                              variant="outlined"
                              className={classes.textField}
                              size="small"
                              fullWidth
                              required
                            />
                          </Grid>
                          <Grid item xs={12} align="left">
                            <TextField
                              label="Password"
                              name="password"
                              type="password"
                              value={formData.password}
                              onChange={setForm}
                              variant="outlined"
                              className={classes.textField}
                              size="small"
                              fullWidth
                              required
                            />
                          </Grid>
                          <Grid item xs={12} align="left">
                            <TextField
                              label="Confirm Password"
                              name="confirmPassword"
                              type="password"
                              value={formData.confirmPassword}
                              onChange={setForm}
                              variant="outlined"
                              className={classes.textField}
                              size="small"
                              fullWidth
                              required
                            />
                          </Grid>
                          <Grid item xs={12} align="left">
                            <Typography variant="caption" display="block">
                              Please make sure that your password contains at
                              least,
                              <ul>
                                <li>8 characters</li>
                                <li>1 uppercase letter</li>
                                <li>1 lowercase letter</li>
                                <li>1 number and 1 special character</li>
                              </ul>
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item xs={12}>
                        <Grid
                          item
                          container
                          xs={12}
                          className={classes.footer}
                          alignItems="center"
                          justify="center"
                          spacing={3}
                        >
                          <Grid item md={6} align="left">
                            {progress > 0 ? (
                              <div>
                                <LinearProgressWithLabel value={progress} />
                              </div>
                            ) : (
                              <Link to="/signIn">
                                <Typography className={classes.link}>
                                  Have an account already? Sign In
                                </Typography>
                              </Link>
                            )}
                          </Grid>
                          <Grid
                            item
                            container
                            md={6}
                            className={classes.actions}
                            spacing={2}
                          >
                            <Grid item>
                              <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                className={classes.submit}
                                disabled={progress !== 0}
                              >
                                Sign Up
                              </Button>
                            </Grid>
                            <Grid item>
                              <Link to="/">
                                <Button
                                  fullWidth
                                  variant="contained"
                                  className={classes.cancel}
                                  disabled={progress !== 0}
                                >
                                  Cancel
                                </Button>
                              </Link>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </form>
                </Container>
              </FloatCard>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
}
