import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  IconButton,
  Container,
  Button,
  TextField,
} from "@material-ui/core";
import PublishIcon from "@material-ui/icons/Publish";
import { findByLabelText } from "@testing-library/dom";
import FloatCard from "../../components/FloatCard";
import BACKEND_URL from "../../Config";
import axios from "axios";
import DescriptionIcon from "@material-ui/icons/Description";
import CloseIcon from '@material-ui/icons/Close';
import SnackBarAlert from "../../components/SnackBarAlert";

const useStyles = makeStyles((theme) => ({
  applyFormWrapper: {
    marginTop: theme.spacing(3),
  },
  res: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  formTitle: {
    marginBottom: theme.spacing(3),
    textAlign: "left",
    color: theme.palette.black,
  },
  textField: {
    marginBottom: theme.spacing(3),
  },
  uploadButton: {
    width: "250px",
    color: theme.palette.stateBlue,
    borderColor: theme.palette.stateBlue,
    "&:hover": {
      borderColor: theme.palette.stateBlue,
    },
  },
  input: {
    display: "none",
  },
  uploadBtnIcon: {
    marginRight: "5px",
  },
  submitButton: {
    width: "250px",
    marginTop: theme.spacing(2),
    background: theme.palette.stateBlue,
    transition: "0.3s",
    "&:hover": {
      background: theme.palette.stateBlueHover,
      transition: "0.3s",
    },
  },
  fileNameContainer: {
    marginTop: "5px",
    display: "flex",
    justifyContent: "center",
  },
  fileIcon: {
    color: theme.palette.stateBlue,
    marginRight: "7px",
  },
  fileName: {
    paddingTop: "2px",
    color: theme.palette.stateBlue,
    marginRight: "7px",

  },
  removeBtn:{
    padding: "0px",
    "&:hover":{
      background: theme.palette.white,
    }
  },
  removeIcon:{
    height: "18px",
    color: theme.palette.stateBlue,
  },
}));

// const uploadButton = createMuiTheme({
//   palette: {
//     primary: "#5E60CE",
//   },
// });

const ApplyForm = (props) => {
  const classes = useStyles();

  const [userId, setUserId] = useState(props.userId);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fileData, setFileData] = useState("empty");

  const [alertShow, setAlertShow] = React.useState(false);
  const [alertData, setAlertData] = React.useState({ severity: "", msg: "" });

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };
  const handleFileChange = (e) => {
    setFileData(e.target.files[0]);
  };
  const handleFileRemove = () => {
    setFileData("empty");
  }

  // Error related stuff
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

  const displayFileName = () => {
    if (fileData === "empty") {
      return null;
    }
    return (
      <div className={classes.fileNameContainer}>
        <DescriptionIcon className={classes.fileIcon}></DescriptionIcon>
        <div className={classes.fileName}>{fileData.name}</div>
        {/* <IconButton className={classes.removeBtn} onClick={handleFileRemove}>
          <CloseIcon className={classes.removeIcon}/>
        </IconButton> */}
      </div>
    );
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("id", userId);
    data.append("resume", fileData);

    // DB resume details
    const resumeExt =
      "." + fileData.name.split(".")[fileData.name.split(".").length - 1];

    const resumeDetails = {
      applicationDetails: {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        resumeName: userId + resumeExt,
      },
    };

    try {
      const resumeResponse = await axios.post(`${BACKEND_URL}/resume`, data);

      const resumeDetailsResponse = await axios.patch(
        `${BACKEND_URL}/jobseeker/updateResumeDetails/${userId}`,
        resumeDetails
      );

      if (resumeResponse.data.success && resumeDetailsResponse.data.success) {
        // console.log("Resume uploaded");
        setAlertData({
          severity: "success",
          msg: "Application sent!",
        });
        handleAlert();
      } else {
        // console.log("Resume wasn't uploaded");
        setAlertData({
          severity: "error",
          msg: "Something went wrong!",
        });
        handleAlert();
      }
    } catch (err) {
      // console.log("Resume error: ", err);
      setAlertData({
        severity: "error",
        msg: "Something went wrong!",
      });
      handleAlert();
    }
  };

  return (
    <div className={classes.applyFormWrapper}>
      {displayAlert()}
      <FloatCard>
        <Container className={classes.res}>
          <Typography variant="h6" className={classes.formTitle} id="applyForm">
            Apply for this job
          </Typography>
          <form onSubmit={handleFormSubmit} encType="multipart/form-data">
            <TextField
              required
              id="name"
              label="Name with initials"
              variant="outlined"
              fullWidth
              className={classes.textField}
              onChange={handleNameChange}
            />
            <TextField
              required
              id="email"
              label="Email"
              variant="outlined"
              fullWidth
              className={classes.textField}
              onChange={handleEmailChange}
            />
            <TextField
              required
              id="phonenumber"
              label="Phone number"
              variant="outlined"
              fullWidth
              className={classes.textField}
              onChange={handlePhoneNumberChange}
            />

            <div style={{ color: "#fff" }}>
              <input
                accept="image/*"
                className={classes.input}
                id="resume"
                name="resume"
                type="file"
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
                  Upload resume
                </Button>
              </label>
            </div>
            {displayFileName()}
            <Button
              variant="contained"
              color="primary"
              className={classes.submitButton}
              type="submit"
              disabled={name === "" || email === "" || phoneNumber === "" || fileData === "empty"}
            >
              Submit Application
            </Button>
          </form>
        </Container>
      </FloatCard>
    </div>
  );
};

export default ApplyForm;
