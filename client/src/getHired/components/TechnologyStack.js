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

export const TechnologyStack = ({
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
                    {/* Technology Stack */}
                    <Container
                      maxWidth="lg"
                      className={classes.jobDetailsContainer}
                    >
                      <Box mt={5} mb={5}>
                        <Typography component="h1" variant="h5">
                          Technology Details
                        </Typography>
                      </Box>
                      <Typography className={classes.title}>
                        <h4>Technology Stack</h4>
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
                                InputProps={{
                                  inputProps: { min: 0, max: 10 },
                                }}
                                value={x.techRate}
                                onChange={(e) => handleTechInputChange(e, i)}
                              />
                            </Grid>
                            <Grid item xs={12} md={1} align="center">
                              <Typography className={classes.title}>
                                / 10
                              </Typography>
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
                                  Finish
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
