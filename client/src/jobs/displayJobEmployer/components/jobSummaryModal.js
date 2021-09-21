import DateFnsUtils from "@date-io/date-fns";
import {
  Button, Card,
  CardContent, createMuiTheme, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton,
  MenuItem, Modal, Typography
} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import { makeStyles } from "@material-ui/core/styles";
import Switch from '@material-ui/core/Switch';
import CloseIcon from "@material-ui/icons/Close";
import {
  KeyboardDatePicker, MuiPickersUtilsProvider
} from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/styles";
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
    maxHeight: "98vh",
    overflowY: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "95%"
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
  },
  title: {
    color: theme.palette.stateBlue,
    marginBottom: theme.spacing(3),
    fontSize: "23px",
    fontWeight: 500,
    borderBottom: "1px solid #ddd",
  },
  location: {
    // paddingTop: "6px",
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
  numberOfVacancies: {
    // marginTop: theme.spacing(2),
  },
  publishBtnContainer: {
    marginTop: theme.spacing(1),
  },
  submitBtnContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column-reverse",
      justifyContent: "center",
    },
  },
  submitBtn: {
    background: theme.palette.stateBlue,
    color: theme.palette.white,
    "&:hover": {
      background: theme.palette.stateBlue,
      color: theme.palette.white,
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%"
    },
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1)
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(1)
    },
  },
  cancelBtn: {
    [theme.breakpoints.down("xs")]: {
      width: "100%"
    },

  },
  date: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
}));

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

