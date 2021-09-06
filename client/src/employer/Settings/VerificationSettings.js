import React, { useState, useEffect, useRef } from "react";
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
  CircularProgress,
} from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import PublishIcon from "@material-ui/icons/Publish";
import DescriptionIcon from "@material-ui/icons/Description";
import SnackBarAlert from "../../components/SnackBarAlert";
import FormSubmit from "../../components/FormSubmit";
import UnderMaintenance from "../../components/UnderMaintenance";
import uploadFileToBlob, {
  isStorageConfigured,
} from "../../utils/azureFileUpload";
import BACKEND_URL from "../../Config";
import axios from "axios";

const jwt = require("jsonwebtoken");
const storageConfigured = isStorageConfigured();

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
  submitBtnWrapper: {
    marginTop: "2em",
  },
  fileNameContainer: {
    marginTop: "5px",
    display: "flex",
    justifyContent: "center",
  },
}));

const VerificationSettings = (props) => {
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

  const timer = useRef();
  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const [loading, setLoading] = React.useState(false);
  const [fileData, setFileData] = useState("empty");
  const [success, setSuccess] = React.useState(false);
  const displayFileName = () => {
    if (fileData === "empty") {
      return null;
    }
    return (
      <div className={classes.fileNameContainer}>
        <DescriptionIcon className={classes.fileIcon}></DescriptionIcon>
        <div className={classes.fileName}>{fileData.name}</div>
      </div>
    );
  };
  const handleFileChange = (e) => {
    setFileData("empty");
    if (e.target.files[0]) {
      let nameSplit = e.target.files[0].name.split(".");
      if (nameSplit[nameSplit.length - 1] !== "pdf") {
        setAlertData({
          severity: "error",
          msg: "Invalid file type, only PDF file type is allowed",
        });
        handleAlert();
      } else {
        setFileData(e.target.files[0]);
      }
    }
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (fileData === "empty") {
      setAlertData({
        severity: "error",
        msg: "You should upload your document first",
      });
      handleAlert();
      return;
    }

    if (!loading && fileData !== "empty") {
      setSuccess(false);
      setLoading(true);

      var file = fileData;
      var blob = file.slice(0, file.size);
      var loginId = sessionStorage.getItem("loginId");
      var newFile = new File([blob], `${loginId}.pdf`, {
        type: "application/pdf",
      });
      await uploadFileToBlob(newFile, "verification");
      createVerificationRequest(loginId);

      setSuccess(true);
      setLoading(false);
    }
  };
  const createVerificationRequest = async (loginId) => {
    let empName = "";
    await axios.get(`${BACKEND_URL}/employers/${loginId}`).then((res) => {
      if (res.data.success) {
        empName = res.data.employer.name;
      }
    });
    const sendData = {
      status: "pending",
      fileName: loginId + ".pdf",
      requestedDate: new Date(),
      employerName: empName,
      employer: loginId,
    };
    axios
      .post(`${BACKEND_URL}/verification/create`, sendData)
      .then((res) => {
        if (res.data.success) {
          updateEmployer(loginId);
        }
      })
      .catch((err) => {
        if (err) {
          setAlertData({
            severity: "error",
            msg: "There was an error when creating verification request. Please contact our support center",
          });
          handleAlert();
        }
      });
  };

  const updateEmployer = async (loginId) => {
    const updateData = { verificationStatus: "pending" };
    axios
      .put(`${BACKEND_URL}/employers/update/${loginId}`, updateData)
      .then((res) => {
        if (res.data.success) {
          setAlertData({
            severity: "success",
            msg: "Verification request created!",
          });
          handleAlert();
        }
      })
      .catch((err) => {
        if (err) {
          setAlertData({
            severity: "error",
            msg: "There was an error when creating verification request. Please contact our support center",
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
          <Grid item xs={12}>
            <Grid item xs={12} align="left">
              {storageConfigured ? (
                success ? (
                  <FormSubmit message="Your document has been uploaded. You will recieve notifications after our support center approves your document" />
                ) : (
                  <Grid container spacing={3}>
                    {props.message === "rejected" ? (
                      <Grid item xs={12} align="left">
                        <Typography variant="h5" color="error">
                          Verification Failed!
                        </Typography>
                        <Typography>
                          Document you have provided has failed to verify your
                          business. Please provide a valid document which can
                          prove your business. If you think this is a mistake,
                          please contact our support center.
                        </Typography>
                      </Grid>
                    ) : (
                      <Grid item xs={12} align="left">
                        <Typography variant="h5">Verify Account</Typography>
                        <Typography>
                          Please provide your business registration document or
                          any other relevant document to verify your company.
                          You will receive the verified badge{" "}
                          <VerifiedUserIcon
                            color="primary"
                            className={classes.verifiedBadge}
                          />{" "}
                          after your name inside Flamingo.com when our support
                          center verifies your business.
                        </Typography>
                      </Grid>
                    )}

                    <Grid item xs={12} align="left">
                      <form
                        onSubmit={handleFormSubmit}
                        encType="multipart/form-data"
                      >
                        <Grid
                          item
                          container
                          md={12}
                          className={classes.actions}
                          spacing={2}
                        >
                          <Grid item>
                            <input
                              className={classes.input}
                              id="resume"
                              name="resume"
                              type="file"
                              accept="application/pdf"
                              hidden
                              onChange={handleFileChange}
                            />
                            <label htmlFor="resume">
                              <Button
                                variant="outlined"
                                color="primary"
                                component="span"
                                startIcon={<PublishIcon />}
                                className={classes.uploadButton}
                              >
                                {fileData === "empty" ? "Upload" : "Change"}{" "}
                                document
                              </Button>
                            </label>
                          </Grid>
                          <Grid item>{displayFileName()}</Grid>
                        </Grid>
                        <div className={classes.submitBtnWrapper}>
                          <Grid
                            item
                            container
                            md={12}
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
                              {loading && (
                                <CircularProgress
                                  size={24}
                                  className={classes.buttonProgress}
                                />
                              )}
                            </Grid>
                            <Grid item>
                              <Button
                                type="reset"
                                fullWidth
                                className={classes.cancel}
                              >
                                Cancel
                              </Button>
                            </Grid>
                          </Grid>
                        </div>
                      </form>
                    </Grid>
                  </Grid>
                )
              ) : (
                <UnderMaintenance message="This service is temporarily down" />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default VerificationSettings;
