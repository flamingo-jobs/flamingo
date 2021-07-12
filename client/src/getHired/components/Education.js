import { React } from "react";
import {
  TextField,
  Grid,
  Typography,
  Container,
  IconButton,
} from "@material-ui/core";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { makeStyles } from "@material-ui/core/styles";
import backgroundImage from "../images/background.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    background: `url(${backgroundImage}) no-repeat`,
    backgroundAttachment: "fixed",
    minHeight: "100vh",
    backgroundSize: "cover",
  },
  container: {
    width: "100%",
    margin: "0 auto",
    paddingTop: 10,
    paddingBottom: 10,
    minHeight: "100vh",
  },
  overlay: {
    backgroundColor: "rgba(213, 239, 247, 0.605)",
    minHeight: "100vh",
  },
  background: {
    background: `url(${backgroundImage}) no-repeat`,
    backgroundSize: "cover",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
  },
  avatar: {
    backgroundColor: theme.palette.lightSkyBlue,
    color: theme.palette.stateBlue,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: 20,
    display: "contents",
  },
  next: {
    boxShadow: "none",
    color: theme.palette.white,
    backgroundColor: theme.palette.skyBlueCrayola,
    borderRadius: 25,
    marginTop: "50px",
    "&:hover": {
      backgroundColor: theme.palette.skyBlueCrayolaHover,
      color: "white",
      boxShadow: "none",
    },
  },
  previous: {
    boxShadow: "none",
    color: theme.palette.white,
    backgroundColor: theme.palette.ashBlue,
    borderRadius: 25,
    marginTop: "50px",
    "&:hover": {
      backgroundColor: theme.palette.ashBlueHover,
      color: "white",
      boxShadow: "none",
    },
  },
  media: {
    height: "80vh",
  },
  textField: {
    [theme.breakpoints.up("md")]: {
      width: "100%",
    },
    "& fieldset": {
      borderColor: theme.palette.tuftsBlue,
    },
    "&:hover fieldset": {
      borderColor: theme.palette.pinkyRed + " !important",
    },
  },
  title: {
    marginBottom: 5,
  },
  animation: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  return: {
    alignSelf: "self-start",
  },
  jobDetailsContainer: {
    textAlign: "left",
    marginBottom: theme.spacing(4),
  },

  sideDrawer: {
    position: "fixed",
    minWidth: "17.9%",
    marginTop: 10,
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
    [theme.breakpoints.up("xl")]: {
      minWidth: "16.66667%",
    },
  },
  sideDrawerGrid: {
    marginTop: 10,
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  mainGrid: {
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
    },
  },
  topBarGrid: {
    paddingTop: "22px !important",
    marginBottom: "auto",
    [theme.breakpoints.down("xs")]: {
      display: "block",
      paddingLeft: "0 !important",
      paddingRight: "0 !important",
    },
  },
  screen: {
    paddingTop: 10,
    paddingBottom: 10,
  },
}));

