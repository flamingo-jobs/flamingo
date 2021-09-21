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
import axios from "axios";
import React, { useState } from "react";
import SnackBarAlert from "../../../components/SnackBarAlert";
import BACKEND_URL from "../../../Config";

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

function ChangeEmail() {
  const classes = useStyles();

  const [otp, setOtp] = useState("");
  const handleEmailChange = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleEmailChange}>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12} align="left">
            <Typography variant="h5">Change Email Address</Typography>
          </Grid>
          <Grid item xs={12} md={12} lg={6} align="left">
            <Typography>
              Please insert the one time password we sent to your current email.
            </Typography>
            <Typography variant="caption" display="block">
              Click Request OTP button to recieve the code
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} lg={6}>
            <Grid container spacing={2}>
              <Grid item xs={12} align="left">
                <TextField
                  label="OTP Code"
                  name="otp"
                  type="password"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  size="small"
                  variant="outlined"
                  required
                />
                <Button style={{ marginLeft: "1em", color: "blue" }}>
                  Request OTP
                </Button>
              </Grid>

              <Grid
                item
                container
                xs={12}
                className={classes.actions}
                spacing={2}
              >
                <Grid item>
                  <Button fullWidth type="submit" className={classes.button}>
                    Verify & Change Email
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
      </Grid>
    </form>
  );
}

export default ChangeEmail;
