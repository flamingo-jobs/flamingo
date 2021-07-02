import { React, useState } from "react";
import { useForm } from "react-hooks-helper";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FloatCard from "../components/FloatCard";
import backgroundImage from "./images/background.jfif";
import axios from "axios";
import BACKEND_URL from "../Config";
import { Link } from "react-router-dom";

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
    marginRight: 10,
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

const defaultData = {
  firstName: "",
  lastName: "",
  tagline: "",
  description: "",
  street: "",
  city: "",
  zipcode: "",
  mobile: "",
  landLine: "",
  email: "",
  password: "",
  condirmPassword: "",
};

export default function GetHired() {
  const classes = useStyles();

  const [formData, setForm] = useForm(defaultData);
  const [gender, setGender] = useState("Male");
  const selectGender = (e) => {
    setGender(e.target.value);
  };

  const createJobSeeker = (e) => {
    e.preventDefault();
    const signupData = {
      name: formData.firstName,
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.confirmPassword,
      role: "jobseeker",
    };
    if (formData.password === formData.confirmPassword) {
      axios.post(`${BACKEND_URL}/api/signup`, signupData).then((res) => {
        if (res.data.success) {
          sessionStorage.setItem("userToken", res.data.token);
          sendData();
        } else {
          console.log("res data not success");
          // handleAlert();
        }
      });
    } else {
      console.log("password not match");
      //handleAlert();
    }
  };
  const sendData = () => {
    const jobSeekerData = {
      name: formData.firstName,
      gender: gender,
      tagline: formData.tagline,
      intro: formData.description,
      address: {
        street: formData.street,
        city: formData.city,
        zipCode: formData.zipcode,
      },
      contact: {
        email: formData.email,
        phone: formData.landLine,
        mobile: formData.mobile,
      },
    };
    axios.post(`${BACKEND_URL}/jobseeker/create`, jobSeekerData).then((res) => {
      if (res.data.success) {
        //Go to multi step form
      } else {
        console.log("Failed!");
      }
    });
  };
  return (
    <div className={classes.background}>
      <div className={classes.overlay}>
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
                              Address
                            </Typography>
                          </Grid>
                          <Grid item xs={12} align="center">
                            <TextField
                              label="Street"
                              name="street"
                              value={formData.street}
                              onChange={setForm}
                              variant="outlined"
                              className={classes.textField}
                              size="small"
                              fullWidth
                              required
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
                              required
                            />
                          </Grid>
                          <Grid item xs={12} md={6} align="center">
                            <TextField
                              label="Zip Code"
                              name="zipcode"
                              value={formData.zipcode}
                              onChange={setForm}
                              variant="outlined"
                              className={classes.textField}
                              size="small"
                              fullWidth
                              required
                            />
                          </Grid>

                          {/* Contact */}
                          <Grid item xs={12} align="left">
                            <Typography className={classes.title}>
                              Contact Details
                            </Typography>
                          </Grid>
                          <Grid item xs={12} align="left">
                            <TextField
                              label="Phone"
                              name="landLine"
                              value={formData.landLine}
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
                            <Link to="/signIn">
                              <Typography className={classes.link}>
                                Have an account already? Sign In
                              </Typography>
                            </Link>
                          </Grid>
                          <Grid
                            item
                            container
                            md={6}
                            className={classes.actions}
                          >
                            <Grid item>
                              <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                className={classes.submit}
                              >
                                Sign Up
                              </Button>
                            </Grid>
                            <Grid item>
                              <Button
                                fullWidth
                                onClick={() => {
                                  window.location = "/";
                                }}
                                variant="contained"
                                className={classes.cancel}
                              >
                                Cancel
                              </Button>
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
