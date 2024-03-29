import DateFnsUtils from "@date-io/date-fns";
import { createMuiTheme, Grid, MenuItem, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  KeyboardDatePicker, MuiPickersUtilsProvider
} from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/styles";
import React from "react";
import { StateBlueTextField } from "./customTextField";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const materialTheme = createMuiTheme({
  spacing: 5,
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: "#5E60CE",
      },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        // backgroundColor: "#5E60CE",
        // color: "white",
      },
    },
    MuiPickersDay: {
      day: {
        color: "#555",
      },
      daySelected: {
        backgroundColor: "#5E60CE",
      },
      dayDisabled: {
        color: "#5E60CE",
      },
      current: {
        color: "#5E60CE",
      },
    },
    MuiPickersModal: {
      dialogAction: {
        color: "#5E60CE",
      },
    },
  },
});

const useStyles = makeStyles((theme) => ({
  summaryContainer: {
    padding: theme.spacing(3),
  },
  summaryTitle: {
    fontSize: "15px",
    textAlign: "left",
    color: theme.palette.stateBlue,
  },
  card: {
    marginBottom: theme.spacing(2),
  },
  mainContainer: {
    padding: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      padding: 16,
      paddingLeft: 5,
      paddingRight: 0,
    }
  },
  dateWrapper: {
    // marginLeft: theme.spacing(2),
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justify: "flex-end",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      justify: "center",

    },
  },
  featuredMsg:{
    color: theme.palette.black,
    display: "flex",
    justify: "flex-start",
    gap: "10px"
  },
}));

const SummaryForm = ({
  title,
  location,
  empLocations,
  jobType,
  description,
  types,
  category,
  categories,
  dueDate,
  minEducation,
  minExperience,
  minEducationList,
  minExperienceList,
  minSalary,
  maxSalary,
  numberOfVacancies,
  handleTextFieldChange,
  handleCategoryChange,
  handleJobTypeChange,
  handleLocationChange,
  handleDateChange,
  handleMinSalaryChange,
  handleMaxSalaryChange,
  handleVacanciesChange,
  handleMinEducationChange,
  handleMinExperienceChange,
  errors
}) => {
  const classes = useStyles();
  const today = new Date();
  // style={{border: "1px solid red"}}
  return (
    <Grid item xs={12} className={classes.card}>
        <Grid item container spacing={4} className={classes.mainContainer}>
          {/* Title of the Job */}

          <Grid item xs={12}>
            <StateBlueTextField
              id="title"
              name="title"
              label="Title *"
              variant="outlined"
              size="small"
              fullWidth
              value={title}
              className={classes.textField}
              onChange={handleTextFieldChange}
              error={errors.hasOwnProperty("title")}
              helperText={errors["title"]}
            />
          </Grid>

          {/* Category    */}
          <Grid item xs={12} md={6}>
            <StateBlueTextField
              id="category"
              select
              label="Category"
              value={category}
              onChange={handleCategoryChange}
              variant="outlined"
              size="small"
              fullWidth
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </StateBlueTextField>
          </Grid>

          {/* Job type */}
          <Grid item xs={12} md={6}>
            <StateBlueTextField
              id="jobType"
              select
              label="Job type"
              value={jobType}
              onChange={handleJobTypeChange}
              variant="outlined"
              size="small"
              fullWidth
            >
              {types.map((type) => (
                <MenuItem key={type.id} value={type.name}>
                  {type.name}
                </MenuItem>
              ))}
            </StateBlueTextField>
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
            <StateBlueTextField
              id="description"
              name="description"
              label="Description of the job opportunity *"
              variant="outlined"
              fullWidth
              size="small"
              multiline
              value={description}
              className={classes.textField}
              onChange={handleTextFieldChange}
              error={errors.hasOwnProperty("description")}
              helperText={errors["description"]}
            />
          </Grid>

          {/* Location & Due date */}
          <Grid item xs={12} md={6}>
            <StateBlueTextField
              id="location"
              select
              label="Location"
              size="small"
              value={location}
              onChange={handleLocationChange}
              variant="outlined"
              fullWidth
            >
              {empLocations.map((location) => (
                <MenuItem key={location} value={location}>
                  {location}
                </MenuItem>
              ))}
            </StateBlueTextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <div className={classes.dateWrapper}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <ThemeProvider theme={materialTheme}>
                  <KeyboardDatePicker
                    format="dd/MM/yyyy"
                    placeholder="DD/MM/YYYY"
                    id="dueDate"
                    label="Due Date"
                    size="small"
                    value={dueDate}
                    minDate={today}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "Change date",
                    }}
                  />
                </ThemeProvider>
              </MuiPickersUtilsProvider>
            </div>
          </Grid>

          {/* Required Degrees & Experience */}
          <Grid item xs={12} md={6}>
            <StateBlueTextField
              id="minEducation"
              select
              label="Minimum Education Requirement"
              value={minEducation}
              size="small"
              onChange={handleMinEducationChange}
              variant="outlined"
              fullWidth
            >
              {minEducationList.map((edu) => (
                <MenuItem key={edu} value={edu}>
                  {edu}
                </MenuItem>
              ))}
            </StateBlueTextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <StateBlueTextField
              id="minExperience"
              select
              label="Minimum Experience Required"
              value={minExperience}
              onChange={handleMinExperienceChange}
              variant="outlined"
              size="small"
              fullWidth
            >
              {minExperienceList.map((exp) => (
                <MenuItem key={exp} value={exp}>
                  {exp + " years"}
                </MenuItem>
              ))}
            </StateBlueTextField>
          </Grid>

          {/* Salary range */}
          {/* <Grid item xs={12} md={6}>
            <StateBlueTextField
              id="minSalary"
              name="minSalary"
              label="Minimum Salary (LKR)"
              onChange={handleMinSalaryChange}
              variant="outlined"
              placeholder=""
              fullWidth
              size="small"
              value={minSalary}
              error={errors.hasOwnProperty("minSalary")}
              helperText={errors["minSalary"]}
            ></StateBlueTextField>
          </Grid> */}

          {/* <Grid item xs={12} md={6}>
            <StateBlueTextField
              id="maxSalary"
              name="maxSalary"
              label="Maximum Salary (LKR)"
              onChange={handleMaxSalaryChange}
              variant="outlined"
              fullWidth
              size="small"
              value={maxSalary}
              error={errors.hasOwnProperty("maxSalary")}
              helperText={errors["maxSalary"]}
            ></StateBlueTextField>
          </Grid> */}

          <Grid item xs={12} md={6}>
            <StateBlueTextField
              id="numberOfVacancies"
              name="numberOfVacancies"
              label="Number of Vacancies"
              onChange={handleVacanciesChange}
              variant="outlined"
              fullWidth
              size="small"
              value={numberOfVacancies}
              error={errors.hasOwnProperty("numberOfVacancies")}
              helperText={errors["numberOfVacancies"]}
            ></StateBlueTextField>
          </Grid>

          <Grid item xs={12}>
            <div className={classes.featuredMsg}>
              <ErrorOutlineIcon/>
              <Typography align="left">Job will get featured if all the optional fields are filled.</Typography>
            </div>
          </Grid>
        </Grid>
    </Grid >
  );
};

// style={{border: "1px solid red"}}
export default SummaryForm;
