import {
  Avatar,
  Badge,
  Button,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import RemoveCircleRoundedIcon from "@material-ui/icons/RemoveCircleRounded";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import path from "path";
import { React, useRef, useState } from "react";
import { useForm } from "react-hooks-helper";
import { Link } from "react-router-dom";
import SnackBarAlert from "../components/SnackBarAlert";
import BACKEND_URL from "../Config";
import FloatCard from "./../components/FloatCard";
import backgroundImage from "./images/background.jpg";
import uploadFileToBlob, {
  isStorageConfigured,
} from "../utils/azureFileUpload";

const jwt = require("jsonwebtoken");
const storageConfigured = isStorageConfigured();
const passwordRegexp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/;

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
    website: "",
    email: "",
    password: "",
    confirmPassword: "",
    mainLocation: "",
  };
  const [formData, setForm] = useForm(defaultData);

  const badPassword = (password) => {
    if (!passwordRegexp.test(password)) {
      return true;
    }
  };

  const createAccount = (e) => {
    e.preventDefault();
    const signupData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.confirmPassword,
      role: "employer",
      accessTokens: ["all"],
      dateRegistered: new Date(),
    };
    if (badPassword(formData.password)) {
      setAlertData({
        severity: "error",
        msg: `Please make an stronger password!
        Your password must contain minimum 8 characters, 
        at least 1 uppercase letter, 1 lowercase letter, 
        1 number and 1 special character`,
      });
      handleAlert();
    } else {
      if (formData.password === formData.confirmPassword) {
        axios
          .post(`${BACKEND_URL}/api/signup`, signupData)
          .then((res) => {
            if (res.data.success) {
              sessionStorage.setItem("userToken", res.data.token);
              const userId = jwt.decode(res.data.token, { complete: true })
                .payload.userId;
              sendData(userId);
            } else {
              setAlertData({
                severity: "error",
                msg: "User account creation failed!",
              });
              handleAlert();
            }
          })
          .catch((err) => {
            if (err) {
              console.log(err);
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
    }
  };

  const sendData = async (userId) => {
    social.push({ platform: "Website", link: formData.website });
    locations.push({ name: formData.mainLocation });
    const employerData = {
      name: formData.name,
      logo: "",
      description: formData.description,
      locations: locations.map((x) => {
        return x.name;
      }),
      email: formData.email,
      dateRegistered: new Date(),
      links: social,
      subscription: { type: "Basic", startDate: new Date() },
      verificationStatus: "none",
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
    handleUploads(loginId);
    const linker = { id: id, loginId: loginId };
    axios.post(`${BACKEND_URL}/api/link-account`, linker).then((res) => {
      if (res.data.success) {
        handleShorlistingSettings(loginId);
      } else {
        setAlertData({
          severity: "error",
          msg: "Account linking failed!",
        });
        handleAlert();
      }
    });
  };

  const handleShorlistingSettings = (loginId) => {
    const shortlistData = {
      loginId: loginId,
    };
    axios
      .post(`${BACKEND_URL}/settings/create`, shortlistData)
      .then((res) => {
        if (res.data.success) {
          sessionStorage.setItem("loginId", loginId);
          window.location = "/";
        } else {
          setAlertData({
            severity: "error",
            msg: "Account creation failed! Please contact support",
          });
          handleAlert();
        }
      })
      .catch((err) => {
        if (err) {
          setAlertData({
            severity: "error",
            msg: "Account creation failed! Please contact support",
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
  const handleUploads = async (loginId) => {
    if (selectedFile) {
      var file = selectedFile;
      var blob = file.slice(0, file.size);
      const fileName = loginId + "." + path.extname(selectedFile.name);
      var newFile = new File([blob], `${fileName}`, {
        type: "image/*",
      });

      await uploadFileToBlob(newFile, "EmployerLogos");
      const updateData = { logo: fileName };
      axios
        .post(`${BACKEND_URL}/employers/update/${loginId}`, updateData)
        .then((res) => {
          if (res.data.success) {
            setAlertData({
              severity: "success",
              msg: "Logo uploaded!",
            });
            handleAlert();
          }
        })
        .catch((err) => {
          if (err) {
            setAlertData({
              severity: "error",
              msg: "Failed to upload logo!",
            });
            handleAlert();
          }
        });
      /*
      const data = new FormData();
      const image = selectedFile;
      data.append("company", loginId);
      data.append("logo", image);
      axios
        .post(`${BACKEND_URL}/logo`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data.success) {
            setAlertData({
              severity: "success",
              msg: "Almost there...",
            });
            handleAlert();
            return "";
          } else {
            setAlertData({
              severity: "error",
              msg: "Image upload failed!",
            });
            handleAlert();
            return "";
          }
        })
        .catch((err) => {
          if (err) {
            setAlertData({
              severity: "error",
              msg: "Image upload failed!",
            });
            handleAlert();
            return "";
          }
        }); 
        */
    }
  };

  // Dinamic Inputs
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

                      <Grid item xs={12} md={6} lg={6}>
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

                          <Grid item xs={12} md={5} align="left">
                            <TextField
                              label="Company Name"
                              name="name"
                              value={formData.name}
                              onChange={setForm}
                              variant="outlined"
                              className={classes.textField}
                              fullWidth
                              required
                              size="small"
                            />
                          </Grid>
                          <Grid item xs={12} md={7} align="left">
                            <TextField
                              label="Website"
                              name="website"
                              value={formData.website}
                              onChange={setForm}
                              variant="outlined"
                              className={classes.textField}
                              fullWidth
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
                          <Grid item xs={12} md={4} align="left">
                            <TextField
                              label="Location"
                              name="mainLocation"
                              value={formData.mainLocation}
                              onChange={setForm}
                              variant="outlined"
                              className={classes.textField}
                              size="small"
                              fullWidth
                              required
                            />
                          </Grid>
                          <Grid item xs={12} md={8} align="left">
                            {locations.map((x, i) => {
                              return (
                                <Grid container spacing={1}>
                                  <Grid item xs={12} md={8} align="left">
                                    <TextField
                                      className={classes.textField}
                                      variant="outlined"
                                      fullWidth
                                      name="name"
                                      label="Other Locations (optional)"
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
                        </Grid>
                      </Grid>

                      <Grid item xs={12} md={6} lg={5}>
                        <Grid container alignItems="center" spacing={3}>
                          {/* Login Credentials */}
                          <Grid item xs={11} align="left">
                            <Grid item xs={11} align="left">
                              <Typography className={classes.title}>
                                Login Credentials
                              </Typography>
                            </Grid>
                            <Typography variant="caption">
                              After the signing up process completes, an admin
                              account will be created with full access. You can
                              create accounts for your employers with
                              restricting access to specific parts by using
                              pre-defined roles under{" "}
                              <i>
                                {" "}
                                Account {">"} Settings {">"} Add Role{" "}
                              </i>
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
                            <Grid item xs={12} align="left">
                              <Typography variant="caption" display="block">
                                By clicking sign up, you are agreeing with our{" "}
                                <a href="/terms-and-conditions" target="_blank">
                                  Terms {"&"} Conditions
                                </a>
                                .
                              </Typography>
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
                                className={classes.submit}
                              >
                                Sign Up
                              </Button>
                            </Grid>
                            <Grid item>
                              <Link to="/">
                                <Button fullWidth className={classes.cancel}>
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
