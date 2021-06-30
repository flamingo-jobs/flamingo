import { React, useState } from "react";
import { useForm } from "react-hooks-helper";
import {
  Button,
  TextField,
  Box,
  Grid,
  Typography,
  Container,
  IconButton,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import FloatCard from "./../components/FloatCard";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import backgroundImage from "./images/background.jfif";
import axios from "axios";
import BACKEND_URL from "../Config";

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
      backgroundColor: theme.palette.skyBlueCrayolaHover,
      color: "white",
      boxShadow: "none",
    },
  },
  cancel: {
    boxShadow: "none",
    color: theme.palette.black,
    backgroundColor: theme.palette.white,
    marginTop: "50px",
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

  // Form data register
  const defaultData = {
    name: "",
    logo: "",
    description: "",
    openings: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setForm] = useForm(defaultData);

  const createAccount = (e) => {
    e.preventDefault();
    const signupData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.confirmPassword,
      role: "employer",
    };
    if (formData.password === formData.confirmPassword) {
      axios.post(`${BACKEND_URL}/api/signup`, signupData).then((res) => {
        if (res.data.success) {
          sessionStorage.setItem("userToken", res.data.token);
          sendData();
        } else {
          handleAlert();
        }
      });
    } else {
      handleAlert();
    }
  };

  const sendData = () => {
    handleUploads();
    const employerData = {
      name: formData.name,
      logo: formData.logo,
      description: formData.description,
      locations: locations,
      email: formData.email,
      dateRegistered: new Date(),
      links: social,
    };
    axios.post(`${BACKEND_URL}/employers/create`, employerData).then((res) => {
      if (res.data.success) {
        window.location = "/";
      } else {
        console.log("Failed!");
      }
    });
  };

  // File upload handler
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };
  const handleUploads = () => {
    formData.logo = selectedFile ? selectedFile.name : "";
    /*
    const image = selectedFile;
    fetch("https://freeimage.host/api/1/upload?key=<YOUR_API_KEY>", {
      method: "POST",
      body: image,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
      */
  };

  // Dinamic Inuputs
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

  const [locations, setLocation] = useState([{ name: "" }]);
  const handleLocationInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...locations];
    list[index][name] = value;
    setLocation(list);
  };
  const handleLocationRemoveClick = (index) => {
    const list = [...locations];
    list.splice(index, 1);
    setLocation(list);
  };
  const handleLocationAddClick = () => {
    setLocation([...locations, { name: "" }]);
  };

  // Autocomplete arrays
  const techStack = [
    { title: "Web Development" },
    { title: "Desktop" },
    { title: "Database" },
    { title: "Mobile" },
    { title: "DevOps" },
    { title: "Other" },
  ];
  const socialMediaPlatforms = [
    { title: "Website" },
    { title: "Facebook" },
    { title: "LinkedIn" },
    { title: "Twitter" },
    { title: "YouTube" },
    { title: "Blog" },
    { title: "Other" },
  ];

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

  return (
    <div className={classes.background}>
      <div className={classes.overlay}>
        <Container className={classes.container}>
          <FloatCard>
            <Container>
              <form className={classes.form} onSubmit={createAccount}>
                {/* Basic details */}
                <Container
                  maxWidth="lg"
                  className={classes.jobDetailsContainer}
                >
                  <Box mt={5} mb={5}>
                    <Typography component="h1" variant="h5">
                      Company Details
                    </Typography>
                  </Box>
                  <Typography className={classes.title}>
                    Basic Details
                  </Typography>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={12} md={6} align="center">
                      <TextField
                        label="Company Name"
                        name="name"
                        value={formData.name}
                        onChange={setForm}
                        variant="outlined"
                        className={classes.textField}
                        required
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} md={6} align="center">
                      {isFilePicked ? (
                        <Grid container alignItems="center" spacing={2}>
                          <Grid item xs={10} md={10} align="center">
                            <TextField
                              label="Logo name"
                              value={selectedFile.name}
                              variant="outlined"
                              className={classes.textField}
                              fullWidth
                              disabled
                            />
                          </Grid>
                          <Grid item xs={2} md={2} align="center">
                            <Button onClick={() => setIsFilePicked(false)}>
                              Remove
                            </Button>
                          </Grid>
                        </Grid>
                      ) : (
                        <TextField
                          accept="image/*"
                          name="selectedFile"
                          type="file"
                          onChange={changeHandler}
                          variant="outlined"
                          className={classes.textField}
                          fullWidth
                        />
                      )}
                    </Grid>
                    <Grid item xs={12} md={12} align="center">
                      <TextField
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={setForm}
                        variant="outlined"
                        className={classes.textField}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                  {locations.map((x, i) => {
                    return (
                      <Grid container alignItems="center" spacing={2}>
                        <Grid item xs={12} md={10} align="center">
                          <TextField
                            className={classes.textField}
                            variant="outlined"
                            fullWidth
                            name="name"
                            label="Location"
                            value={x.name}
                            onChange={(e) => handleLocationInputChange(e, i)}
                          />
                        </Grid>
                        <Grid item xs={12} md={2} align="center">
                          {locations.length !== 1 && (
                            <IconButton
                              onClick={() => handleLocationRemoveClick(i)}
                              color="secondary"
                              aria-label="Add new location"
                            >
                              <RemoveCircleOutlineIcon />
                            </IconButton>
                          )}
                          {locations.length - 1 === i && (
                            <IconButton
                              onClick={handleLocationAddClick}
                              color="primary"
                              aria-label="Remove location"
                            >
                              <AddCircleOutlineIcon />
                            </IconButton>
                          )}
                        </Grid>
                      </Grid>
                    );
                  })}
                </Container>

                {/* Technology Stack 
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
                          className={classes.textField}
                          variant="outlined"
                          label="Technology Stack"
                          placeholder="Used Technologies"
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Container>
              */}
                {/* Social Media Links */}
                <Container
                  maxWidth="lg"
                  className={classes.jobDetailsContainer}
                >
                  <Typography className={classes.title}>
                    Social Media Links
                  </Typography>
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

                {/* Login details */}
                <Container className={classes.jobDetailsContainer}>
                  <Typography className={classes.title}>
                    Login Credentials
                  </Typography>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={12} md={12} align="center">
                      <TextField
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={setForm}
                        variant="outlined"
                        className={classes.textField}
                        required
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} md={6} align="center">
                      <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={setForm}
                        variant="outlined"
                        className={classes.textField}
                        required
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} md={6} align="center">
                      <TextField
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={setForm}
                        variant="outlined"
                        className={classes.textField}
                        required
                        fullWidth
                      />
                    </Grid>
                    <Grid container alignItems="center" justify="flex-end">
                      <Grid item align="center">
                        <Button
                          fullWidth
                          type="submit"
                          variant="contained"
                          className={classes.submit}
                        >
                          Sign Up
                        </Button>
                      </Grid>
                      <Grid item align="center">
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
                </Container>
              </form>
            </Container>
          </FloatCard>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              Signup Failed! Please check whether your passwords are matching.
            </Alert>
          </Snackbar>
        </Container>
      </div>
    </div>
  );
}
