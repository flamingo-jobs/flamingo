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
import theme from "../../Theme";
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

export const Preferences = ({
  work,
  handleWorkInputChange,
  handleWorkAddClick,
  handleWorkRemoveClick,
  project,
  handleProjectInputChange,
  handleProjectAddClick,
  handleProjectRemoveClick,
  volunteer,
  handleVolunteerInputChange,
  handleVolunteerAddClick,
  handleVolunteerRemoveClick,
  tech,
  handleTechInputChange,
  handleTechAddClick,
  handleTechRemoveClick,
  navigation,
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
                    Experience
                  </Typography>
                </Box>
                <Typography className={classes.title}>
                  Working Experience
                </Typography>
                {work.map((x, i) => {
                  return (
                    <Grid container alignItems="center" spacing={2}>
                      <Grid item xs={12} md={3} align="center">
                        <TextField
                          className={classes.textField}
                          variant="outlined"
                          fullWidth
                          name="work"
                          label="Work Place"
                          value={x.work}
                          onChange={(e) => handleWorkInputChange(e, i)}
                        />
                      </Grid>
                      <Grid item xs={12} md={3} align="center">
                        <TextField
                          className={classes.textField}
                          variant="outlined"
                          fullWidth
                          name="workPosition"
                          label="Position"
                          value={x.workPosition}
                          onChange={(e) => handleWorkInputChange(e, i)}
                        />
                      </Grid>
                      <Grid item xs={12} md={2} align="center">
                        <TextField
                          className={classes.textField}
                          variant="outlined"
                          fullWidth
                          name="workFrom"
                          label="From"
                          value={x.workFrom}
                          onChange={(e) => handleWorkInputChange(e, i)}
                        />
                      </Grid>
                      <Grid item xs={12} md={2} align="center">
                        <TextField
                          className={classes.textField}
                          variant="outlined"
                          fullWidth
                          name="workTo"
                          label="To"
                          value={x.workTo}
                          onChange={(e) => handleWorkInputChange(e, i)}
                        />
                      </Grid>
                      <Grid item xs={12} md={2} align="center">
                        {work.length !== 1 && (
                          <IconButton
                            onClick={() => handleWorkRemoveClick(i)}
                            color="secondary"
                            aria-label="Add new work"
                          >
                            <RemoveCircleOutlineIcon />
                          </IconButton>
                        )}
                        {work.length - 1 === i && (
                          <IconButton
                            onClick={handleWorkAddClick}
                            color="primary"
                            aria-label="Remove work"
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
                  Project Details
                </Typography>
                {project.map((x, i) => {
                  return (
                    <Grid container alignItems="center" spacing={2}>
                      <Grid item xs={12} md={4} align="center">
                        <TextField
                          className={classes.textField}
                          variant="outlined"
                          fullWidth
                          name="project"
                          label="Project Name"
                          value={x.project}
                          onChange={(e) => handleProjectInputChange(e, i)}
                        />
                      </Grid>
                      <Grid item xs={12} md={6} align="center">
                        <TextField
                          className={classes.textField}
                          variant="outlined"
                          fullWidth
                          name="projectLink"
                          label="Link"
                          value={x.projectLink}
                          onChange={(e) => handleProjectInputChange(e, i)}
                        />
                      </Grid>
                      <Grid item xs={12} md={2} align="center">
                        {project.length !== 1 && (
                          <IconButton
                            onClick={() => handleProjectRemoveClick(i)}
                            color="secondary"
                            aria-label="Add new project"
                          >
                            <RemoveCircleOutlineIcon />
                          </IconButton>
                        )}
                        {project.length - 1 === i && (
                          <IconButton
                            onClick={handleProjectAddClick}
                            color="primary"
                            aria-label="Remove project"
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
                  Volunteering Details
                </Typography>
                {volunteer.map((x, i) => {
                  return (
                    <Grid container alignItems="center" spacing={2}>
                      <Grid item xs={12} md={4} align="center">
                        <TextField
                          className={classes.textField}
                          variant="outlined"
                          fullWidth
                          name="volunteer"
                          label="Title"
                          value={x.volunteer}
                          onChange={(e) => handleVolunteerInputChange(e, i)}
                        />
                      </Grid>
                      <Grid item xs={12} md={6} align="center">
                        <TextField
                          className={classes.textField}
                          variant="outlined"
                          fullWidth
                          name="volunteerDescription"
                          label="Description"
                          value={x.volunteerDescription}
                          onChange={(e) => handleVolunteerInputChange(e, i)}
                        />
                      </Grid>
                      <Grid item xs={12} md={2} align="center">
                        {volunteer.length !== 1 && (
                          <IconButton
                            onClick={() => handleVolunteerRemoveClick(i)}
                            color="secondary"
                            aria-label="Add new volunteering experience"
                          >
                            <RemoveCircleOutlineIcon />
                          </IconButton>
                        )}
                        {volunteer.length - 1 === i && (
                          <IconButton
                            onClick={handleVolunteerAddClick}
                            color="primary"
                            aria-label="Remove volunteering experience"
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
                  Technology Stack
                </Typography>
                {tech.map((x, i) => {
                  return (
                    <Grid container alignItems="center" spacing={2}>
                      <Grid item xs={12} md={7} align="center">
                        <TextField
                          className={classes.textField}
                          variant="outlined"
                          fullWidth
                          name="tech"
                          label="Technology/ Programming Language"
                          value={x.tech}
                          onChange={(e) => handleTechInputChange(e, i)}
                        />
                      </Grid>
                      <Grid item xs={12} md={2} align="center">
                        <TextField
                          className={classes.textField}
                          variant="outlined"
                          fullWidth
                          name="techRate"
                          label="Rate"
                          type="number"
                          InputProps={{ inputProps: { min: 0, max: 10 } }}
                          value={x.techRate}
                          onChange={(e) => handleTechInputChange(e, i)}
                        />
                      </Grid>
                      <Grid item xs={12} md={1} align="center">
                        <Typography className={classes.title}>/ 10</Typography>
                      </Grid>
                      <Grid item xs={12} md={2} align="center">
                        {tech.length !== 1 && (
                          <IconButton
                            onClick={() => handleTechRemoveClick(i)}
                            color="secondary"
                            aria-label="Add new technology/ programming language"
                          >
                            <RemoveCircleOutlineIcon />
                          </IconButton>
                        )}
                        {tech.length - 1 === i && (
                          <IconButton
                            onClick={handleTechAddClick}
                            color="primary"
                            aria-label="Remove technology/ programming language"
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
