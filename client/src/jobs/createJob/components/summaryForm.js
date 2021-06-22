import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Grid,
  TextField,
  MenuItem,
  Typography,
  Container,
} from "@material-ui/core";
import { StateBlueTextField } from "../styles/customTextField";
import FloatCard from "../../../components/FloatCard";

const useStyles = makeStyles((theme) => ({
  summaryContainer:{
    padding: theme.spacing(3),
  },
  summaryTitle: {
    fontSize: "15px",
    textAlign: "left",
    marginBottom: theme.spacing(2),
  },
  card: {
    marginBottom: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(3),
  },
}));


const jobTypes = [
  {
    id: 1,
    name: "Full-time",
  },
  {
    id: 2,
    name: "Part-time",
  },
];
const categories = [
  {
    id: "design",
    name: "Design",
  },
  {
    id: "Development",
    name: "Development",
  },
];

const SummaryForm = ({
  jobType,
  category,
  handleTitleChange,
  handleCategoryChange,
  handleJobTypeChange,
  handleDescriptionChange,
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
            // helperText="Title of the job"
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
                {jobTypes.map((type) => (
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

          {/* Due Date */}
          {/* <Grid container className={classes.textField}>
            <Grid item container xs={6} justify="flex-start">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  format="MM/dd/yyyy"
                  id="dueDate"
                  label="Due Date"
                  // value={selectedDate}
                  // onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid> */}
        </Container>
      </FloatCard>
    </Grid>
  );
};

export default SummaryForm;
