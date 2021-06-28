import React from "react";
import {
  Button,
  TextField,
  Box,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import FloatCard from "../../components/FloatCard";
import theme from "../../Theme";
import backgroundImage from "../images/background.jfif";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  root: {
    background: `url(${backgroundImage}) no-repeat`,
    backgroundAttachment: "fixed",
    minHeight: "100vh",
    backgroundSize: "cover",
  },
  container: {
    width: "100%",
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
    marginTop: "50px",
    "&:hover": {
      backgroundColor: theme.palette.tuftsBlue,
      color: "white",
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

  return (
    <div className={classes.background}>
      <div className={classes.overlay}>
        <Container className={classes.container}>
          <FloatCard>
            <Container>
              {/* Personal Details */}
              <Container maxWidth="lg" className={classes.jobDetailsContainer}>
                <Box mt={5} mb={5}>
                  <Typography component="h1" variant="h5">
                    Personal Details
                  </Typography>
                </Box>
                <Typography className={classes.title}>
                  <h4>Basic Details</h4>
                </Typography>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={12} md={6} align="center">
                    <TextField
                      label="First Name"
                      name="firstName"
                      value={firstName}
                      onChange={setForm}
                      variant="outlined"
                      className={classes.textField}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6} align="center">
                    <TextField
                      label="Last Name"
                      name="lastName"
                      value={lastName}
                      onChange={setForm}
                      variant="outlined"
                      className={classes.textField}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6} align="center">
                    <Autocomplete
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
                        />
                      )}
                    />
                  </Grid>
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
                </Grid>
              </Container>
              <Container maxWidth="lg" className={classes.jobDetailsContainer}>
                <Typography className={classes.title}>
                  <h4>Description</h4>
                </Typography>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={12} md={12} align="center">
                    <TextField
                      label="Description"
                      name="description"
                      value={description}
                      onChange={setForm}
                      variant="outlined"
                      className={classes.textField}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Container>

              {/* Address */}
              <Container className={classes.jobDetailsContainer}>
                <Typography className={classes.title}>
                  <h4>Address</h4>
                </Typography>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={12} md={6} align="center">
                    <TextField
                      label="Street"
                      name="street"
                      value={street}
                      onChange={setForm}
                      variant="outlined"
                      className={classes.textField}
                      fullWidth
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
                      fullWidth
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
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Container>

              {/* Contact */}
              <Container maxWidth="lg" className={classes.jobDetailsContainer}>
                <Typography className={classes.title}>
                  <h4>Contact Details</h4>
                </Typography>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={12} md={6} align="center">
                    <TextField
                      label="Phone"
                      name="landLine"
                      value={landLine}
                      onChange={setForm}
                      variant="outlined"
                      className={classes.textField}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6} align="center">
                    <TextField
                      label="Mobile"
                      name="mobile"
                      value={mobile}
                      onChange={setForm}
                      variant="outlined"
                      className={classes.textField}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Container>

              {/* Login Credentials */}
              <Container className={classes.jobDetailsContainer}>
                <Typography className={classes.title}>
                  <h4>Login Credentials</h4>
                </Typography>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={12} md={12} align="center">
                    <TextField
                      label="E-mail Address"
                      name="email"
                      value={email}
                      onChange={setForm}
                      variant="outlined"
                      className={classes.textField}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6} align="center">
                    <TextField
                      label="Password"
                      name="password"
                      type="password"
                      value={password}
                      onChange={setForm}
                      variant="outlined"
                      className={classes.textField}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6} align="center">
                    <TextField
                      label="Confirm Password"
                      name="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={setForm}
                      variant="outlined"
                      className={classes.textField}
                      fullWidth
                    />
                  </Grid>
                  <Grid container alignItems="center" justify="flex-end">
                    <Grid item align="center">
                      <Button
                        fullWidth
                        variant="contained"
                        className={classes.submit}
                        onClick={() => navigation.next()}
                      >
                        Signup
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Container>
            </Container>
          </FloatCard>
        </Container>
      </div>
    </div>
  );
};
