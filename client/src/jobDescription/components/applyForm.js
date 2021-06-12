import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Card,
  Grid,
  Container,
  Button,
  TextField,
} from "@material-ui/core";
import PublishIcon from '@material-ui/icons/Publish';
import { findByLabelText } from "@testing-library/dom";

const testStyles = makeStyles((theme) => ({
  border: {
    border: "1px solid red",
  },
  res: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  formTitle: {
    marginBottom: theme.spacing(3),
    textAlign:"left"
  },
  textField: {
    marginBottom: theme.spacing(3),
  },
  uploadButton: {
    width: "250px",
  },
  input: {
    display: "none",
  },
  uploadBtnIcon: {
    marginRight: "5px",
  },
  submitButton:{
    width: "250px",
    marginTop: theme.spacing(3),
  },
}));

const ApplyForm = () => {
  const { border, res, formTitle, textField, uploadButton, input, uploadBtnIcon, submitButton } =
    testStyles();
  return (
    <Container className={res}>
      <Typography variant="h6" className={formTitle} id="applyForm">
        Apply for this job
      </Typography>
      <form>
        <TextField
          required
          id="name"
          label="Name with initials"
          variant="outlined"
          fullWidth
          className={textField}
        />
        <TextField
          required
          id="email"
          label="Email"
          variant="outlined"
          fullWidth
          className={textField}
        />
        <TextField
          required
          id="phonenumber"
          label="Phone number"
          variant="outlined"
          fullWidth
          className={textField}
        />

        <div style={{ color: "#fff" }}>
          <input
            accept="image/*"
            className={input}
            id="cv-file"
            multiple
            type="file"
          />
          <label htmlFor="cv-file">
            <Button
              variant="outlined"
              color="primary"
              component="span"
              startIcon={<PublishIcon />}
              className={uploadButton}
            >
              Upload resume
            </Button>
          </label>
        </div>
        <Button
          variant="contained"
          color="primary"
          className={submitButton}
        >
          Submit Application
        </Button>
      </form>
    </Container>
  );
};

export default ApplyForm;
