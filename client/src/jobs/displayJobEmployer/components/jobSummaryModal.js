import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Modal,
  Button,
  IconButton,
  MenuItem,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { StateBlueTextField } from "../styles/customTextField";
import FloatCard from "../../../components/FloatCard";

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
}));

// style={{border: "1px solid red"}}
const JobSummaryModal = (props) => {
  const classes = useStyles();

  return (
    <>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        <Card className={classes.root}>
          <CardContent className={classes.cardContent}>
            <Grid container xs={12}>
              <div className={classes.closeBtnContainer}>
                <IconButton
                  onClick={props.handleClose}
                  className={classes.closeButton}
                >
                  <CloseIcon className={classes.closeIcon} />
                </IconButton>
              </div>

              <Grid item xs={12} className={classes.formContainer}>
                <Typography align="center" className={classes.title}>
                  Basic details
                </Typography>
                <form onSubmit={props.handleSummarySubmit}>
                  <Grid container xs={12}>
                    <Grid item xs={12}>
                      <StateBlueTextField
                        required
                        id="title"
                        name="title"
                        label="Title"
                        variant="outlined"
                        fullWidth
                        value={props.job.title}
                        className={classes.textField}
                        onChange={props.handleSummaryChange}
                      />
                    </Grid>

                    {/* Category    */}
                    <Grid container spacing={1} className={classes.textField}>
                      <Grid item xs={6}>
                        <StateBlueTextField
                          id="category"
                          name="category"
                          select
                          label="Category"
                          value={props.job.category}
                          onChange={props.handleSummaryChange}
                          variant="outlined"
                          fullWidth
                        >
                          {props.categories.map((category) => (
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
                          name="type"
                          select
                          label="Job type"
                          value={props.job.type}
                          onChange={props.handleSummaryChange}
                          variant="outlined"
                          fullWidth
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
                      required
                      id="description"
                      name="description"
                      label="Description of the job"
                      variant="outlined"
                      fullWidth
                      multiline
                      className={classes.textField}
                      value={props.job.description}
                      onChange={props.handleSummaryChange}
                    />

                    {/* Location & Due date */}
                    <Grid container spacing={1} className={classes.textField}>
                      <Grid item xs={6}>
                        <StateBlueTextField
                          id="location"
                          name="location"
                          select
                          label="Location"
                          value={props.job.location}
                          onChange={props.handleSummaryChange}
                          variant="outlined"
                          fullWidth
                        >
                          {props.locations.map((location) => (
                            <MenuItem key={location} value={location}>
                              {location}
                            </MenuItem>
                          ))}
                        </StateBlueTextField>
                      </Grid>

                      {/* <Grid item xs={6}>
                        <Grid container className={classes.textField}>
                          <Grid item container xs={6} justify="flex-start">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <KeyboardDatePicker
                                format="MM/dd/yyyy"
                                id="dueDate"
                                name="dueDate"
                                label="Due Date"
                                // value={selectedDate}
                                // onChange={handleSummaryChange}
                                KeyboardButtonProps={{
                                  "aria-label": "change date",
                                }}
                              />
                            </MuiPickersUtilsProvider>
                          </Grid>
                        </Grid>
                      </Grid> */}
                    </Grid>

                    {/* Salary range */}
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <StateBlueTextField
                          id="minSalary"
                          name="min"
                          label="Minimum Salary"
                          onChange={props.handleSummaryChange}
                          variant="outlined"
                          placeholder=""
                          fullWidth
                          value={props.job.salaryRange.min}
                        ></StateBlueTextField>
                      </Grid>

                      <Grid item xs={6}>
                        <StateBlueTextField
                          id="maxSalary"
                          name="max"
                          label="Maximum Salary"
                          onChange={props.handleSummaryChange}
                          variant="outlined"
                          fullWidth
                          value={props.job.salaryRange.max}
                        ></StateBlueTextField>
                      </Grid>
                    </Grid>
                    {/* <Grid item>

                    </Grid> */}
                    <div className={classes.submitBtnContainer}>
                      <Button
                        variant="contained"
                        type="submit"
                        className={classes.submitBtn}
                      >
                        Save changes
                      </Button>
                    </div>
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Modal>
    </>
  );
};

export default JobSummaryModal;