export const Education = ({
  university,
  handleUniversityInputChange,
  handleUniversityAddClick,
  handleUniversityRemoveClick,
  college,
  handleCollegeInputChange,
  handleCollegeAddClick,
  handleCollegeRemoveClick,
  course,
  handleCourseInputChange,
  handleCourseAddClick,
  handleCourseRemoveClick,
}) => {
  const classes = useStyles();

  return (
    <Container>
      <Grid
        container
        spacing={4}
        justify="space-between"
        className={classes.gridCont}
      >
        {/* University Details */}
        <Grid item xs={12} md={6}>
          <Grid container alignItems="center" spacing={3}>
            <Grid item xs={12} align="left">
              <Typography component={"span"} className={classes.title}>
                <h4>Unversity Details</h4>
              </Typography>
            </Grid>
            <Grid item xs={12} align="left">
              {university.map((x, i) => {
                return (
                  <Grid
                    container
                    alignItems="center"
                    spacing={3}
                    style={{ marginBottom: 20 }}
                    key={i}
                  >
                    <Grid item xs={12} md={9} align="center">
                      <Grid container alignItems="center" spacing={2}>
                        <Grid item xs={12} md={4} align="center">
                          <TextField
                            size="small"
                            className={classes.textField}
                            variant="outlined"
                            fullWidth
                            name="degree"
                            label="Degree"
                            helperText="i.e. BSc/ MSc"
                            value={x.degree}
                            onChange={(e) => handleUniversityInputChange(e, i)}
                          />
                        </Grid>
                        <Grid item xs={12} md={8} align="center">
                          <TextField
                            size="small"
                            className={classes.textField}
                            variant="outlined"
                            fullWidth
                            name="fieldOfStudy"
                            label="Field Of Study"
                            helperText="i.e. Computer Science/ Management"
                            value={x.fieldOfStudy}
                            onChange={(e) => handleUniversityInputChange(e, i)}
                          />
                        </Grid>
                        <Grid item xs={12} align="center">
                          <TextField
                            size="small"
                            className={classes.textField}
                            variant="outlined"
                            fullWidth
                            name="university"
                            label="University Name"
                            value={x.university}
                            onChange={(e) => handleUniversityInputChange(e, i)}
                          />
                        </Grid>
                        <Grid item xs={12} md={4} align="center">
                          <TextField
                            size="small"
                            className={classes.textField}
                            variant="outlined"
                            fullWidth
                            name="GPA"
                            label="GPA"
                            value={x.GPA}
                            onChange={(e) => handleUniversityInputChange(e, i)}
                          />
                        </Grid>
                        <Grid item xs={12} md={4} align="center">
                          <TextField
                            size="small"
                            className={classes.textField}
                            variant="outlined"
                            fullWidth
                            name="startDate"
                            label="From"
                            value={x.startDate}
                            onChange={(e) => handleUniversityInputChange(e, i)}
                          />
                        </Grid>
                        <Grid item xs={12} md={4} align="center">
                          <TextField
                            size="small"
                            className={classes.textField}
                            variant="outlined"
                            fullWidth
                            name="endDate"
                            label="To"
                            value={x.endDate}
                            onChange={(e) => handleUniversityInputChange(e, i)}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} md={3} align="left">
                      {university.length !== 1 && (
                        <IconButton
                          onClick={() => handleUniversityRemoveClick(i)}
                          color="secondary"
                        >
                          <RemoveCircleOutlineIcon />
                        </IconButton>
                      )}
                      {university.length - 1 === i && (
                        <IconButton
                          onClick={handleUniversityAddClick}
                          color="primary"
                        >
                          <AddCircleOutlineIcon />
                        </IconButton>
                      )}
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>

        {/* College Details */}
        <Grid item xs={12} md={6}>
          <Grid container alignItems="center" spacing={3}>
            <Grid item xs={12} align="left">
              <Typography component={"span"} className={classes.title}>
                <h4>School Details</h4>
              </Typography>
            </Grid>
            <Grid item xs={12} align="left">
              {college.map((x, i) => {
                return (
                  <Grid
                    container
                    alignItems="center"
                    spacing={3}
                    style={{ marginBottom: 20 }}
                    key={i}
                  >
                    <Grid item xs={12} md={9} align="center">
                      <Grid container alignItems="center" spacing={2}>
                        <Grid item xs={12} md={12} align="center">
                          <TextField
                            size="small"
                            className={classes.textField}
                            variant="outlined"
                            fullWidth
                            name="school"
                            label="School Name"
                            value={x.school}
                            onChange={(e) => handleCollegeInputChange(e, i)}
                          />
                        </Grid>
                        <Grid item xs={12} md={4} align="center">
                          <TextField
                            size="small"
                            className={classes.textField}
                            variant="outlined"
                            fullWidth
                            name="startDate"
                            label="From"
                            value={x.startDate}
                            onChange={(e) => handleCollegeInputChange(e, i)}
                          />
                        </Grid>
                        <Grid item xs={12} md={4} align="center">
                          <TextField
                            size="small"
                            className={classes.textField}
                            variant="outlined"
                            fullWidth
                            name="endDate"
                            label="To"
                            value={x.endDate}
                            onChange={(e) => handleCollegeInputChange(e, i)}
                          />
                        </Grid>
                        <Grid item xs={12} md={12} align="center">
                          <TextField
                            size="small"
                            className={classes.textField}
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={2}
                            name="description"
                            label="Description"
                            value={x.description}
                            onChange={(e) => handleCollegeInputChange(e, i)}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} md={3} align="left">
                      {college.length !== 1 && (
                        <IconButton
                          onClick={() => handleCollegeRemoveClick(i)}
                          color="secondary"
                        >
                          <RemoveCircleOutlineIcon />
                        </IconButton>
                      )}
                      {college.length - 1 === i && (
                        <IconButton
                          onClick={handleCollegeAddClick}
                          color="primary"
                        >
                          <AddCircleOutlineIcon />
                        </IconButton>
                      )}
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>

        {/* Course Details */}
        <Grid item xs={12} lg={6}>
          <Grid container alignItems="center" spacing={3}>
            <Grid item xs={12} align="left">
              <Typography component={"span"} className={classes.title}>
                <h4>Course Details</h4>
              </Typography>
            </Grid>
            <Grid item xs={12} align="left">
              {course.map((x, i) => {
                return (
                  <Grid
                    container
                    alignItems="center"
                    spacing={3}
                    style={{ marginBottom: 20 }}
                    key={i}
                  >
                    <Grid item xs={12} md={9} align="center">
                      <Grid container alignItems="center" spacing={2}>
                        <Grid item xs={12} align="center">
                          <TextField
                            size="small"
                            className={classes.textField}
                            variant="outlined"
                            fullWidth
                            name="course"
                            label="Course Name"
                            value={x.course}
                            onChange={(e) => handleCourseInputChange(e, i)}
                          />
                        </Grid>
                        <Grid item xs={12} align="center">
                          <TextField
                            size="small"
                            className={classes.textField}
                            variant="outlined"
                            fullWidth
                            name="institute"
                            label="Institute"
                            value={x.institute}
                            onChange={(e) => handleCourseInputChange(e, i)}
                          />
                        </Grid>
                        <Grid item xs={12} md={4} align="center">
                          <TextField
                            size="small"
                            className={classes.textField}
                            variant="outlined"
                            fullWidth
                            name="from"
                            label="From"
                            value={x.from}
                            onChange={(e) => handleCourseInputChange(e, i)}
                          />
                        </Grid>
                        <Grid item xs={12} md={4} align="center">
                          <TextField
                            size="small"
                            className={classes.textField}
                            variant="outlined"
                            fullWidth
                            name="to"
                            label="To"
                            value={x.to}
                            onChange={(e) => handleCourseInputChange(e, i)}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} md={3} align="left">
                      {course.length !== 1 && (
                        <IconButton
                          onClick={() => handleCourseRemoveClick(i)}
                          color="secondary"
                          aria-label="Add new Course"
                        >
                          <RemoveCircleOutlineIcon />
                        </IconButton>
                      )}
                      {course.length - 1 === i && (
                        <IconButton
                          onClick={handleCourseAddClick}
                          color="primary"
                          aria-label="Remobe course"
                        >
                          <AddCircleOutlineIcon />
                        </IconButton>
                      )}
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
