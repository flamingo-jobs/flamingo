import React from "react";
import {
  Button,
  TextField,
  Box,
  Grid,
  Typography,
  Container,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
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

export const Volunteering = ({
  university,
  volunteer,
  handleVolunteerInputChange,
  handleVolunteerAddClick,
  handleVolunteerRemoveClick,
  award,
  handleAwardInputChange,
  handleAwardAddClick,
  handleAwardRemoveClick,
  achievement,
  handleAchievementInputChange,
  handleAchievementAddClick,
  handleAchievementRemoveClick,
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
                    {/* Volunteering Details */}
                    <Container
                      maxWidth="lg"
                      className={classes.jobDetailsContainer}
                    >
                      <Box mt={5} mb={5}>
                        <Typography component="h1" variant="h5">
                          Volunteering and Achievement Details
                        </Typography>
                      </Box>
                      <Typography className={classes.title}>
                        <h4>Volunteering Details</h4>
                      </Typography>
                      {volunteer.map((x, i) => {
                        return (
                          <Grid container alignItems="center" spacing={2}>
                            <Grid item xs={12} md={10} align="center">
                              <Grid container alignItems="center" spacing={2}>
                                <Grid item xs={12} md={4} align="center">
                                  <TextField
                                    className={classes.textField}
                                    variant="outlined"
                                    fullWidth
                                    name="title"
                                    label="Title"
                                    value={x.title}
                                    onChange={(e) =>
                                      handleVolunteerInputChange(e, i)
                                    }
                                  />
                                </Grid>
                                <Grid item xs={12} md={4} align="center">
                                  <TextField
                                    className={classes.textField}
                                    variant="outlined"
                                    fullWidth
                                    name="organization"
                                    label="Description"
                                    value={x.organization}
                                    onChange={(e) =>
                                      handleVolunteerInputChange(e, i)
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
                                      handleVolunteerInputChange(e, i)
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
                                      handleVolunteerInputChange(e, i)
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
                                    value={x.description}
                                    onChange={(e) =>
                                      handleVolunteerInputChange(e, i)
                                    }
                                  />
                                </Grid>
                              </Grid>
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

                    {/* Award Details */}
                    <Container
                      maxWidth="lg"
                      className={classes.jobDetailsContainer}
                    >
                      <Typography className={classes.title}>
                        <h4>Award Details</h4>
                      </Typography>
                      {award.map((x, i) => {
                        return (
                          <Grid container alignItems="center" spacing={10}>
                            <Grid item xs={12} md={10} align="center">
                              <Grid container alignItems="center" spacing={2}>
                                <Grid item xs={12} md={6} align="center">
                                  <TextField
                                    className={classes.textField}
                                    variant="outlined"
                                    fullWidth
                                    name="title"
                                    label="Award Title"
                                    value={x.title}
                                    onChange={(e) =>
                                      handleAwardInputChange(e, i)
                                    }
                                  />
                                </Grid>
                                <Grid item xs={12} md={4} align="center">
                                  <TextField
                                    className={classes.textField}
                                    variant="outlined"
                                    fullWidth
                                    name="issuedBy"
                                    label="Issued By"
                                    value={x.issuedBy}
                                    onChange={(e) =>
                                      handleAwardInputChange(e, i)
                                    }
                                  />
                                </Grid>
                                <Grid item xs={12} md={2} align="center">
                                  <TextField
                                    className={classes.textField}
                                    variant="outlined"
                                    fullWidth
                                    name="date"
                                    label="Date (mm/yyyy)"
                                    value={x.date}
                                    onChange={(e) =>
                                      handleAwardInputChange(e, i)
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
                                    value={x.description}
                                    onChange={(e) =>
                                      handleAwardInputChange(e, i)
                                    }
                                  />
                                </Grid>
                              </Grid>
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

                    {/* Achievement Details */}
                    <Container
                      maxWidth="lg"
                      className={classes.jobDetailsContainer}
                    >
                      <Typography className={classes.title}>
                        <h4>Achievement Details</h4>
                      </Typography>
                      {achievement.map((x, i) => {
                        return (
                          <Grid container alignItems="center" spacing={2}>
                            <Grid item xs={12} md={4} align="center">
                              <TextField
                                className={classes.textField}
                                variant="outlined"
                                fullWidth
                                name="title"
                                label="Title"
                                value={x.title}
                                onChange={(e) =>
                                  handleAchievementInputChange(e, i)
                                }
                              />
                            </Grid>
                            <Grid item xs={12} md={4} align="center">
                              <Autocomplete
                                options={university}
                                getOptionLabel={(option) => option.university}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    name="relatedTo"
                                    label="Related To"
                                    variant="outlined"
                                    value={x.relatedTo}
                                    onChange={(e) =>
                                      handleAchievementInputChange(e, i)
                                    }
                                  />
                                )}
                              />
                            </Grid>
                            <Grid item xs={12} md={2} align="center">
                              <TextField
                                className={classes.textField}
                                variant="outlined"
                                fullWidth
                                name="date"
                                label="Date"
                                value={x.date}
                                onChange={(e) =>
                                  handleAchievementInputChange(e, i)
                                }
                              />
                            </Grid>
                            <Grid item xs={12} md={2} align="center">
                              {achievement.length !== 1 && (
                                <IconButton
                                  onClick={() =>
                                    handleAchievementRemoveClick(i)
                                  }
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
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};
