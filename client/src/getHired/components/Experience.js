import {
  Chip,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    // background: `url(${backgroundImage}) no-repeat`,
    // backgroundAttachment: "fixed",
    // minHeight: "100vh",
    // backgroundSize: "cover",
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
    // background: `url(${backgroundImage}) no-repeat`,
    // backgroundSize: "cover",
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
    minHeight: "100vh",
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
  actions: {
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
    "& :focus": {
      backgroundColor: "transparent",
    },
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
    marginRight: 5,
  },
}));

export const Experience = ({
  work,
  handleWorkInputChange,
  handleWorkAddClick,
  handleWorkRemoveClick,
  project,
  handleProjectInputChange,
  handleProjectAddClick,
  handleProjectRemoveClick,
  handleProjectTechInputChange,
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
        <Grid item xs={12} lg={6}>
          <Grid container alignItems="center" spacing={3}>
            <Grid item xs={12} align="left">
              <Typography component={"span"} className={classes.title}>
                <h4>Working Experience</h4>
              </Typography>
            </Grid>
            <Grid item xs={12} align="left">
              {work.map((x, i) => {
                return (
                  <div key={i}>
                    <Grid
                      container
                      alignItems="center"
                      spacing={3}
                      style={{ marginBottom: 20 }}
                    >
                      <Grid item xs={12} md={9} align="center">
                        <Grid container alignItems="center" spacing={2}>
                          <Grid item xs={12} md={6} align="center">
                            <TextField
                              size="small"
                              className={classes.textField}
                              variant="outlined"
                              fullWidth
                              name="place"
                              label="Work Place"
                              required
                              value={x.place}
                              onChange={(e) => handleWorkInputChange(e, i)}
                            />
                          </Grid>
                          <Grid item xs={12} md={6} align="center">
                            <TextField
                              size="small"
                              className={classes.textField}
                              variant="outlined"
                              fullWidth
                              name="position"
                              label="Position"
                              value={x.position}
                              onChange={(e) => handleWorkInputChange(e, i)}
                            />
                          </Grid>
                          <Grid item xs={12} align="center">
                            <TextField
                              size="small"
                              className={classes.textField}
                              variant="outlined"
                              fullWidth
                              multiline
                              name="description"
                              label="Description"
                              value={x.description}
                              onChange={(e) => handleWorkInputChange(e, i)}
                            />
                          </Grid>
                          <Grid item xs={6} md={6} align="center">
                            <TextField
                              size="small"
                              className={classes.textField}
                              variant="outlined"
                              fullWidth
                              name="from"
                              helperText="From"
                              type="month"
                              value={x.from}
                              onChange={(e) => handleWorkInputChange(e, i)}
                            />
                          </Grid>
                          <Grid item xs={6} md={6} align="center">
                            <TextField
                              size="small"
                              className={classes.textField}
                              variant="outlined"
                              fullWidth
                              name="to"
                              type="month"
                              helperText="To"
                              value={x.to}
                              onChange={(e) => handleWorkInputChange(e, i)}
                            />
                          </Grid>
                          <Grid item xs={6} md={12} align="center">
                            <TextField
                              size="small"
                              className={classes.textField}
                              variant="outlined"
                              multiline
                              fullWidth
                              name="taskAndResponsibility"
                              label="Tasks and Responsibilities"
                              value={x.taskAndResponsibility}
                              onChange={(e) => handleWorkInputChange(e, i)}
                            />
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
              <Typography component={"span"} className={classes.title}>
                <h4>Project Details</h4>
              </Typography>
            </Grid>
            <Grid item xs={12} align="left">
              {project.map((x, i) => {
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
                        <Grid item xs={12} md={6} align="center">
                          <TextField
                            size="small"
                            className={classes.textField}
                            variant="outlined"
                            fullWidth
                            name="name"
                            label="Project Name"
                            required
                            value={x.name}
                            onChange={(e) => handleProjectInputChange(e, i)}
                          />
                        </Grid>
                        <Grid item xs={12} md={6} align="center">
                          <FormControl
                            size="small"
                            fullWidth
                            variant="outlined"
                            className={classes.formControl}
                          >
                            <InputLabel
                              className={classes.placeholderDate}
                              htmlFor="outlined-age-native-simple"
                            >
                              Type
                            </InputLabel>
                            <Select
                              native
                              label="Type"
                              name="type"
                              onChange={(e) => {
                                handleProjectInputChange(e, i);
                              }}
                              required
                            >
                              <option
                                aria-label="Individual"
                                value="Individual"
                              >
                                Individual
                              </option>
                              <option aria-label="None" value="Group">
                                Group
                              </option>
                              <option aria-label="None" value="Community">
                                Community
                              </option>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} align="center">
                          <TextField
                            size="small"
                            className={classes.textField}
                            variant="outlined"
                            fullWidth
                            name="link"
                            label="Link"
                            type="url"
                            value={x.link}
                            onChange={(e) => handleProjectInputChange(e, i)}
                          />
                        </Grid>
                        <Grid item xs={12} md={6} align="center">
                          <TextField
                            size="small"
                            className={classes.textField}
                            variant="outlined"
                            fullWidth
                            name="from"
                            helperText="From"
                            type="month"
                            value={x.from}
                            onChange={(e) => handleProjectInputChange(e, i)}
                          />
                        </Grid>
                        <Grid item xs={12} md={6} align="center">
                          <TextField
                            size="small"
                            className={classes.textField}
                            variant="outlined"
                            fullWidth
                            name="to"
                            helperText="To"
                            type="month"
                            value={x.to}
                            onChange={(e) => handleProjectInputChange(e, i)}
                          />
                        </Grid>
                        <Grid item xs={12} md={12} align="center">
                          <TextField
                            size="small"
                            className={classes.textField}
                            variant="outlined"
                            fullWidth
                            multiline
                            name="description"
                            label="Description"
                            inputProps={{
                              maxLength: 600,
                            }}
                            value={x.description}
                            onChange={(e) => handleProjectInputChange(e, i)}
                          />
                        </Grid>
                        <Grid item xs={12} md={12} align="center">
                          <Autocomplete
                            multiple
                            options={[
                              "Angular",
                              "React",
                              "Vue JS",
                              "Node JS",
                              "Spring Boot",
                              "Java",
                              "Python",
                              "GO",
                              "HTML",
                              "CSS",
                              "PHP",
                            ]}
                            defaultValue={x.usedTech}
                            freeSolo
                            disableClearable
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                <Chip
                                  key={index}
                                  label={option}
                                  {...getTagProps({ index })}
                                  className={classes.keywordChip}
                                />
                              ))
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                id={`text-field-1`}
                                className={classes.textField}
                                size="small"
                                variant="outlined"
                                name="usedTech"
                                label="Technology Stack"
                                fullWidth
                              />
                            )}
                            value={x.usedTech}
                            onChange={(e, v) =>
                              handleProjectTechInputChange(e, v, i)
                            }
                            classes={{
                              inputRoot: classes.inputRoot,
                              input: classes.inputInput,
                            }}
                          />
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
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
