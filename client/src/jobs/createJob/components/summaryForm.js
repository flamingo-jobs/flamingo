import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, MenuItem, Typography, Container } from "@material-ui/core";
import { StateBlueTextField } from "../styles/customTextField";
import FloatCard from "../../../components/FloatCard";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

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
    marginBottom: theme.spacing(2),
    color: theme.palette.stateBlue,
  },
  card: {
    marginBottom: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(3),
  },
  dateWrapper:{
    marginLeft: theme.spacing(2),
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justify: "flex-end"
  },
}));

const SummaryForm = ({
  location,
  empLocations,
  jobType,
  types,
  category,
  categories,
  dueDate,
  handleTitleChange,
  handleCategoryChange,
  handleJobTypeChange,
  handleDescriptionChange,
  handleLocationChange,
  handleDateChange,
  handleMinSalaryChange,
  handleMaxSalaryChange,
}) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} className={classes.card}>
      <FloatCard>
        <Container className={classes.summaryContainer}>
          <Typography className={classes.summaryTitle}>
            Basic details
          </Typography>
          {/* Title of the Job */}
          <StateBlueTextField
            required
            id="title"
            label="Title"
            variant="outlined"
            fullWidth
            className={classes.textField}
            onChange={handleTitleChange}
          />

          {/* Category    */}
          <Grid container spacing={1} className={classes.textField}>
            <Grid item xs={6}>
              <StateBlueTextField
                id="category"
                select
                label="Category"
                value={category}
                onChange={handleCategoryChange}
                variant="outlined"
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
            <Grid item xs={6}>
              <StateBlueTextField
                id="jobType"
                select
                label="Job type"
                value={jobType}
                onChange={handleJobTypeChange}
                variant="outlined"
                fullWidth
              >
                {types.map((type) => (
                  <MenuItem key={type.id} value={type.name}>
                    {type.name}
                  </MenuItem>
                ))}
              </StateBlueTextField>
            </Grid>
          </Grid>

          {/* Description */}
          <StateBlueTextField
            required
            id="description"
            label="Descriptionof the job opportunity"
            variant="outlined"
            fullWidth
            multiline
            className={classes.textField}
            onChange={handleDescriptionChange}
          />

          {/* Location & Due date */}
          <Grid container spacing={1} className={classes.textField}>
            <Grid item xs={6}>
              <StateBlueTextField
                id="location"
                select
                label="Location"
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
            {/* style={{border: "1px solid red"}} */}
            <Grid item xs={6} className={classes.textField}>
                  <div className={classes.dateWrapper}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <ThemeProvider theme={materialTheme}>
                      <KeyboardDatePicker
                        format="dd/MM/yyyy"
                        placeholder="DD/MM/YYYY"
                        id="dueDate"
                        label="Due Date"
                        value={dueDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          "aria-label": "Change date",
                        }}
                      />
                      </ThemeProvider>
                    </MuiPickersUtilsProvider>
                  </div>
            </Grid>
          </Grid>

          {/* Salary range */}
          <Grid container spacing={1} className={classes.textField}>
            <Grid item xs={6}>
              <StateBlueTextField
                id="minSalary"
                label="Minimum Salary"
                onChange={handleMinSalaryChange}
                variant="outlined"
                placeholder=""
                fullWidth
              ></StateBlueTextField>
            </Grid>

            <Grid item xs={6}>
              <StateBlueTextField
                id="maxSalary"
                label="Maximum Salary"
                onChange={handleMaxSalaryChange}
                variant="outlined"
                fullWidth
              ></StateBlueTextField>
            </Grid>
          </Grid>
        </Container>
      </FloatCard>
    </Grid>
  );
};

export default SummaryForm;
