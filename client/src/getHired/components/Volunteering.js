import {
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import React from "react";
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
        {/* Volunteering Details */}
        <Grid item xs={12} lg={4}>
          <Grid container alignItems="center" spacing={3}>
            <Grid item xs={12} align="left">
              <Typography component={"span"} className={classes.title}>
                <h4>Volunteering Details</h4>
              </Typography>
            </Grid>
            <Grid item xs={12} align="left">
              {volunteer.map((x, i) => {
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
                            name="title"
                            label="Title"
                            required
                            value={x.title}
                            onChange={(e) => handleVolunteerInputChange(e, i)}
                          />
                        </Grid>
                        <Grid item xs={12} align="center">
                          <TextField
                            size="small"
                            className={classes.textField}
                            variant="outlined"
                            fullWidth
                            name="organization"
                            label="Organization"
                            value={x.organization}
                            onChange={(e) => handleVolunteerInputChange(e, i)}
                          />
                        </Grid>
                        <Grid item xs={12} md={12} align="center">
                          <TextField
                            size="small"
                            className={classes.textField}
                            variant="outlined"
                            fullWidth
                            name="description"
                            label="Description"
                            value={x.description}
                            onChange={(e) => handleVolunteerInputChange(e, i)}
                          />
                        </Grid>
                        <Grid item xs={12} align="center">
                          <TextField
                            size="small"
                            className={classes.textField}
                            variant="outlined"
                            fullWidth
                            name="from"
                            helperText="From"
                            type="month"
                            value={x.from}
                            InputProps={{ inputProps: { max: x.to } }}
                            onChange={(e) => handleVolunteerInputChange(e, i)}
                          />
                        </Grid>
                        <Grid item xs={12} align="center">
                          <TextField
                            size="small"
                            className={classes.textField}
                            variant="outlined"
                            fullWidth
                            name="to"
                            helperText="To"
                            type="month"
                            value={x.to}
                            InputProps={{ inputProps: { min: x.from } }}
                            onChange={(e) => handleVolunteerInputChange(e, i)}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} md={3} align="left">
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
            </Grid>
          </Grid>
        </Grid>
        {/* Award Details */}
        <Grid item xs={12} lg={4}>
          <Grid container alignItems="center" spacing={3}>
            <Grid item xs={12} align="left">
              <Typography component={"span"} className={classes.title}>
                <h4>Award Details</h4>
              </Typography>
            </Grid>
            <Grid item xs={12} align="left">
              {award.map((x, i) => {
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
                            name="title"
                            label="Award Title"
                            required
                            value={x.title}
                            onChange={(e) => handleAwardInputChange(e, i)}
                          />
                        </Grid>
                        <Grid item xs={12} align="center">
                          <TextField
                            size="small"
                            className={classes.textField}
                            variant="outlined"
                            fullWidth
                            name="issuedBy"
                            label="Issued By"
                            value={x.issuedBy}
                            onChange={(e) => handleAwardInputChange(e, i)}
                          />
                        </Grid>
                        <Grid item xs={12} md={12} align="center">
                          <TextField
                            size="small"
                            className={classes.textField}
                            variant="outlined"
                            fullWidth
                            name="description"
                            label="Description"
                            value={x.description}
                            onChange={(e) => handleAwardInputChange(e, i)}
                          />
                        </Grid>
                        <Grid item xs={12} md={12} align="center">
                          <TextField
                            size="small"
                            className={classes.textField}
                            variant="outlined"
                            fullWidth
                            name="date"
                            type="month"
                            helperText="Date"
                            value={x.date}
                            onChange={(e) => handleAwardInputChange(e, i)}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} md={3} align="left">
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
            </Grid>
          </Grid>
        </Grid>

        {/* Achievement Details */}
        <Grid item xs={12} lg={4}>
          <Grid container alignItems="center" spacing={3}>
            <Grid item xs={12} align="left">
              <Typography component={"span"} className={classes.title}>
                <h4>Achievement Details</h4>
              </Typography>
            </Grid>
            <Grid item xs={12} align="left">
              {achievement.map((x, i) => {
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
                            name="title"
                            label="Title"
                            required
                            value={x.title}
                            onChange={(e) => handleAchievementInputChange(e, i)}
                          />
                        </Grid>
                        <Grid item xs={12} align="center">
                          <TextField
                            size="small"
                            className={classes.textField}
                            name="relatedTo"
                            label="Related To"
                            variant="outlined"
                            fullWidth
                            value={x.relatedTo}
                            onChange={(e) => handleAchievementInputChange(e, i)}
                          />
                        </Grid>
                        <Grid item xs={12} align="center">
                          <TextField
                            size="small"
                            className={classes.textField}
                            variant="outlined"
                            fullWidth
                            name="date"
                            helperText="Date"
                            type="month"
                            value={x.date}
                            onChange={(e) => handleAchievementInputChange(e, i)}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} md={3} align="left">
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
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