// style={{border: "1px solid red"}}
const JobSummaryModal = (props) => {
  const classes = useStyles();
  const today = new Date();
  
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
              Basic details
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Grid container>
              <Grid item xs={12}>
                <StateBlueTextField
                  id="title"
                  name="title"
                  label="Title"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={props.job.title}
                  className={classes.textField}
                  onChange={props.handleSummaryChange}
                  error={props.errors.hasOwnProperty("title")}
                  helperText={props.errors["title"]}
                />
              </Grid>

              {/* Category    */}
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <StateBlueTextField
                    id="category"
                    name="category"
                    select
                    label="Category"
                    value={props.job.category}
                    onChange={props.handleSummaryChange}
                    variant="outlined"
                    fullWidth
                    size="small"
                    className={classes.textField}
                  >
                    {props.categories.map((category) => (
                      <MenuItem key={category.id} value={category.name}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </StateBlueTextField>
                </Grid>

                {/* Job type */}
                <Grid item xs={12} sm={6}>
                  <StateBlueTextField
                    id="jobType"
                    name="type"
                    select
                    label="Job type"
                    value={props.job.type}
                    onChange={props.handleSummaryChange}
                    variant="outlined"
                    fullWidth
                    size="small"
                    className={classes.textField}
                  >
                    {props.types.map((type) => (
                      <MenuItem key={type.id} value={type.name}>
                        {type.name}
                      </MenuItem>
                    ))}
                  </StateBlueTextField>
                </Grid>
              </Grid>

              {/* Description */}
              <StateBlueTextField
                id="description"
                name="description"
                label="Description of the job"
                variant="outlined"
                fullWidth
                multiline
                className={classes.textField}
                value={props.job.description}
                onChange={props.handleSummaryChange}
                error={props.errors.hasOwnProperty("description")}
                helperText={props.errors["description"]}
              />

              {/* Location & Due date */}
              <Grid container spacing={1} className={classes.textField}>
                <Grid item xs={12} sm={6}>
                  <StateBlueTextField
                    id="location"
                    name="location"
                    select
                    label="Location"
                    value={props.job.location}
                    onChange={props.handleSummaryChange}
                    variant="outlined"
                    fullWidth
                    size="small"
                    className={classes.location}
                  >
                    {props.locations.map((location) => (
                      <MenuItem key={location} value={location}>
                        {location}
                      </MenuItem>
                    ))}
                  </StateBlueTextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Grid container>
                    <div className={classes.date}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <ThemeProvider theme={materialTheme}>
                          <KeyboardDatePicker
                            format="dd/MM/yyyy"
                            minDate={today}
                            id="dueDate"
                            name="dueDate"
                            label="Due Date"
                            value={props.job.dueDate}
                            onChange={props.handleDueDateChange}
                            KeyboardButtonProps={{
                              "aria-label": "change date",
                            }}
                            size="small"
                          />
                        </ThemeProvider>
                      </MuiPickersUtilsProvider>
                    </div>
                  </Grid>
                </Grid>
              </Grid>

              {/* Required Degrees & Experience */}
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <StateBlueTextField
                    id="minEducation"
                    name="minimumEducation"
                    select
                    label="Minimum Education Requirement"
                    value={props.job.minimumEducation}
                    size="small"
                    onChange={props.handleSummaryChange}
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                  >
                    {props.minEducationList.map((edu) => (
                      <MenuItem key={edu} value={edu}>
                        {edu}
                      </MenuItem>
                    ))}
                  </StateBlueTextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <StateBlueTextField
                    id="minExperience"
                    name="minimumExperience"
                    select
                    label="Minimum Experience Required"
                    className={classes.textField}
                    value={props.job.minimumExperience}
                    onChange={props.handleSummaryChange}
                    variant="outlined"
                    size="small"
                    fullWidth
                  >
                    {props.minExperienceList.map((exp) => (
                      <MenuItem key={exp} value={exp}>
                        {exp + " years"}
                      </MenuItem>
                    ))}
                  </StateBlueTextField>
                </Grid>
              </Grid>

              {/* Salary range */}
              <Grid container spacing={1}>
                {/* <Grid item xs={12} sm={6}>
                  <StateBlueTextField
                    id="minSalary"
                    name="min"
                    label="Minimum Salary (LKR)"
                    onChange={props.handleSummaryChange}
                    className={classes.textField}
                    variant="outlined"
                    placeholder=""
                    fullWidth
                    size="small"
                    value={props.job.salaryRange.min}
                    error={props.errors.hasOwnProperty("min")}
                    helperText={props.errors["min"]}
                  ></StateBlueTextField>
                </Grid> */}

                {/* <Grid item xs={12} sm={6}>
                  <StateBlueTextField
                    id="maxSalary"
                    name="max"
                    label="Maximum Salary (LKR)"
                    onChange={props.handleSummaryChange}
                    variant="outlined"
                    fullWidth
                    size="small"
                    className={classes.textField}
                    value={props.job.salaryRange.max}
                    error={props.errors.hasOwnProperty("max")}
                    helperText={props.errors["max"]}
                  ></StateBlueTextField>
                </Grid> */}

                <Grid item xs={12} sm={6}>
                  <StateBlueTextField
                    id="numberOfVacancies"
                    name="numberOfVacancies"
                    label="Number of Vacancies"
                    onChange={props.handleSummaryChange}
                    variant="outlined"
                    fullWidth
                    size="small"
                    className={classes.numberOfVacancies}
                    value={props.job.numberOfVacancies}
                    error={props.errors.hasOwnProperty("numberOfVacancies")}
                    helperText={props.errors["numberOfVacancies"]}
                  ></StateBlueTextField>
                </Grid>
              </Grid>

              {/* isPublished */}
              <FormControl component="fieldset" className={classes.publishBtnContainer}>
                <FormGroup>
                  <FormControlLabel style={{ marginLeft: "0px" }}
                    control={
                      <Switch
                        checked={props.job.isPublished}
                        color="primary"
                        onChange={props.handleSummaryChange}
                        name="isPublished"
                      />
                    }
                    labelPlacement="start"
                    label="Publish the Job"
                  />
                </FormGroup>
              </FormControl>
            </Grid>

          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleClose} style={{ color: "#999" }}>
              Cancel
            </Button>
            <Button type="submit" color="primary" autoFocus onClick={props.handleSummarySubmit}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
    </>
  );
};

export default JobSummaryModal;
