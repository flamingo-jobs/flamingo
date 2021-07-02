import React, { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Grid,
  Typography,
  Container,
  IconButton,
  Chip
} from "@material-ui/core";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import FloatCard from "../../components/FloatCard";
import backgroundImage from "../images/background.jfif";
import SideDrawer from "../../components/SideDrawer";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles((theme) => ({
  root: {
    background: `url(${backgroundImage}) no-repeat`,
    backgroundAttachment: "fixed",
    minHeight: "100vh",
    backgroundSize: "cover",
  },
  container: {
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
    "&:hover": {
      backgroundColor: theme.palette.skyBlueCrayolaHover,
      color: "white",
      boxShadow: "none",
    },
  },
  previous: {
    boxShadow: "none",
    color: theme.palette.black,
    backgroundColor: theme.palette.white,
    "&:hover": {
      backgroundColor: theme.palette.white,
      color: "black",
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
  }, actions: {
    justifyContent: "flex-end",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  signIn: {
    justifyContent: "flex-start",
    marginRight: 10,
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  mainTitle: {
    fontSize: 36,
    fontWeight: 500,
    marginTop: 20,
  },
  select: {
    '& :focus': {
      backgroundColor: 'transparent'
    }
  },
  mainGrid: {
    minHeight: '100vh'
  },
  footer: {
    marginBottom: 10,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      justifyContent: "space-between",
    },
  },
  keywordChip: {
    backgroundColor: theme.palette.lightSkyBlue,
    margin: 4,
    marginRight: 5
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

  const [techStack, setTechStack] = useState([]);

  const handleTechStackChange = (event, value) => {
    setTechStack(value);
  }

  return (
    <div className={classes.background}>
      <div className={classes.overlay}>
        <Container maxWidth="false" className={classes.container}>
          <Grid container spacing={3} justify="center" alignItems="center" className={classes.mainGrid}>
            <Grid item xs={12} align="center">
              <FloatCard>
                <Container maxWidth="false">
                  <Grid
                    container
                    spacing={4}
                    justify="space-between"
                    className={classes.gridCont}
                  >
                    <Grid item xs={12} align="left">
                      <Typography className={classes.mainTitle}>Continue setting up you profile...</Typography>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Grid container alignItems="center" spacing={3}>
                        <Grid item xs={12} align="left">
                          <Typography className={classes.title}>
                            <h4>Working Experience</h4>
                          </Typography>
                        </Grid>
                        <Grid item xs={12} align="left">
                          {work.map((x, i) => {
                            return (
                              <div>
                                <Grid container alignItems="center" spacing={3} style={{ marginBottom: 20 }}>
                                  <Grid item xs={12} md={9} align="center" >
                                    <Grid container alignItems="center" spacing={2}>
                                      <Grid item xs={12} md={6} align="center">
                                        <TextField size="small"
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
                                      <Grid item xs={12} md={6} align="center">
                                        <TextField size="small"
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
                                      <Grid item xs={6} md={4} align="center">
                                        <TextField size="small"
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
                                      <Grid item xs={6} md={4} align="center">
                                        <TextField size="small"
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
                                                spacing={1}
                                              >
                                                <Grid
                                                  item
                                                  xs={10}
                                                  md={9}
                                                  align="center"
                                                >
                                                  <TextField size="small"
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
                                                  md={3}
                                                  align="left"
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
                                  <Grid item xs={12} md={3} align="left">
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
                        </Grid>
                      </Grid>
                    </Grid>
                    {/* Project Details */}
                    <Grid item xs={12} lg={6}>
                      <Grid container alignItems="center" spacing={3}>
                        <Grid item xs={12} align="left">
                          <Typography className={classes.title}>
                            <h4>Project Details</h4>
                          </Typography>
                        </Grid>
                        <Grid item xs={12} align="left">
                          {project.map((x, i) => {
                            return (
                              <Grid container alignItems="center" spacing={3} style={{ marginBottom: 20 }}>
                                <Grid item xs={12} md={9} align="center" >
                                  <Grid container alignItems="center" spacing={2}>
                                    <Grid item xs={12} md={6} align="center">
                                      <TextField size="small"
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
                                    <Grid item xs={12} md={6} align="center">
                                      <TextField size="small"
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
                                    <Grid item xs={6} md={4} align="center">
                                      <TextField size="small"
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
                                    <Grid item xs={6} md={4} align="center">
                                      <TextField size="small"
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
                                      <TextField size="small"
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
                                      <Autocomplete
                                        multiple
                                        options={[]}
                                        defaultValue={techStack}
                                        freeSolo
                                        disableClearable
                                        renderTags={(value, getTagProps) =>
                                          value.map((option, index) => (
                                            <Chip key={index} label={option} {...getTagProps({ index })} className={classes.keywordChip} />
                                          ))
                                        }
                                        renderInput={(params) => (
                                          <TextField {...params} id={`text-field-1`} className={classes.textField}
                                            size="small"
                                            variant="outlined"
                                            name="techStack"
                                            label="Technology Stack"
                                            fullWidth />
                                        )}
                                        onChange={(event, value) => handleTechStackChange(event, value)}
                                        classes={{
                                          inputRoot: classes.inputRoot,
                                          input: classes.inputInput,
                                        }}
                                      />
                                      {/* {x.usedTech.map((y, j) => {
                                        return (
                                          <div>
                                            <Grid
                                              container
                                              alignItems="center"
                                              spacing={1}
                                            >
                                              <Grid
                                                item
                                                xs={10}
                                                md={6}
                                                align="center"
                                              >
                                                <TextField size="small"
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
                                                md={10}
                                                align="center"
                                              >
                                                <TextField size="small"
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
                                                align="left"
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
                                      })} */}
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid item xs={12} md={3} align="left">
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
                        </Grid>

                        {/* Navigation Buttons */}
                        <Grid item xs={12}>
                          <Grid
                            item
                            container
                            xs={12}
                            className={classes.footer}
                            alignItems="center"
                            justify="center"
                            spacing={3}
                          >
                            <Grid item container md={12} className={classes.actions} spacing={4}>
                              <Grid item >
                                <Button
                                  fullWidth
                                  className={classes.previous}
                                  onClick={() => window.location = '/jobs'}
                                >
                                  Skip setting up profile
                                </Button>
                              </Grid>
                              <Grid item>
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
                    </Grid>
                  </Grid>
                </Container>
              </FloatCard>
            </Grid>
          </Grid>
        </Container>
      </div >
    </div >
  );
};
