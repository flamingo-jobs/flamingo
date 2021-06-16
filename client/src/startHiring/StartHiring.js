import { React, useState } from "react";
import {
  Button,
  TextField,
  Box,
  Grid,
  Typography,
  Container,
  IconButton,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import FloatCard from "./../components/FloatCard";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import backgroundImage from "./images/background.jfif";

const useStyles = makeStyles((theme) => ({
  root: {},
  container: {
    paddingTop: 50,
    paddingBottom: 50,
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

export default function StartHiring() {
  const classes = useStyles();

  const [social, setSocial] = useState([{ platform: "", link: "" }]);
  const handleSocialInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...social];
    list[index][name] = value;
    setSocial(list);
  };
  const handleSocialRemoveClick = (index) => {
    const list = [...social];
    list.splice(index, 1);
    setSocial(list);
  };
  const handleSocialAddClick = () => {
    setSocial([...social, { platform: "", link: "" }]);
  };

  const techStack = [
    { title: "Web Development" },
    { title: "Desktop" },
    { title: "Database" },
    { title: "Mobile" },
    { title: "DevOps" },
    { title: "Other" },
  ];

  const socialMediaPlatforms = [
    { title: "Facebook" },
    { title: "LinkedIn" },
    { title: "Twitter" },
    { title: "YouTube" },
    { title: "Other" },
  ];

  return (
    <div className={classes.background}>
      <div className={classes.overlay}>
        <Container className={classes.container}>
          <FloatCard>
            <Container>
              <Container maxWidth="lg" className={classes.jobDetailsContainer}>
                <Box mt={5} mb={5}>
                  <Typography component="h1" variant="h5">
                    Company Details
                  </Typography>
                </Box>
                <Typography className={classes.title}>Basic Details</Typography>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={12} md={6} align="center">
                    <TextField
                      label="Company Name"
                      name="firstName"
                      value=""
                      onChange=""
                      variant="outlined"
                      className={classes.textField}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6} align="center">
                    <TextField
                      label="Location"
                      name="lastName"
                      value=""
                      onChange=""
                      variant="outlined"
                      className={classes.textField}
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={12} md={12} align="center">
                    <TextField
                      label="Description"
                      name="description"
                      value=""
                      onChange=""
                      variant="outlined"
                      className={classes.textField}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Container>
              <Container maxWidth="lg" className={classes.jobDetailsContainer}>
                <Typography className={classes.title}>
                  Technology Stack Details
                </Typography>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={12} md={12} align="center">
                    <Autocomplete
                      multiple
                      id="tags-outlined"
                      options={techStack}
                      getOptionLabel={(option) => option.title}
                      filterSelectedOptions
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Technology Stack"
                          placeholder="Favorites"
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Container>
              <Container maxWidth="lg" className={classes.jobDetailsContainer}>
                <Typography className={classes.title}>Social Media</Typography>
                {social.map((x, i) => {
                  return (
                    <Grid container alignItems="center" spacing={2}>
                      <Grid item xs={12} md={3} align="center">
                        <Autocomplete
                          id="combo-box-demo"
                          options={socialMediaPlatforms}
                          getOptionLabel={(option) => option.title}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              name="platform"
                              label="Platform"
                              variant="outlined"
                              value={x.platform}
                              onChange={(e) => handleSocialInputChange(e, i)}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} md={7} align="center">
                        <TextField
                          className={classes.textField}
                          variant="outlined"
                          fullWidth
                          name="link"
                          label="Link"
                          value={x.link}
                          onChange={(e) => handleSocialInputChange(e, i)}
                        />
                      </Grid>
                      <Grid item xs={12} md={2} align="center">
                        {social.length !== 1 && (
                          <IconButton
                            onClick={() => handleSocialRemoveClick(i)}
                            color="secondary"
                            aria-label="Add new social"
                          >
                            <RemoveCircleOutlineIcon />
                          </IconButton>
                        )}
                        {social.length - 1 === i && (
                          <IconButton
                            onClick={handleSocialAddClick}
                            color="primary"
                            aria-label="Remove social"
                          >
                            <AddCircleOutlineIcon />
                          </IconButton>
                        )}
                      </Grid>
                    </Grid>
                  );
                })}
              </Container>

              <Container className={classes.jobDetailsContainer}>
                <Typography className={classes.title}>
                  Login Credentials
                </Typography>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={12} md={12} align="center">
                    <TextField
                      label="Email Address"
                      name="description"
                      value=""
                      onChange=""
                      variant="outlined"
                      className={classes.textField}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6} align="center">
                    <TextField
                      label="Password"
                      name="description"
                      value=""
                      onChange=""
                      variant="outlined"
                      className={classes.textField}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6} align="center">
                    <TextField
                      label="Confirm Password"
                      name="description"
                      value=""
                      onChange=""
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
                      >
                        Sign Up
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
}
