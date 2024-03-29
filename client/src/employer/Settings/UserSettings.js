import {
  Box,
  Button,
  Checkbox,
  Container,
  Grid,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hooks-helper";
import Loading from "../../components/Loading";
import NoAccess from "../../components/NoAccess";
import Reached from "../../components/Reached";
import SnackBarAlert from "../../components/SnackBarAlert";
import BACKEND_URL from "../../Config";
import UsersTable from "../components/UsersTable";
const jwt = require("jsonwebtoken");
require("dotenv").config();

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
const UserSettings = () => {
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

  const resetFormData = () => {
    formData.name = "";
    formData.email = "";
    formData.message = "";
  };
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
        msg: "Please set access privileges for your employee!",
      });
      handleAlert();
      return;
    } else {
      const newUserData = {
        name: formData.name,
        email: formData.email,
        password: process.env.REACT_APP_TOKEN_SECRET,
        password_confirmation: process.env.REACT_APP_TOKEN_SECRET,
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
        let tempEmail = formData.email;
        resetFormData();
        setAlertData({
          severity: "success",
          msg: `Successful! Invitation sent to ${tempEmail}`,
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

  const [subscriptionStatus, setSubscriptionStatus] = useState();
  const retrieveSubscriptionStatus = async () => {
    const empId = sessionStorage.getItem("loginId");
    try {
      const response = await axios.get(
        `${BACKEND_URL}/employer/subscription-status/${empId}`
      );
      if (response.data.success) {
        setSubscriptionStatus(response.data.existingData);
      }
    } catch (err) {
      setAlertData({
        severity: "error",
        msg: "There was an error with server. Please try again!",
      });
      handleAlert();
    }
  };
  useEffect(() => {
    retrieveSubscriptionStatus();
  }, []);

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
        {displayAlert()}
        {subscriptionStatus ? (
          subscriptionStatus.subscriptionType.toLowerCase() === "premium" ||
          subscriptionStatus.remainingUsers > 0 ? (
            <div>
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
                                      Send invitations to your employees and
                                      they will be able to create their accounts
                                      by clicking the invitation link.
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
                                              onClick={handleChecked(
                                                x.value,
                                                i
                                              )}
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
                                      className={classes.button}
                                    >
                                      Send Invitation
                                    </Button>
                                  </Grid>
                                  <Grid item>
                                    <Link to="/">
                                      <Button
                                        fullWidth
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
            </div>
          ) : (
            <Reached message="Maximum amount of users have been registered already" />
          )
        ) : (
          <Loading />
        )}
      </Grid>
    </Grid>
  );
};

export default UserSettings;
