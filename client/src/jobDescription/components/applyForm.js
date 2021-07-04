import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Card,
  Grid,
  Container,
  Button,
  TextField,
} from "@material-ui/core";
import PublishIcon from "@material-ui/icons/Publish";
import { findByLabelText } from "@testing-library/dom";
import FloatCard from "../../components/FloatCard";
import BACKEND_URL from "../../Config";
import axios from "axios";

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
    marginTop: theme.spacing(3),
    background: theme.palette.stateBlue,
    transition: "0.3s",
    "&:hover": {
      background: theme.palette.stateBlueHover,
      transition: "0.3s",
    },
  },
}));

// const uploadButton = createMuiTheme({
//   palette: {
//     primary: "#5E60CE",
//   },
// });

const ApplyForm = () => {
  const classes = useStyles();

  const [name, setName] = useState("empty");
  const [email, setEmail] = useState("empty");
  const [phoneNumber, setPhoneNumber] = useState("empty");
  const [fileData, setFileData] = useState();

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
  const handleTextFieldSubmit = () => {
    
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    handleTextFieldSubmit();

    const data = new FormData();

    data.append("resume", fileData);

    try {
      const response = await axios.post(`${BACKEND_URL}/resume`, data);
      if(response.data.success){
        console.log("Resume uploaded", response);
      }else{
        console.log("Resume wasn't uploaded", response);
      }
    } catch (err) {
      console.log("Resume error: ", err);
    }
  };

  return (
    <div className={classes.applyFormWrapper}>
      <FloatCard>
        <Container className={classes.res}>
          <Typography variant="h6" className={classes.formTitle} id="applyForm">
            Apply for this job
          </Typography>
          <form onSubmit={handleFormSubmit}>
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
            <Button
              variant="contained"
              color="primary"
              className={classes.submitButton}
              type="submit"
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
