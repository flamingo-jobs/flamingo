import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container, Typography, Button } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";

// Custom components
import FloatCard from "../../../components/FloatCard";
import { StateBlueTextField } from "./customTextField";

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(2),
    // border: "1px solid red",
  },
  additionalSkillsTitle: {
    fontSize: "15px",
    textAlign: "left",
    color: theme.palette.stateBlue,
  },
  additionalSkillsContainer: {
    padding: theme.spacing(3),
  },
  buttonContainer: {
    paddingTop: theme.spacing(3),
  },
  mainContainer: {
    padding: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "0px",
      paddingRight: "0px",
    },
  },
  chip: {
    color: theme.palette.white,
    background: theme.palette.stateBlue,
    marginLeft: "2px",
    marginRight: "2px",
  },
  submitButton: {
    background: theme.palette.stateBlue,
    "&:hover": {
      background: theme.palette.stateBlueHover,
    },
  },
}));

const AdditionalSkills = ({
  additionalSkillsState,
  handleAdditionalSkillsChange,
}) => {
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
    <Grid item xs={12} className={classes.card}>
      <Grid item container spacing={4} className={classes.mainContainer}>
        <Grid item xs={12}>
          <Autocomplete
            multiple
            id="additionalSkills"
            options={skills.map((skill) => skill)}
            defaultValue={additionalSkillsState}
            freeSolo
            onChange={(event, values) => handleAdditionalSkillsChange(values)}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                  className={classes.chip}
                />
              ))
            }
            renderInput={(params) => (
              <StateBlueTextField
                {...params}
                variant="outlined"
                placeholder="Add additional skills..."
                size="small"
              />
            )}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AdditionalSkills;
