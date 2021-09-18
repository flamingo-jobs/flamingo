import React, { useState, useEffect } from "react";
import {
  TextField,
  Grid,
  Typography,
  Container,
  IconButton,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { makeStyles } from "@material-ui/core/styles";
import backgroundImage from "../images/background.jpg";
import BACKEND_URL from "../../Config";
import axios from "axios";

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
  postgraduate,
  handlePostgraduateInputChange,
  handlePostgraduateAddClick,
  handlePostgraduateRemoveClick,
  college,
  handleCollegeInputChange,
  handleCollegeAddClick,
  handleCollegeRemoveClick,
  diploma,
  handleDiplomaInputChange,
  handleDiplomaAddClick,
  handleDiplomaRemoveClick,
  course,
  handleCourseInputChange,
  handleCourseAddClick,
  handleCourseRemoveClick,
  certificate,
  handleCertificateInputChange,
  handleCertificateAddClick,
  handleCertificateRemoveClick,
}) => {
  const classes = useStyles();

  const [allCertificates, setAllCertificates] = useState(null);
  const [state, setState] = useState({
    issuer: null,
    title: null,
    score: null,
    month: null,
    year: null,
  });
  const [fetchedData, setFetchedData] = useState("");

  function fetchCertificates() {
    axios.get(`${BACKEND_URL}/certifications`).then((res) => {
      if (res.data.success) {
        if (res.data.existingData?.length > 0) {
          if (Object.keys(res.data.existingData[0]).length === 0) {
            res.data.existingData.splice(0, 1);
          }
        }
        setAllCertificates(res.data.existingData);
      }
    });
    setFetchedData(0);
  }

  function getIssuers() {
    return allCertificates?.map((x) => (
      <option value={x.issuer}>{x.issuer}</option>
    ));
  }

  function getTitles() {
    for (let index = 0; index < allCertificates?.length; index++) {
      if (allCertificates[index].issuer === state.issuer) {
        let titles = allCertificates[index].certificates;
        return titles.map((title) => (
          <option value={JSON.stringify(title)}>{title.name}</option>
        ));
      }
    }
  }

  useEffect(() => {
    setState({
      issuer: null,
      title: null,
      score: null,
      month: null,
      year: null,
    });
    fetchCertificates();
  }, [fetchedData]);

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
                <h4>Bachelor Details</h4>
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
                        <Grid item xs={12} md={4} align="center">
                          <TextField
                            size="small"
                            className={classes.textField}
                            variant="outlined"
                            fullWidth
                            name="GPA"
                            label="GPA"
                            helperText="i. e. 3.74"
                            value={x.GPA}
                            onChange={(e) => handleUniversityInputChange(e, i)}
                          />
                        </Grid>
                        <Grid item xs={12} align="center">
                          <TextField
                            size="small"
                            className={classes.textField}
                            variant="outlined"
                            fullWidth
                            name="institute"
                            label="University Name"
                            value={x.institute}
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
                            helperText="i. e. mm/yyyy"
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
                            helperText="i. e. mm/yyyy"
                            value={x.endDate}
                            onChange={(e) => handleUniversityInputChange(e, i)}
                          />
                        </Grid>
                        <Grid item xs={12} md={12} align="center">
                          <TextField
                            size="small"
                            className={classes.textField}
                            variant="outlined"
                            fullWidth
                            name="societiesAndActivities"
                            label="Societies & Activities"
                            value={x.societiesAndActivities}
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
                <h4>School/ College Details</h4>
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
                        <Grid item xs={12} md={8} align="center">
                          <TextField
                            size="small"
                            className={classes.textField}
                            variant="outlined"
                            fullWidth
                            name="institute"
                            label="School/ College Name"
                            value={x.institute}
                            onChange={(e) => handleCollegeInputChange(e, i)}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <FormControl
                            size="small"
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
                              value={x.type}
                              name="type"
                              onChange={(e) => handleCollegeInputChange(e, i)}
                              label="Start Date"
                            >
                              <option value="School">School</option>
                              <option value="College">College</option>
                            </Select>
                          </FormControl>
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
                            name="societiesAndActivities"
                            label="Societies And Activities"
                            value={x.societiesAndActivities}
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

        {/* Postgraduate Details */}
        <Grid item xs={12} md={6}>
          <Grid container alignItems="center" spacing={3}>
            <Grid item xs={12} align="left">
              <Typography component={"span"} className={classes.title}>
                <h4>Postgraduate Details</h4>
              </Typography>
            </Grid>
            <Grid item xs={12} align="left">
              {postgraduate.map((x, i) => {
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
                        <Grid item xs={12} md={8} align="center">
                          <TextField
                            size="small"
                            className={classes.textField}
                            variant="outlined"
                            fullWidth
                            name="institute"
                            label="University Name"
                            value={x.institute}
                            onChange={(e) =>
                              handlePostgraduateInputChange(e, i)
                            }
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <FormControl
                            size="small"
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
                              value={x.type}
                              name="type"
                              onChange={(e) =>
                                handlePostgraduateInputChange(e, i)
                              }
                              label="Type"
                            >
                              <option value="MSc">MSc</option>
                              <option value="MPhil">MPhil</option>
                              <option value="PhD">PhD</option>
                            </Select>
                          </FormControl>
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
                            onChange={(e) =>
                              handlePostgraduateInputChange(e, i)
                            }
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
                            onChange={(e) =>
                              handlePostgraduateInputChange(e, i)
                            }
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
                            name="fieldOfStudy"
                            label="Field of Study"
                            value={x.fieldOfStudy}
                            onChange={(e) =>
                              handlePostgraduateInputChange(e, i)
                            }
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} md={3} align="left">
                      {postgraduate.length !== 1 && (
                        <IconButton
                          onClick={() => handlePostgraduateRemoveClick(i)}
                          color="secondary"
                        >
                          <RemoveCircleOutlineIcon />
                        </IconButton>
                      )}
                      {postgraduate.length - 1 === i && (
                        <IconButton
                          onClick={handlePostgraduateAddClick}
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

        {/* Diploma Details */}
        <Grid item xs={12} md={6}>
          <Grid container alignItems="center" spacing={3}>
            <Grid item xs={12} align="left">
              <Typography component={"span"} className={classes.title}>
                <h4>Diploma Details</h4>
              </Typography>
            </Grid>
            <Grid item xs={12} align="left">
              {diploma.map((x, i) => {
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
                        <Grid item xs={12} md={8} align="center">
                          <TextField
                            size="small"
                            className={classes.textField}
                            variant="outlined"
                            fullWidth
                            name="institute"
                            label="Institute Name"
                            value={x.institute}
                            onChange={(e) => handleDiplomaInputChange(e, i)}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <FormControl
                            size="small"
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
                              value={x.type}
                              name="type"
                              onChange={(e) => handleDiplomaInputChange(e, i)}
                              label="Type"
                            >
                              <option value="Diploma">Diploma</option>
                              <option value="Graduate Diploma">
                                Graduate Diploma
                              </option>
                            </Select>
                          </FormControl>
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
                            onChange={(e) => handleDiplomaInputChange(e, i)}
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
                            onChange={(e) => handleDiplomaInputChange(e, i)}
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
                            name="fieldOfStudy"
                            label="Field of Study"
                            value={x.fieldOfStudy}
                            onChange={(e) => handleDiplomaInputChange(e, i)}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} md={3} align="left">
                      {diploma.length !== 1 && (
                        <IconButton
                          onClick={() => handleDiplomaRemoveClick(i)}
                          color="secondary"
                        >
                          <RemoveCircleOutlineIcon />
                        </IconButton>
                      )}
                      {diploma.length - 1 === i && (
                        <IconButton
                          onClick={handleDiplomaAddClick}
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
                          aria-label="Remove course"
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

        {/* Certificate Details */}
        <Grid item xs={12} lg={6}>
          <Grid container alignItems="center" spacing={3}>
            <Grid item xs={12} align="left">
              <Typography component={"span"} className={classes.title}>
                <h4>Certificate Details</h4>
              </Typography>
            </Grid>
            <Grid item xs={12} align="left">
              {certificate.map((x, i) => {
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
                              Issuer
                            </InputLabel>
                            <Select
                              native
                              label="Issuer"
                              name="issuer"
                              onChange={(e) => {
                                setState({
                                  issuer: e.target.value,
                                  title: null,
                                  score: null,
                                  month: null,
                                  year: null,
                                });
                                handleCourseInputChange(e, i);
                              }}
                              required
                            >
                              <option aria-label="None" value="" />
                              {getIssuers()}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} align="center">
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
                              Certification
                            </InputLabel>
                            <Select
                              native
                              name="title"
                              label="Certification"
                              onChange={(e) => handleCourseInputChange(e, i)}
                              required
                            >
                              <option aria-label="None" value="" />
                              {getTitles()}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={4} align="center">
                          <TextField
                            size="small"
                            className={classes.textField}
                            variant="outlined"
                            fullWidth
                            name="score"
                            label="Score"
                            helperText="i.e. 75, 89"
                            value={x.score}
                            onChange={(e) => handleCourseInputChange(e, i)}
                          />
                        </Grid>
                        <Grid item xs={12} md={4} align="center">
                          <TextField
                            size="small"
                            className={classes.textField}
                            variant="outlined"
                            fullWidth
                            name="date"
                            label="Date"
                            value={x.date}
                            helperText="i.e. mm/yyyy"
                            onChange={(e) => handleCertificateInputChange(e, i)}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} md={3} align="left">
                      {certificate.length !== 1 && (
                        <IconButton
                          onClick={() => handleCertificateRemoveClick(i)}
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
