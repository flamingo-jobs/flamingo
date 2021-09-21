import React, { useState, useEffect } from "react";
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
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Avatar,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import theme from '../../Theme';
import privateProfile from './images/privateProfile.png';
import SnackBarAlert from "../../components/SnackBarAlert";
import axios from "axios";
import BACKEND_URL from "../../Config";
import FloatCard from "../../components/FloatCard";
const jwt = require("jsonwebtoken");
const passwordRegexp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/;

const useStyles = makeStyles({
  root: {
    borderRadius: 10,
    margin: "30px 10px 30px 10px",
    flexGrow: 1,
  },
  button: {
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: theme.palette.stateBlue,
    color: theme.palette.white,
    "&:hover": {
      backgroundColor: theme.palette.stateBlueHover,
    },
    float: "center",
  },
  DeleteButton: {
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: theme.palette.red,
    color: theme.palette.white,
    "&:hover": {
      backgroundColor: theme.palette.redHover,
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
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "stretch",
    },
  },
  dialogbuttons: {
    color: "red",
  },
  gridCard: {
    display: "grid",
  },
  jobsGrid: {
    maxWidth: 'unset',
    flexDirection: 'column',
    alignItems: "stretch",
    order: 3
  },
});

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
const Settings = (props) => {
  const classes = useStyles();

  const [checked, setChecked] = React.useState(false);
  const [checkboxConfirm, setCheckboxConfirm] = useState(false);

  let loginId;
  let login = false;
  const jwt = require("jsonwebtoken");
  const token = sessionStorage.getItem("userToken");
  const header = jwt.decode(token, { complete: true });
  if(token === null){
    loginId=props.jobseekerID;
  }else if (header.payload.userRole === "jobseeker") {
    login = true;
    loginId=sessionStorage.getItem("loginId");
  } else {
    loginId=props.jobseekerID;
  }

  useEffect(()=>{
    fetchData();
  },[])

  const handleChangeChecked = (event) => {
    setChecked(event.target.checked);
    setCheckboxConfirm(true);
  };

  const handleClickClose = () => {
    setCheckboxConfirm(false);
  };

  function fetchData(){
    axios.get(`${BACKEND_URL}/jobseeker/${loginId}`)
    .then(res => {
      if(res.data.success){
        if(res.data.jobseeker.isPublic !== null){
          if(res.data.jobseeker.isPublic === true){
            setChecked(false);
          }else if(res.data.jobseeker.isPublic === false){
            setChecked(true);
          }
        }       
      }
    })
  }

  const resetVisibility = () => {
    if(checked){
      setChecked(false);
    }else{
      setChecked(true);
    }
    setCheckboxConfirm(false);
  };

  const changeVisibility = () => {
    const data = {
      isPublic : !checked,
    }
    axios.put(`${BACKEND_URL}/jobseeker/update/${loginId}`,data)
    .then(res => {
      if(res.data.success){
        setAlertData({
          severity: "success",
          msg: `Profile visibility changed to ${checked ? "private" : "public"}!`,
        });
        handleAlert();
        fetchData();
      } else {
        setAlertData({
          severity: "error",
          msg: "Couldn't change profile visibility!",
        });
      }
    });
    setCheckboxConfirm(false);
  };

  const [value, setValue] = useState(0);

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
  const deleteUser = async () => {
    const userData = jwt.decode(sessionStorage.getItem("userToken"), {
      complete: true,
    }).payload;
    const deleteUserData = {
      userId: userData.userId,
      loginId: sessionStorage.getItem("loginId"),
      role: userData.userRole,
      accessTokens: userData.accessTokens,
    };
    // console.log(deleteUserData);
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
        const userId = jwt.decode(sessionStorage.getItem("userToken"), {
          complete: true,
        }).payload.userId;
        const newPasswordData = {
          newPassword: newPassword,
          userId: userId,
        };
        axios
          .post(`${BACKEND_URL}/api/change-password`, newPasswordData)
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
    <Grid item container xs={12} spacing={3} direction="column"
      justify="space-between"
      alignItems="flex-start" className={classes.mainGrid}>
      <Grid item container xs={12} md={8} lg={9} spacing={0} direction="row"
        justify="space-between"
        alignItems="flex-start" className={classes.jobsGrid}>
        <Grid item xs={12} className={classes.gridCard}>
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
                <Tab label="Visibility" {...a11yProps(0)} />
                <Tab label="Account" {...a11yProps(1)} />
              </Tabs>
              
              <TabPanel value={value} index={0}>
                <Grid container xs={12}>
                  <Grid item xs={0} md={4}></Grid>
                  <Grid item container xs={12} md={4} spacing={2} justify="center" alignItems="center">
                      <Grid item>
                        <Typography gutterBottom variant="h5" style={{color: theme.palette.stateBlue,fontWeight:'bold',paddingTop:"5px"}}>
                          Wanna Stay Hidden?     
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Avatar alt="private profile image" src={privateProfile} />
                      </Grid>
                      <Grid item xs={12} style={{marginTop:"20px"}}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={checked}
                              // onChange={handleChangeChecked}
                              onClick={handleChangeChecked}
                              name="checkedB"
                              color="primary"
                            />
                          }
                          label="Private Account"
                        />
                        <Dialog
                            open={checkboxConfirm}
                            onClose={handleClickClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{"Confirm Delete?"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Are you sure that you want to make profile {checked ? "private?" : "public?"}
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={resetVisibility} color="primary">
                                    No
                                </Button>
                                <Button 
                                  color="primary" onClick={changeVisibility} autoFocus>
                                    Yes
                                </Button>
                            </DialogActions>
                        </Dialog>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography gutterBottom style={{fontSize:'14px',color:'#666',textAlign:"left"}}>
                          By making your profile private, only the organizations you applied for will be able to view your profile in Flamingo. You will not be visible to other organizations and job seekers.
                        </Typography>
                      </Grid>
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  spacing={2}
                  direction="column"
                >
                  <form onSubmit={handleChangePassword}>
                    <Grid item xs={12}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} align="left">
                          <Typography variant="h5">Change Password</Typography>
                        </Grid>
                        <Grid item xs={12} md={12} lg={6} align="left">
                          <Typography>
                            Please provide your previous password to change the
                            password.
                          </Typography>
                          <Typography variant="caption" display="block">
                            Please make sure that your password contains at least,
                            <ul>
                              <li>8 characters</li>
                              <li>1 uppercase letter</li>
                              <li>1 lowercase letter</li>
                              <li>1 number and 1 special character</li>
                            </ul>
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={12} lg={6}>
                          <Grid container spacing={2}>
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
                            <Grid item xs={12} md={6} align="left">
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
                            <Grid item xs={12} md={6} align="left">
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

                            <Grid
                              item
                              container
                              xs={12}
                              className={classes.actions}
                              spacing={2}
                            >
                              <Grid item>
                                <Button
                                  fullWidth
                                  type="submit"
                                  className={classes.button}
                                >
                                  Change Password
                                </Button>
                              </Grid>
                              <Grid item>
                                <Link to="/">
                                  <Button
                                    fullWidth
                                    className={classes.cancelButton}
                                  >
                                    Cancel
                                  </Button>
                                </Link>
                              </Grid>
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
                                className={classes.DeleteButton}
                              >
                                Delete Account
                              </Button>
                            </Grid>
                            <Grid item>
                              <Link to="/">
                                <Button
                                  fullWidth
                                  className={classes.cancelButton}
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
    </Grid>
  );
};

export default Settings;
