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
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import FloatCard from "../../components/FloatCard";
import backgroundImage from "../images/background.jfif";
import SideDrawer from "../../components/SideDrawer";

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
    marginBottom: 10,
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
      maxWidth: "unset",
      paddingLeft: "0 !important",
      paddingRight: "0 !important",
    },
  },
  screen: {
    paddingTop: 10,
    paddingBottom: 10,
  },
}));

export const Experience = ({
  work,
  handleWorkInputChange,
  handleTaskInputChange,
  handleWorkAddClick,
  handleTaskAddClick,
  handleWorkRemoveClick,
  handleTaskRemoveClick,
  project,
  handleProjectInputChange,
  handleProjectAddClick,
  handleProjectRemoveClick,
  handleProjectTechInputChange,
  handleProjectTechAddClick,
  handleProjectTechRemoveClick,
  navigation,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.background}>
      <div className={classes.overlay}>
        <Container maxWidth={false} className={classes.container}>
          <Grid
            container
            direction="row"
            spacing={3}
            className={classes.mainGrid}
            justify="space-between"
            alignItems="flex-start"
          >
            <Grid
              item
              xs={false}
              sm={4}
              md={3}
              lg={2}
              className={classes.sideDrawer}
            >
              <SideDrawer />
            </Grid>
            <Grid
              item
              xs={false}
              sm={4}
              md={3}
              lg={2}
              className={classes.sideDrawerGrid}
            ></Grid>
            <Grid
              item
              container
              xs={12}
              sm={8}
              md={9}
              lg={10}
              spacing={3}
              className={classes.topBarGrid}
              direction="column"
              justify="space-between"
            >
              <Container className={classes.container}>
                <FloatCard>
                  <Container>
                    {/* Work Experience */}
                    <Container
                      maxWidth="lg"
                      className={classes.jobDetailsContainer}
                    >
                      <Box mt={5} mb={5}>
                        <Typography component="h1" variant="h5">
                          Continue setting up your profile
                        </Typography>
                      </Box>
                      <Typography className={classes.title}>
                        <h4>Working Experience</h4>
                      </Typography>
                      {work.map((x, i) => {
                        return (
                          <div>
                            <Grid container alignItems="center" spacing={10}>
                              <Grid item xs={12} md={10} align="center">
                                <Grid container alignItems="center" spacing={2}>
                                  <Grid item xs={12} md={4} align="center">
                                    <TextField
                                      className={classes.textField}
                                      variant="outlined"
                                      fullWidth
                                      name="place"
                                      label="Work Place"
                                      value={x.place}
                                      onChange={(e) =>
                                        handleWorkInputChange(e, i)
                                      }
                                    />
                                  </Grid>
                                  <Grid item xs={12} md={4} align="center">
                                    <TextField
                                      className={classes.textField}
                                      variant="outlined"
                                      fullWidth
                                      name="position"
                                      label="Position"
                                      value={x.position}
                                      onChange={(e) =>
                                        handleWorkInputChange(e, i)
                                      }
                                    />
                                  </Grid>
                                  <Grid item xs={12} md={2} align="center">
                                    <TextField
                                      className={classes.textField}
                                      variant="outlined"
                                      fullWidth
                                      name="from"
                                      label="From"
                                      value={x.from}
                                      onChange={(e) =>
                                        handleWorkInputChange(e, i)
                                      }
                                    />
                                  </Grid>
                                  <Grid item xs={12} md={2} align="center">
                                    <TextField
                                      className={classes.textField}
                                      variant="outlined"
                                      fullWidth
                                      name="to"
                                      label="To"
                                      value={x.to}
                                      onChange={(e) =>
                                        handleWorkInputChange(e, i)
                                      }
                                    />
                                  </Grid>
                                  <Grid item xs={12} md={12} align="center">
                                    {x.taskAndResponsibility.map((y, j) => {
                                      return (
                                        <div>
                                          <Grid
                                            container
                                            alignItems="center"
                                            spacing={4}
                                          >
                                            <Grid
                                              item
                                              xs={10}
                                              md={10}
                                              align="center"
                                            >
                                              <TextField
                                                className={classes.textField}
                                                variant="outlined"
                                                fullWidth
                                                name="taskName"
                                                label={
                                                  "Task/ Responsibility - " +
                                                  (j + 1)
                                                }
                                                value={y.taskName}
                                                onChange={(e) =>
                                                  handleTaskInputChange(e, i, j)
                                                }
                                              />
                                            </Grid>
                                            <Grid
                                              item
                                              xs={2}
                                              md={2}
                                              align="center"
                                            >
                                              {x.taskAndResponsibility
                                                .length !== 1 && (
                                                <IconButton
                                                  onClick={() =>
                                                    handleTaskRemoveClick(i, j)
                                                  }
                                                  color="secondary"
                                                  aria-label="Add new work"
                                                >
                                                  <RemoveIcon />
                                                </IconButton>
                                              )}
                                              {x.taskAndResponsibility.length -
                                                1 ===
                                                j && (
                                                <IconButton
                                                  onClick={() =>
                                                    handleTaskAddClick(i)
                                                  }
                                                  color="primary"
                                                  aria-label="Remove work"
                                                >
                                                  <AddIcon />
                                                </IconButton>
                                              )}
                                            </Grid>
                                          </Grid>
                                        </div>
                                      );
                                    })}
                                  </Grid>
                                </Grid>
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
                          </div>
                        );
                      })}
                    </Container>

                    {/* Project Details */}
                    <Container
                      maxWidth="lg"
                      className={classes.jobDetailsContainer}
                    >
                      <Typography className={classes.title}>
                        <h4>Project Details</h4>
                      </Typography>
                      {project.map((x, i) => {
                        return (
                          <Grid container alignItems="center" spacing={10}>
                            <Grid item xs={12} md={10} align="center">
                              <Grid container alignItems="center" spacing={2}>
                                <Grid item xs={12} md={4} align="center">
                                  <TextField
                                    className={classes.textField}
                                    variant="outlined"
                                    fullWidth
                                    name="name"
                                    label="Project Name"
                                    value={x.name}
                                    onChange={(e) =>
                                      handleProjectInputChange(e, i)
                                    }
                                  />
                                </Grid>
                                <Grid item xs={12} md={4} align="center">
                                  <TextField
                                    className={classes.textField}
                                    variant="outlined"
                                    fullWidth
                                    name="link"
                                    label="Link"
                                    value={x.link}
                                    onChange={(e) =>
                                      handleProjectInputChange(e, i)
                                    }
                                  />
                                </Grid>
                                <Grid item xs={12} md={2} align="center">
                                  <TextField
                                    className={classes.textField}
                                    variant="outlined"
                                    fullWidth
                                    name="from"
                                    label="From"
                                    value={x.from}
                                    onChange={(e) =>
                                      handleProjectInputChange(e, i)
                                    }
                                  />
                                </Grid>
                                <Grid item xs={12} md={2} align="center">
                                  <TextField
                                    className={classes.textField}
                                    variant="outlined"
                                    fullWidth
                                    name="to"
                                    label="To"
                                    value={x.to}
                                    onChange={(e) =>
                                      handleProjectInputChange(e, i)
                                    }
                                  />
                                </Grid>
                                <Grid item xs={12} md={12} align="center">
                                  <TextField
                                    className={classes.textField}
                                    variant="outlined"
                                    fullWidth
                                    name="description"
                                    label="Description"
                                    inputProps={{
                                      maxLength: 300,
                                    }}
                                    value={x.description}
                                    onChange={(e) =>
                                      handleProjectInputChange(e, i)
                                    }
                                  />
                                </Grid>
                                <Grid item xs={12} md={12} align="center">
                                  {x.usedTech.map((y, j) => {
                                    return (
                                      <div>
                                        <Grid
                                          container
                                          alignItems="center"
                                          spacing={4}
                                        >
                                          <Grid
                                            item
                                            xs={10}
                                            md={4}
                                            align="center"
                                          >
                                            <TextField
                                              className={classes.textField}
                                              variant="outlined"
                                              fullWidth
                                              name="category"
                                              label={
                                                "Technology (e.g. Database)"
                                              }
                                              value={y.category}
                                              onChange={(e) =>
                                                handleProjectTechInputChange(
                                                  e,
                                                  i,
                                                  j
                                                )
                                              }
                                            />
                                          </Grid>
                                          <Grid
                                            item
                                            xs={10}
                                            md={6}
                                            align="center"
                                          >
                                            <TextField
                                              className={classes.textField}
                                              variant="outlined"
                                              fullWidth
                                              name="language"
                                              label={
                                                "Programming Language (e.g. MySQL, MongoDB)"
                                              }
                                              value={y.language}
                                              onChange={(e) =>
                                                handleProjectTechInputChange(
                                                  e,
                                                  i,
                                                  j
                                                )
                                              }
                                            />
                                          </Grid>
                                          <Grid
                                            item
                                            xs={2}
                                            md={2}
                                            align="center"
                                          >
                                            {x.usedTech.length !== 1 && (
                                              <IconButton
                                                onClick={() =>
                                                  handleProjectTechRemoveClick(
                                                    i,
                                                    j
                                                  )
                                                }
                                                color="secondary"
                                                aria-label="Add new work"
                                              >
                                                <RemoveIcon />
                                              </IconButton>
                                            )}
                                            {x.usedTech.length - 1 === j && (
                                              <IconButton
                                                onClick={() =>
                                                  handleProjectTechAddClick(i)
                                                }
                                                color="primary"
                                                aria-label="Remove work"
                                              >
                                                <AddIcon />
                                              </IconButton>
                                            )}
                                          </Grid>
                                        </Grid>
                                      </div>
                                    );
                                  })}
                                </Grid>
                              </Grid>
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
                    
                    {/* Navigation Buttons */}
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
                                  className={classes.previous}
                                  onClick={() => window.location='/jobs'}
                                >
                                  Cancel
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
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};
