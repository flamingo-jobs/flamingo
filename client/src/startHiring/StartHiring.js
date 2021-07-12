import { React, useState, useRef } from "react";
import { useForm } from "react-hooks-helper";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  IconButton,
} from "@material-ui/core";
import SnackBarAlert from "../components/SnackBarAlert";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import FloatCard from "./../components/FloatCard";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import backgroundImage from "./images/background.jpg";
import axios from "axios";
import BACKEND_URL from "../Config";
import { Avatar, Badge } from "@material-ui/core";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import RemoveCircleRoundedIcon from "@material-ui/icons/RemoveCircleRounded";
import { Link } from "react-router-dom";

const jwt = require("jsonwebtoken");

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "left",
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
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    "& fieldset": {
      borderColor: theme.palette.tuftsBlue,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.pinkyRed + " !important",
    },
  },
  shortTextField: {
    width: "80%",
    [theme.breakpoints.down("md")]: {
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
    textAlign: "left",
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
  addBadge: {
    "& .MuiBadge-anchorOriginBottomRightCircle": {
      right: "4%",
      bottom: "4%",
    },
  },
  gridCont: {},
  mainTitle: {
    fontSize: 36,
    fontWeight: 500,
    marginTop: 20,
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
  footer: {
    marginBottom: 10,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      justifyContent: "space-between",
    },
  },
  mainGrid: {
    minHeight: "100vh",
  },
}));

