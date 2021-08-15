import React, { useState } from "react";
import { useForm } from "react-hooks-helper";
import PropTypes from "prop-types";
import {
  makeStyles,
  Grid,
  Typography,
  Box,
  Tab,
  Tabs,
  Button,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Container,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import SnackBarAlert from "../../components/SnackBarAlert";
import UsersTable from "../components/UsersTable";
import axios from "axios";
import BACKEND_URL from "../../Config";
import FloatCard from "../../components/FloatCard";
import NoAccess from "../../components/NoAccess";
const jwt = require("jsonwebtoken");
const passwordRegexp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/;

let userAccess = false;

if (sessionStorage.getItem("userToken")) {
  var accessTokens = jwt.decode(sessionStorage.getItem("userToken"), {
    complete: true,
  }).payload.accessTokens;
  if (accessTokens.includes("all") || accessTokens.includes("users")) {
    userAccess = true;
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 10,
    margin: "30px 10px 30px 10px",
    flexGrow: 1,
  },
  button: {
    backgroundColor: theme.palette.stateBlue,
    color: theme.palette.white,
    "&:hover": {
      backgroundColor: theme.palette.stateBlueHover,
    },
    float: "center",
  },
  topCard: {
    minWidth: "100%",
    borderRadius: 12,
    boxShadow: "rgba(83, 144, 217, 0.1) 0px 4px 12px",
    overflow: "unset",
    margin: "0px 10px 20px 5px",
    flexGrow: 1,
  },
  mainGrid: {
    paddingLeft: 12,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "stretch",
    },
    [theme.breakpoints.down("xs")]: {
      paddingRight: 12,
      paddingLeft: 12,
    },
  },
  dialogbuttons: {
    color: "red",
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
const Settings = () => {
  const classes = useStyles();

  const accessTokens = [
    {
      value: "alljobs",
      description: "Handle all jobs",
    },
    {
      value: "allresume",
      description: "Handle all resumes",
    },
    {
      value: "singlejob",
      description: "Post and handle jobs",
    },
    {
      value: "singleresume",
      description: "Handle resumes for the jobs posted by the user",
    },
    {
      value: "billing",
      description: "Billing",
    },
    {
      value: "user",
      description: "Handle users",
    },
    {
      value: "company",
      description: "Edit company profile",
    },
  ];
  const defaultData = {
    name: "",
    email: "",
    message: "",
  };
  const [formData, setForm] = useForm(defaultData);
  const [value, setValue] = useState(0);
  const [checked, setChecked] = useState([]);

  const handleChecked = (value, itemId) => () => {
    const newChecked = [...checked];
    const itemObj = { index: itemId, name: value };
    const currentIndex = checked.findIndex((x) => x.index === itemId);

    if (currentIndex === -1) {
      newChecked.push(itemObj);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

  const addNewUser = async (e) => {
    e.preventDefault();
    if (checked.length === 0) {
      setAlertData({
        severity: "error",
        msg: "Please set access priviledges for your employee!",
      });
      handleAlert();
      return;
    } else {
      const newUserData = {
        name: formData.name,
        email: formData.email,
        password: "6BjLjfNbn+B%u9Rh",
        password_confirmation: "6BjLjfNbn+B%u9Rh",
        role: "employer",
        accessTokens: checked.map((x) => x.name),
        dateRegistered: new Date(),
      };
      axios.post(`${BACKEND_URL}/api/signup`, newUserData).then((res) => {
        if (res.data.success) {
          const userId = jwt.decode(res.data.token, { complete: true }).payload
            .userId;
          sendEmail(userId);
        } else {
          setAlertData({
            severity: "error",
            msg: "Failed to add new employee!",
          });
          handleAlert();
        }
      });
    }
  };

  const sendEmail = (userId) => {
    const invitationData = {
      id: userId,
      empName: formData.name,
      email: formData.email,
      loginId: sessionStorage.getItem("loginId"),
      adminName: jwt.decode(sessionStorage.getItem("userToken"), {
        complete: true,
      }).payload.username,
      adminEmail: jwt.decode(sessionStorage.getItem("userToken"), {
        complete: true,
      }).payload.email,
      message: formData.message,
    };
    axios.post(`${BACKEND_URL}/api/invite`, invitationData).then((res) => {
      if (res.data.success) {
        console.log("successd");
        setAlertData({
          severity: "success",
          msg: `Successful! Invitaion sent to ${formData.email}`,
        });
        handleAlert();
      } else {
        setAlertData({
          severity: "error",
          msg: "Failed to send email to employee!",
        });
        handleAlert();
      }
    });
  };

  const [deletePassword, setDeletePassword] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = (e) => {
    e.preventDefault();
    const userId = jwt.decode(sessionStorage.getItem("userToken"), {
      complete: true,
    }).payload.userId;
    axios
      .post(`${BACKEND_URL}/api/check-password`, {
        userId: userId,
        password: deletePassword,
      })
      .then((res) => {
        if (res.data.success) {
          setOpen(true);
        } else {
          setAlertData({
            severity: "error",
            msg: "Password you have entered does not match with your account password!",
          });
          handleAlert();
        }
      });
  };
  const handleClose = () => {
    setOpen(false);
  };
  const deleteUser = async (e) => {
    e.preventDefault();
    const userData = jwt.decode(sessionStorage.getItem("userToken"), {
      complete: true,
    }).payload;
    const deleteUserData = {
      userId: userData.userId,
      loginId: sessionStorage.getItem("loginId"),
      role: userData.userRole,
      accessTokens: userData.accessTokens,
    };
    axios
      .post(`${BACKEND_URL}/api/remove-user`, deleteUserData)
      .then((res) => {
        if (res.data.success) {
          sessionStorage.clear();
          localStorage.clear();
          window.location = "/";
        } else {
          setAlertData({
            severity: "error",
            msg: "Failed to delete account!",
          });
          handleAlert();
        }
      })
      .catch((err) => {
        if (err) {
          setAlertData({
            severity: "error",
            msg: "Failed to delete account!",
          });
          handleAlert();
        }
      });
  };

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const userId = jwt.decode(sessionStorage.getItem("userToken"), {
      complete: true,
    }).payload.userId;
    axios
      .post(`${BACKEND_URL}/api/check-password`, {
        userId: userId,
        password: oldPassword,
      })
      .then((res) => {
        if (res.data.success) {
          updatePassword(userId);
        } else {
          setAlertData({
            severity: "error",
            msg: "Password you have entered does not match with your account password!",
          });
          handleAlert();
        }
      })
      .catch((err) => {
        if (err) {
          setAlertData({
            severity: "error",
            msg: "Cannot connect to server! Please try again later",
          });
          handleAlert();
        }
      });
  };

  const badPassword = (password) => {
    if (!passwordRegexp.test(password)) {
      return true;
    }
  };

  const updatePassword = async (userId) => {
    if (badPassword(newPassword)) {
      setAlertData({
        severity: "error",
        msg: `Please make an stronger password!
        Your password must contain minimum 8 characters, 
        at least 1 uppercase letter, 1 lowercase letter, 
        1 number and 1 special character`,
      });
      handleAlert();
    } else {
      if (newPassword === confirmNewPassword) {
        const newPasswordData = {
          newPassword: newPassword,
        };
        axios
          .post(`${BACKEND_URL}/change-password`, newPasswordData)
          .then((res) => {
            if (res.data.success) {
              setOldPassword("");
              setNewPassword("");
              setConfirmNewPassword("");
              setAlertData({
                severity: "success",
                msg: "Your password has been changed!",
              });
              handleAlert();
            }
          })
          .catch((err) => {
            if (err) {
              setAlertData({
                severity: "error",
                msg: "Cannot connect right now. Please check again later!",
              });
              handleAlert();
            }
          });
      } else {
        setAlertData({
          severity: "error",
          msg: "Please check your passwords are matching!",
        });
        handleAlert();
      }
    }
  };

  return (
    <Grid
      item
      container
      sm={12}
      spacing={3}
      direction="row"
      className={classes.mainGrid}
      alignItems="flex-start"
    >
      <Grid item xs={12}>
        <FloatCard>
          {displayAlert()}
          <div className={classes.tabRoot}>
            <Tabs
              orientation="horizontal"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              className={classes.tabs}
            >
              <Tab label="Add User" {...a11yProps(0)} />
              <Tab label="Users" {...a11yProps(1)} />
              <Tab label="Account" {...a11yProps(2)} />
            </Tabs>
            <TabPanel value={value} index={0}>
              {userAccess ? (
                <Grid
                  container
                  spacing={3}
                  justify="center"
                  alignItems="center"
                  className={classes.mainGrid}
                >
                  <Grid item xs={12} align="center">
                    <Container>
                      <form className={classes.form} onSubmit={addNewUser}>
                        <Grid
                          container
                          spacing={2}
                          justify="space-between"
                          direction="row"
                          className={classes.gridCont}
                        >
                          <Grid item xs={12} md={6} lg={6}>
                            <Grid container alignItems="center" spacing={3}>
                              <Grid item xs={11} align="left">
                                <Grid item xs={11} align="left">
                                  <Typography className={classes.title}>
                                    Send invitations to your employees and they
                                    will be able to create their accounts by
                                    clicking the invitation link.
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Grid
                                item
                                container
                                alignItems="center"
                                spacing={3}
                              >
                                <Grid item xs={12} align="left">
                                  <TextField
                                    label="Name"
                                    name="name"
                                    type="text"
                                    size="small"
                                    variant="outlined"
                                    value={formData.name}
                                    onChange={setForm}
                                    className={classes.shortTextField}
                                    required
                                  />
                                </Grid>
                                <Grid item xs={12} align="left">
                                  <TextField
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    size="small"
                                    variant="outlined"
                                    value={formData.email}
                                    onChange={setForm}
                                    className={classes.shortTextField}
                                    required
                                  />
                                </Grid>
                                <Grid item xs={12} align="left">
                                  <TextField
                                    label="Message"
                                    name="message"
                                    type="text"
                                    size="small"
                                    variant="outlined"
                                    value={formData.message}
                                    onChange={setForm}
                                    className={classes.shortTextField}
                                    required
                                    multiline
                                    rows={3}
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid item xs={12} md={6} lg={6}>
                            <Grid container alignItems="center" spacing={3}>
                              <Grid item xs={12} align="left">
                                <Grid item xs={12} align="left">
                                  <Typography className={classes.title}>
                                    Set access privileges
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Grid item xs={12} align="left">
                                <List component="nav">
                                  <Grid
                                    container
                                    spacing={1}
                                    justify="space-between"
                                    direction="row"
                                    className={classes.gridCont}
                                  >
                                    {accessTokens.map((x, i) => {
                                      return (
                                        <Grid
                                          item
                                          xs={12}
                                          md={12}
                                          lg={6}
                                          align="left"
                                        >
                                          <ListItem
                                            className={classes.listItem}
                                            key={i}
                                            role={undefined}
                                            dense
                                            button
                                            disabled={
                                              x.value === "singlejob"
                                                ? checked
                                                    .map((x) => x.name)
                                                    .includes("alljobs")
                                                  ? true
                                                  : false
                                                : x.value === "singleresume"
                                                ? checked
                                                    .map((x) => x.name)
                                                    .includes("allresume")
                                                  ? true
                                                  : false
                                                : false
                                            }
                                            onClick={handleChecked(x.value, i)}
                                          >
                                            <ListItemIcon
                                              className={classes.itemCheckBox}
                                            >
                                              <Checkbox
                                                edge="start"
                                                checked={
                                                  checked.findIndex(
                                                    (x) => x.index === i
                                                  ) !== -1
                                                }
                                                tabIndex={-1}
                                                disableRipple
                                                className={classes.checkBox}
                                                inputProps={{
                                                  "aria-labelledby": i,
                                                }}
                                              />
                                            </ListItemIcon>
                                            <ListItemText
                                              id="i"
                                              primary={x.description}
                                            />
                                          </ListItem>
                                        </Grid>
                                      );
                                    })}
                                  </Grid>
                                </List>
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
                              alignItems="left"
                              justify="left"
                              spacing={3}
                            >
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
                                    className={classes.button}
                                  >
                                    Send Invitation
                                  </Button>
                                </Grid>
                                <Grid item>
                                  <Link to="/">
                                    <Button
                                      fullWidth
                                      variant="contained"
                                      className={classes.cancel}
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
                  </Grid>
                </Grid>
              ) : (
                <NoAccess />
              )}
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Grid
                container
                spacing={3}
                justify="center"
                alignItems="center"
                className={classes.mainGrid}
              >
                <Grid item xs={12} align="center">
                  {userAccess ? <UsersTable /> : <NoAccess />}
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Grid
                container
                justify="left"
                alignItems="left"
                className={classes.mainGrid}
                spacing={2}
                direction="column"
              >
                <form onSubmit={handleChangePassword}>
                  <Grid item xs={12}>
                    <Grid item xs={12} md={12} lg={6} align="left">
                      <Grid container spacing={3}>
                        <Grid item xs={12} align="left">
                          <Typography variant="h5">Change Password</Typography>
                          <Typography>
                            Please provide your previous password to change the
                            password.
                          </Typography>
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
                          <TextField
                            label="Old Password"
                            name="oldPassword"
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            size="small"
                            variant="outlined"
                            required
                          />
                        </Grid>
                        <Grid item xs={6} align="left">
                          <TextField
                            label="New Password"
                            name="newPassword"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            size="small"
                            variant="outlined"
                            required
                          />
                        </Grid>
                        <Grid item xs={6} align="left">
                          <TextField
                            label="Confirm New Password"
                            name="confirmNewPassword"
                            type="password"
                            value={confirmNewPassword}
                            onChange={(e) =>
                              setConfirmNewPassword(e.target.value)
                            }
                            size="small"
                            variant="outlined"
                            required
                          />
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
                        alignItems="left"
                        justify="left"
                        spacing={3}
                      >
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
                              className={classes.button}
                            >
                              Change Password
                            </Button>
                          </Grid>
                          <Grid item>
                            <Link to="/">
                              <Button
                                fullWidth
                                variant="contained"
                                className={classes.cancel}
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
                <Box mt={5} />
                <form onSubmit={handleClickOpen}>
                  <Grid item xs={12}>
                    <Grid item xs={12} md={12} lg={6} align="left">
                      <Grid container spacing={3}>
                        <Grid item xs={12} align="left">
                          <Typography variant="h5">Delete Account</Typography>
                          <Typography>
                            Please provide your password to delete your account.
                            All the data regarding to your account (except
                            payment history) will be deleted from Flamingo.com
                          </Typography>
                        </Grid>
                        <Grid item xs={12} align="left">
                          <TextField
                            label="Password"
                            name="deletePassword"
                            type="password"
                            value={deletePassword}
                            onChange={(e) => setDeletePassword(e.target.value)}
                            size="small"
                            variant="outlined"
                            required
                          />
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
                        alignItems="left"
                        justify="left"
                        spacing={3}
                      >
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
                              className={classes.button}
                            >
                              Delete Account
                            </Button>
                          </Grid>
                          <Grid item>
                            <Link to="/">
                              <Button
                                fullWidth
                                variant="contained"
                                className={classes.cancel}
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
              </Grid>
            </TabPanel>
          </div>
        </FloatCard>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="edit-details-form"
          fullWidth
          className={classes.dialogBox}
        >
          <DialogTitle id="edit-details-form">Are you sure?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You are going to permanently delete your account from
              Flamingo.com. Please confirm to delete your account.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={deleteUser}
              color="primary"
              className={classes.dialogbuttons}
            >
              Confirm and Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  );
};

export default Settings;
