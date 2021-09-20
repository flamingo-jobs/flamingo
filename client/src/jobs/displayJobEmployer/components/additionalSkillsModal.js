import {
  Button, Card,
  CardContent, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Modal, Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CancelIcon from "@material-ui/icons/Cancel";
import CloseIcon from "@material-ui/icons/Close";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React from "react";
import theme from "../../../Theme";
import { StateBlueTextField } from "./customTextField";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "800px",
    padding: `0px 30px`,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: 10,
    paddingBottom: "30px",
    [theme.breakpoints.down("sm")]: {
      width: "98%",
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  closeBtnContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    marginTop: theme.spacing(2),
  },
  cardContent: {
    "&:last-child": {
      paddingBottom: "20px !important",
    },
    padding: "20px !important",
    margin: "0px",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "0px !important",
      paddingRight: "0px !important",
    }
  },
  title: {
    color: theme.palette.stateBlue,
    marginBottom: theme.spacing(3),
    fontSize: "23px",
    fontWeight: 500,
    borderBottom: "1px solid #ddd",
  },
  closeButton: {
    width: "20px",
    "&:hover": {
      backgroundColor: "#fff",
    },
    padding: "0px",
  },
  closeIcon: {
    color: "#888",
    "&:hover": {
      color: "#555",
    },
  },
  formContainer: {
    marginBottom: "24px",
  },
  textField: {
    marginBottom: theme.spacing(3),
  },
  submitBtnContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: theme.spacing(3),
  },
  submitBtn: {
    background: theme.palette.stateBlue,
    color: theme.palette.white,
    "&:hover": {
      background: theme.palette.stateBlue,
      color: theme.palette.white,
    },
  },
  chip: {
    background: theme.palette.stateBlue,
    color: theme.palette.white,
    marginLeft: "2px",
    marginRight: "2px",
  },
  chipRemove: {
    color: "#f8f9fa",

  },
}));

const JobSummaryModal = (props) => {
  const classes = useStyles();

  const skills = [
    "Cloud and Distributed Computing",
    "Statistical Analysis and Data Mining",
    "SEO/SEM Marketing",
    "Middleware and Integration Software",
    "Mobile Development",
    "Network and Information Security",
    "Public Speaking",
    "Analytical Thinking",
    "Object Oriented Programming",
    "Leadership",
    "Web Development",
    "Data Engineering and Data Warehousing",
    "Algorithm Design",
    "Shell Scripting Languages",
    "Software Modeling and Process Design",
  ];

  return (
    <>
        <Dialog
          open={props.open}
          onClose={props.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="md"
        >
          <DialogTitle id="alert-dialog-title">
            <Typography style={{ color: theme.palette.stateBlue, textAlign: 'left', fontSize: 18, fontWeight: 600 }}>
              Skills
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Grid item xs={12} className={classes.formContainer}>
              <Autocomplete
                multiple
                id="additionalSkills"
                options={skills}
                defaultValue={props.additionalSkills}
                freeSolo
                onChange={(event, values) => props.handleAdditionalSkillsChange(values)}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                      className={classes.chip}
                      deleteIcon={
                        <CancelIcon className={classes.chipRemove} />
                      }
                    />
                  ))
                }
                renderInput={(params) => (
                  <StateBlueTextField
                    {...params}
                    variant="outlined"
                    placeholder="Add a new skills..."
                  />
                )}
              />
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleClose} style={{ color: "#999" }}>
              Cancel
            </Button>
            <Button type="submit" color="primary" autoFocus onClick={props.handleAdditionalSkillsSubmit}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
    </>
  );
};

export default JobSummaryModal;
