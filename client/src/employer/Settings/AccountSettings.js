import {
  Box,
  Button, Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, Grid, Link, makeStyles, TextField, Typography
} from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import SnackBarAlert from "../../components/SnackBarAlert";
import BACKEND_URL from "../../Config";
const jwt = require("jsonwebtoken");
const passwordRegexp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/;

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 10,
    margin: "30px 10px 30px 10px",
    flexGrow: 1,
    paddingBottom: 24
  },
  mainGrid: {
    paddingLeft: 12,
    paddingBottom: 12,
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
  deleteButton: {
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
  dialogbuttons: {
    color: "red",
  },
}));

const AccountSettings = () => {
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
              // console.log(err)
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
        {displayAlert()}
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
              <Grid container spacing={3} direction="column">
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
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
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
                      Please provide your password to delete your account. All
                      the data regarding to your account (except payment
                      history) will be deleted from Flamingo.com
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
                        
                        className={classes.deleteButton}
                      >
                        Delete Account
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
        </Grid>
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

export default AccountSettings;
