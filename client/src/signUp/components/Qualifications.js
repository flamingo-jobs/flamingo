import React from "react";
import {
  Button,
  TextField,
  Box,
  Grid,
  Typography,
  Container,
  IconButton,
} from "@material-ui/core";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import FloatCard from "../../components/FloatCard";
import backgroundImage from "../images/background.jfif";

const useStyles = makeStyles((theme) => ({
  root: {},
  container: {
    paddingTop: 50,
    paddingBottom: 50,
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
      backgroundColor: theme.palette.tuftsBlue,
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
      backgroundColor: theme.palette.tuftsBlue,
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
}));

export const Qualifications = ({
  navigation,
  school,
  handleSchoolInputChange,
  handleSchoolAddClick,
  handleSchoolRemoveClick,
  course,
  handleCourseInputChange,
  handleCourseAddClick,
  handleCourseRemoveClick,
  award,
  handleAwardInputChange,
  handleAwardAddClick,
  handleAwardRemoveClick,
  achievement,
  handleAchievementInputChange,
  handleAchievementAddClick,
  handleAchievementRemoveClick,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.background}>
      <div className={classes.overlay}>
        <Container className={classes.container}>
          <FloatCard>
            <Container>
              <Container maxWidth="lg" className={classes.jobDetailsContainer}>
                <Box mt={5} mb={5}>
                  <Typography component="h1" variant="h5">
                    Qualifications
                  </Typography>
                </Box>
                <Typography className={classes.title}>
                  Education Details
                </Typography>
                {school.map((x, i) => {
                  return (
                    <Grid container alignItems="center" spacing={2}>
                      <Grid item xs={12} md={6} align="center">
                        <TextField
                          className={classes.textField}
                          variant="outlined"
                          fullWidth
                          name="school"
                          label="Enter School Name"
                          value={x.school}
                          onChange={(e) => handleSchoolInputChange(e, i)}
                        />
                      </Grid>
                      <Grid item xs={12} md={2} align="center">
                        <TextField
                          className={classes.textField}
                          variant="outlined"
                          fullWidth
                          name="schoolFrom"
                          label="From"
                          value={x.schoolFrom}
                          onChange={(e) => handleSchoolInputChange(e, i)}
                        />
                      </Grid>
                      <Grid item xs={12} md={2} align="center">
                        <TextField
                          className={classes.textField}
                          variant="outlined"
                          fullWidth
                          name="schoolTo"
                          label="To"
                          value={x.schoolTo}
                          onChange={(e) => handleSchoolInputChange(e, i)}
                        />
                      </Grid>
                      <Grid item xs={12} md={2} align="center">
                        {school.length !== 1 && (
                          <IconButton
                            onClick={() => handleSchoolRemoveClick(i)}
                            color="secondary"
                            aria-label="Add new school"
                          >
                            <RemoveCircleOutlineIcon />
                          </IconButton>
                        )}
                        {school.length - 1 === i && (
                          <IconButton
                            onClick={handleSchoolAddClick}
                            color="primary"
                            aria-label="Remove school"
                          >
                            <AddCircleOutlineIcon />
                          </IconButton>
                        )}
                      </Grid>
                    </Grid>
                  );
                })}
                <Grid item xs={12} md={6} align="center"></Grid>
                <Grid item xs={12} md={6} align="center"></Grid>
              </Container>

              <Container maxWidth="lg" className={classes.jobDetailsContainer}>
                <Typography className={classes.title}>
                  Course Details
                </Typography>
                {course.map((x, i) => {
                  return (
                    <Grid container alignItems="center" spacing={2}>
                      <Grid item xs={12} md={5} align="center">
                        <TextField
                          className={classes.textField}
                          variant="outlined"
                          fullWidth
                          name="course"
                          label="Course Name"
                          value={x.course}
                          onChange={(e) => handleCourseInputChange(e, i)}
                        />
                      </Grid>
                      <Grid item xs={12} md={5} align="center">
                        <TextField
                          className={classes.textField}
                          variant="outlined"
                          fullWidth
                          name="institute"
                          label="Institute"
                          value={x.institute}
                          onChange={(e) => handleCourseInputChange(e, i)}
                        />
                      </Grid>
                      <Grid item xs={12} md={2} align="center">
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
                <Grid item xs={12} md={6} align="center"></Grid>
                <Grid item xs={12} md={6} align="center"></Grid>
              </Container>

              <Container maxWidth="lg" className={classes.jobDetailsContainer}>
                <Typography className={classes.title}>Award Details</Typography>
                {award.map((x, i) => {
                  return (
                    <Grid container alignItems="center" spacing={2}>
                      <Grid item xs={12} md={4} align="center">
                        <TextField
                          className={classes.textField}
                          variant="outlined"
                          fullWidth
                          name="award"
                          label="Award Title"
                          value={x.award}
                          onChange={(e) => handleAwardInputChange(e, i)}
                        />
                      </Grid>
                      <Grid item xs={12} md={6} align="center">
                        <TextField
                          className={classes.textField}
                          variant="outlined"
                          fullWidth
                          name="awardDescription"
                          label="Award Description"
                          value={x.awardDescription}
                          onChange={(e) => handleAwardInputChange(e, i)}
                        />
                      </Grid>
                      <Grid item xs={12} md={2} align="center">
                        {award.length !== 1 && (
                          <IconButton
                            onClick={() => handleAwardRemoveClick(i)}
                            color="secondary"
                            aria-label="Add new award"
                          >
                            <RemoveCircleOutlineIcon />
                          </IconButton>
                        )}
                        {award.length - 1 === i && (
                          <IconButton
                            onClick={handleAwardAddClick}
                            color="primary"
                            aria-label="Remove award"
                          >
                            <AddCircleOutlineIcon />
                          </IconButton>
                        )}
                      </Grid>
                    </Grid>
                  );
                })}
                <Grid item xs={12} md={6} align="center"></Grid>
                <Grid item xs={12} md={6} align="center"></Grid>
              </Container>

              <Container maxWidth="lg" className={classes.jobDetailsContainer}>
                <Typography className={classes.title}>
                  Achievement Details
                </Typography>
                {achievement.map((x, i) => {
                  return (
                    <Grid container alignItems="center" spacing={2}>
                      <Grid item xs={12} md={4} align="center">
                        <TextField
                          className={classes.textField}
                          variant="outlined"
                          fullWidth
                          name="achievement"
                          label="Achievement Title"
                          value={x.achievement}
                          onChange={(e) => handleAchievementInputChange(e, i)}
                        />
                      </Grid>
                      <Grid item xs={12} md={6} align="center">
                        <TextField
                          className={classes.textField}
                          variant="outlined"
                          fullWidth
                          name="achievementDescription"
                          label="Achievement Description"
                          value={x.achievementDescription}
                          onChange={(e) => handleAchievementInputChange(e, i)}
                        />
                      </Grid>
                      <Grid item xs={12} md={2} align="center">
                        {achievement.length !== 1 && (
                          <IconButton
                            onClick={() => handleAchievementRemoveClick(i)}
                            color="secondary"
                            aria-label="Add new achievement"
                          >
                            <RemoveCircleOutlineIcon />
                          </IconButton>
                        )}
                        {achievement.length - 1 === i && (
                          <IconButton
                            onClick={handleAchievementAddClick}
                            color="primary"
                            aria-label="Remove achievement"
                          >
                            <AddCircleOutlineIcon />
                          </IconButton>
                        )}
                      </Grid>
                    </Grid>
                  );
                })}
                <Grid item xs={12} md={6} align="center"></Grid>
                <Grid item xs={12} md={6} align="center"></Grid>
              </Container>

              <Container className={classes.jobDetailsContainer}>
                <Grid container alignItems="center" spacing={2}>
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    justify="flex-end"
                  >
                    <Grid item sm={6} md={6} align="center">
                      <Grid
                        container
                        alignItems="center"
                        justify="flex-end"
                        spacing={2}
                      >
                        <Grid item align="center">
                          <Button
                            fullWidth
                            variant="outlined"
                            className={classes.previous}
                            onClick={() => navigation.previous()}
                          >
                            Previous
                          </Button>
                        </Grid>{" "}
                        <Grid item align="center">
                          <Button
                            fullWidth
                            variant="contained"
                            className={classes.next}
                            onClick={() => navigation.next()}
                          >
                            Next
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Container>
            </Container>
          </FloatCard>
        </Container>
      </div>
    </div>
  );
};
