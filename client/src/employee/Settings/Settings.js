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
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import SnackBarAlert from "../../components/SnackBarAlert";
import axios from "axios";
import BACKEND_URL from "../../Config";
import FloatCard from "../../components/FloatCard";
const jwt = require("jsonwebtoken");

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
      userID: userData.userId,
      loginId: sessionStorage.getItem("loginId"),
      role: userData.userRole,
      accessTokens: userData.accessTokens,
    };
    console.log(deleteUserData);
    axios.post(`${BACKEND_URL}/api/remove-user`, deleteUserData).then((res) => {
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
              <Tab label="Account" {...a11yProps(0)} />
            </Tabs>

            <TabPanel value={value} index={0}>
              <Grid
                container
                justify="center"
                alignItems="center"
                className={classes.mainGrid}
                spacing={3}
              >
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
