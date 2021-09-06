import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Link,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import SnackBarAlert from "../../components/SnackBarAlert";
import BACKEND_URL from "../../Config";
import axios from "axios";
const jwt = require("jsonwebtoken");

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 10,
    margin: "30px 10px 30px 10px",
    flexGrow: 1,
    paddingBottom: 24,
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
  verifiedBadge: {
    width: "15px",
    height: "15px",
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

const VerificationSettings = () => {
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
          <form onSubmit={handleClickOpen}>
            <Grid item xs={12}>
              <Grid item xs={12} md={12} lg={6} align="left">
                <Grid container spacing={3}>
                  <Grid item xs={12} align="left">
                    <Typography variant="h5">Verify Account</Typography>
                    <Typography>
                      Please provide your business registration document or any
                      other relevant document to verify your company. You will
                      receive the verified badge{" "}
                      <VerifiedUserIcon
                        color="primary"
                        className={classes.verifiedBadge}
                      />{" "}
                      after your name inside Flamingo.com when our support
                      center verifies your business.
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
                        className={classes.button}
                      >
                        Request Verification
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button type="reset" fullWidth className={classes.cancel}>
                        Cancel
                      </Button>
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

export default VerificationSettings;
