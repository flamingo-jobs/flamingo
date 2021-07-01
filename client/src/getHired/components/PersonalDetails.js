import React from "react";
import {
  Button,
  TextField,
  Box,
  Grid,
  Typography,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import FloatCard from "../../components/FloatCard";
import theme from "../../Theme";
import backgroundImage from "../images/background.jfif";
import axios from "axios";
import BACKEND_URL from "../../Config";
import { Link } from "react-router-dom";
//import DateFnsUtils from "@date-io/date-fns";
//import { MuiPickersUtilsProvider, KeyboardDatePicker, } from "@material-ui/pickers";

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
    '&:hover': {
      color: theme.palette.pinkyRed + "!important"
    }
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
    '& :focus': {
      backgroundColor: 'transparent'
    }
  },
  mainGrid: {
    minHeight: '100vh'
  },
  footer: {
    marginBottom: 10,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      justifyContent: "space-between",
    },
  }
}));

export const PersonalDetails = ({
  formData,
  birthday,
  setForm,
  handleDateChange,
  navigation,
}) => {
  const classes = useStyles();

  const {
    firstName,
    lastName,
    gender,
    description,
    street,
    city,
    zipcode,
    landLine,
    mobile,
    email,
    password,
    confirmPassword,
  } = formData;

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
      gender: formData.gender,
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
    console.log(jobSeekerData);
    const x = {
      name: "firstName",
      gender: "gender",
      intro: "description",
      address: {
        city: "Matara",
        street: "strs",
        zipcode: "zpc",
      },
      contact: {
        email: "em1",
        phone: "ph1",
        mobile: "mb1",
      },
    };
    axios.post(`${BACKEND_URL}/jobseeker/create`, jobSeekerData).then((res) => {
      if (res.data.success) {
        navigation.next();
      } else {
        console.log("Failed!");
      }
    });
  };
  return (
    <div className={classes.background}>
      <div className={classes.overlay}>
        <Container className={classes.container}>
          <Grid container spacing={3} justify="center" alignItems="center" className={classes.mainGrid}>
            <Grid item xs={12} align="center">
              <FloatCard>
                <Container>
                  <form onSubmit={createJobSeeker}>
                    {/* Personal Details */}

                    <Grid
                      container
                      spacing={4}
                      justify="space-between"
                      className={classes.gridCont}
                    >
                      <Grid item xs={12} align="left">
                        <Typography className={classes.mainTitle}>Sign Up</Typography>
                      </Grid>
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
                              value={firstName}
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
                              value={lastName}
                              onChange={setForm}
                              variant="outlined"
                              className={classes.textField}
                              size="small"
                              fullWidth
                              required
                            />
                          </Grid>
                          <Grid item xs={12} md={6} align="left">
                            {/* <Autocomplete
                        id="combo-box-demo"
                        options={[{ title: "Male" }, { title: "Female" }]}
                        getOptionLabel={(option) => option.title}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            name="gender"
                            label="Gender"
                            variant="outlined"
                            value={gender}
                            onChange={setForm}
                            required
                          />
                        )}
                      /> */}
                            <FormControl variant="outlined" className={classes.textField} size="small"
                              fullWidth required>
                              <InputLabel id="demo-simple-select-outlined-label">Gender</InputLabel>
                              <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={gender}
                                onChange={setForm}
                                label="Gender"
                                className={classes.select}

                              >
                                <MenuItem value={10}>Male</MenuItem>
                                <MenuItem value={20}>Female</MenuItem>
                                <MenuItem value={30}>Other</MenuItem>
                                <MenuItem value={30}>Prefer not to say</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          {/* 
                  <Grid item xs={12} md={6} align="center">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid container>
                        <KeyboardDatePicker
                          margin="normal"
                          id="date-picker-dialog"
                          label="Birthday"
                          name="birthday"
                          format="MM/dd/yyyy"
                          value={birthday}
                          onChange={handleDateChange}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                          className={classes.textField}
                        />
                      </Grid>
                    </MuiPickersUtilsProvider>
                  </Grid>
                        */}

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
                              value={description}
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
                              value={street}
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
                              value={city}
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
                              value={zipcode}
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
                              value={landLine}
                              onChange={setForm}
                              variant="outlined"
                              className={classes.textField}
                              size="small"
                              fullWidth
                              InputProps={{
                                startAdornment: <InputAdornment position="start">+94</InputAdornment>,
                              }}
                            />

                          </Grid>
                          <Grid item xs={12} align="center">
                            <TextField
                              label="Mobile"
                              name="mobile"
                              value={mobile}
                              onChange={setForm}
                              variant="outlined"
                              className={classes.textField}
                              size="small"
                              fullWidth
                              InputProps={{
                                startAdornment: <InputAdornment position="start">+94</InputAdornment>,
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
                              value={email}
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
                              value={password}
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
                              value={confirmPassword}
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
                              <Typography className={classes.link} >
                                Have an account already? Sign In
                              </Typography>
                            </Link>
                          </Grid>
                          <Grid item container md={6} className={classes.actions}>
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

        </Container >
      </div >
    </div >
  );
};