export default function StartHiring() {
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
          const userId = jwt.decode(res.data.token, { complete: true }).payload
            .userId;
          sendData(userId);
        } else {
          setAlertData({
            severity: "error",
            msg: "User account creation failed!",
          });
          handleAlert();
        }
      });
    } else {
      setAlertData({
        severity: "error",
        msg: "Please check whether your passwords are matching!",
      });
      handleAlert();
    }
  };

  const sendData = (userId) => {
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
        handleSuccessLogin(userId, res.data.existingData);
      } else {
        setAlertData({
          severity: "error",
          msg: "Employer account creation failed!",
        });
        handleAlert();
      }
    });
  };

  const handleSuccessLogin = (id, loginId) => {
    const linker = { id: id, loginId: loginId };
    axios.post(`${BACKEND_URL}/api/link-account`, linker).then((res) => {
      if (res.data.success) {
        sessionStorage.setItem("loginId", loginId);
        window.location = "/";
      } else {
        setAlertData({
          severity: "error",
          msg: "Account linking failed!",
        });
        handleAlert();
      }
    });
  };

  // File upload handler
  const fileInput = useRef();
  const [selectedFile, setSelectedFile] = useState();
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
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
  const socialMediaPlatforms = [
    { title: "Website" },
    { title: "Facebook" },
    { title: "LinkedIn" },
    { title: "Twitter" },
    { title: "YouTube" },
    { title: "Blog" },
    { title: "Other" },
  ];

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
                  <form className={classes.form} onSubmit={createAccount}>
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

                      <Grid item xs={12} md={5} lg={4}>
                        <Grid container alignItems="center" spacing={3}>
                          {/* Basic Details */}
                          <Grid item xs={12} align="left">
                            <Typography className={classes.title}>
                              Company Logo
                            </Typography>
                          </Grid>
                          <Grid item xs={12} align="left">
                            {!!selectedFile ? (
                              <Grid
                                container
                                direction="row"
                                alignItems="center"
                              >
                                <Grid item xs={5} align="left">
                                  <Badge
                                    overlap="circle"
                                    anchorOrigin={{
                                      vertical: "bottom",
                                      horizontal: "right",
                                    }}
                                    badgeContent={
                                      <IconButton
                                        onClick={() => {
                                          setSelectedFile(null);
                                        }}
                                        aria-label="delete"
                                        color="secondary"
                                      >
                                        <RemoveCircleRoundedIcon />
                                      </IconButton>
                                    }
                                    className={classes.addBadge}
                                  >
                                    <Avatar
                                      variant="square"
                                      style={{
                                        width: 70,
                                        height: 70,
                                        borderRadius: 12,
                                      }}
                                      src={URL.createObjectURL(selectedFile)}
                                    />
                                  </Badge>
                                </Grid>
                                <Grid item xs={7} align="left">
                                  <Typography>{selectedFile.name}</Typography>
                                </Grid>
                              </Grid>
                            ) : (
                              <Grid
                                container
                                direction="row"
                                alignItems="center"
                              >
                                <Grid item xs={5} align="left">
                                  <Badge
                                    overlap="circle"
                                    anchorOrigin={{
                                      vertical: "bottom",
                                      horizontal: "right",
                                    }}
                                    badgeContent={
                                      <IconButton
                                        onClick={() =>
                                          fileInput.current.click()
                                        }
                                        aria-label="delete"
                                        color="primary"
                                      >
                                        <AddCircleRoundedIcon />
                                      </IconButton>
                                    }
                                    className={classes.addBadge}
                                  >
                                    <Avatar
                                      variant="square"
                                      style={{
                                        width: 70,
                                        height: 70,
                                        borderRadius: 12,
                                      }}
                                      src="/static/images/avatar/2.jpg"
                                      onClick={() => fileInput.current.click()}
                                    />
                                  </Badge>
                                </Grid>
                                <Grid item xs={7} align="left">
                                  <Typography>No file selected</Typography>
                                </Grid>
                              </Grid>
                            )}
                          </Grid>
                          <input
                            ref={fileInput}
                            name="selectedFile"
                            type="file"
                            onChange={changeHandler}
                            style={{ display: "none" }}
                          />
                          <Grid item xs={12} align="left">
                            <Typography className={classes.title}>
                              Basic Details
                            </Typography>
                          </Grid>
                          <Grid item xs={12} align="left">
                            <TextField
                              label="Company Name"
                              name="name"
                              value={formData.name}
                              onChange={setForm}
                              variant="outlined"
                              className={classes.shortTextField}
                              required
                              size="small"
                            />
                          </Grid>
                          <Grid item xs={12} md={12} align="left">
                            <TextField
                              label="Description"
                              name="description"
                              value={formData.description}
                              onChange={setForm}
                              variant="outlined"
                              className={classes.textField}
                              size="small"
                              fullWidth
                              multiline
                            />
                          </Grid>

                          {locations.map((x, i) => {
                            return (
                              <Grid
                                item
                                container
                                alignItems="flex-start"
                                spacing={1}
                              >
                                <Grid item xs={12} md={8} align="left">
                                  <TextField
                                    className={classes.textField}
                                    variant="outlined"
                                    fullWidth
                                    name="name"
                                    label="Location"
                                    size="small"
                                    value={x.name}
                                    onChange={(e) =>
                                      handleLocationInputChange(e, i)
                                    }
                                  />
                                </Grid>
                                <Grid item xs={12} md={4} align="left">
                                  {locations.length !== 1 && (
                                    <IconButton
                                      onClick={() =>
                                        handleLocationRemoveClick(i)
                                      }
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
                        </Grid>
                      </Grid>

                      <Grid item xs={12} md={6} lg={5}>
                        <Grid container alignItems="center" spacing={3}>
                          {/* Social Media Links */}
                          <Grid item xs={12} align="left">
                            <Typography className={classes.title}>
                              Media Links
                            </Typography>
                          </Grid>
                          {social.map((x, i) => {
                            return (
                              <Grid
                                item
                                container
                                alignItems="flex-start"
                                spacing={1}
                              >
                                <Grid item xs={12} md={3} align="left">
                                  <Autocomplete
                                    id="combo-box-demo"
                                    options={socialMediaPlatforms}
                                    getOptionLabel={(option) => option.title}
                                    disableClearable
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        name="platform"
                                        label="Platform"
                                        variant="outlined"
                                        size="small"
                                        value={x.platform}
                                        onChange={(e) =>
                                          handleSocialInputChange(e, i)
                                        }
                                      />
                                    )}
                                  />
                                </Grid>
                                <Grid item xs={12} md={6} align="left">
                                  <TextField
                                    className={classes.textField}
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    name="link"
                                    label="Link"
                                    value={x.link}
                                    onChange={(e) =>
                                      handleSocialInputChange(e, i)
                                    }
                                  />
                                </Grid>
                                <Grid item xs={12} md={3} align="left">
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

                          {/* Login Credentials */}
                          <Grid item xs={11} align="left">
                            <Typography className={classes.title}>
                              Login Credentials
                            </Typography>
                          </Grid>
                          <Grid item container alignItems="center" spacing={3}>
                            <Grid item xs={12} md={11} align="left">
                              <TextField
                                label="Email Address"
                                name="email"
                                type="email"
                                size="small"
                                value={formData.email}
                                onChange={setForm}
                                variant="outlined"
                                className={classes.shortTextField}
                                required
                              />
                            </Grid>
                            <Grid item xs={12} md={11} align="left">
                              <TextField
                                label="Password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={setForm}
                                variant="outlined"
                                className={classes.shortTextField}
                                required
                                size="small"
                              />
                            </Grid>
                            <Grid item xs={12} md={11} align="left">
                              <TextField
                                label="Confirm Password"
                                name="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={setForm}
                                variant="outlined"
                                className={classes.shortTextField}
                                required
                                size="small"
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>

                      {/* Submit Buttons */}
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
                            spacing={2}

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
