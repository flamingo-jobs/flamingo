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
  Autocomplete,
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
  edu,
  handleEduInputChange,
  handleEduAddClick,
  handleEduRemoveClick,
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

  function getTitles(i) {
    for (let index = 0; index < allCertificates?.length; index++) {
      console.log(certificate[i])
      if (allCertificates[index].issuer === certificate[i].issuer) {
        let titles = allCertificates[index].certificates;
        return titles.map((title) => (
          <option value={title.name}>{title.name}</option>
        ));
      }
    }
  }

  useEffect(() => {
    fetchCertificates();
  }, [fetchedData]);

  const showEducation = (x, i) => {
    if (x.type === "Bachelor's" || x.type === "Bachelor's Honours") {
      return (
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} md={8} align="center">
            <TextField
              size="small"
              className={classes.textField}
              variant="outlined"
              fullWidth
              name="institute"
              label="University Name"
              required
              value={x.institute}
              onChange={(e) => handleEduInputChange(e, i)}
            />
          </Grid>
          <Grid item xs={12} md={4} align="center">
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
                onChange={(e) => handleEduInputChange(e, i)}
                label="Type"
              >
                <option value="Bachelor's">Bachelor's</option>
                <option value="Bachelor's Honours">Bachelor's Honours</option>
                <option value="Diploma">Diploma</option>
                <option value="Masters">Masters</option>
                <option value="M.Phil.">M.Phil.</option>
                <option value="PhD">PhD</option>
                <option value="School">School</option>
              </Select>
            </FormControl>
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
              onChange={(e) => handleEduInputChange(e, i)}
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
              type="number"
              InputProps={{ inputProps: { min: 0, max: 4, step: 0.1 } }}
              helperText="i. e. 3.74"
              value={x.GPA}
              onChange={(e) => handleEduInputChange(e, i)}
            />
          </Grid>
          <Grid item xs={12} md={6} align="center">
            <TextField
              size="small"
              className={classes.textField}
              variant="outlined"
              fullWidth
              name="startDate"
              helperText="From"
              type="month"
              value={x.startDate}
              onChange={(e) => handleEduInputChange(e, i)}
            />
          </Grid>
          <Grid item xs={12} md={6} align="center">
            <TextField
              size="small"
              className={classes.textField}
              variant="outlined"
              fullWidth
              name="endDate"
              helperText="To"
              type="month"
              value={x.endDate}
              onChange={(e) => handleEduInputChange(e, i)}
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
              onChange={(e) => handleEduInputChange(e, i)}
            />
          </Grid>
        </Grid>
      );
    } else if (
      x.type === "Diploma" ||
      x.type === "Graduate Diploma" ||
      x.type === "Masters" ||
      x.type === "M.Phil." ||
      x.type === "PhD"
    ) {
      return (
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} md={8} align="center">
            <TextField
              size="small"
              className={classes.textField}
              variant="outlined"
              fullWidth
              name="institute"
              label="University/ Institute"
              required
              value={x.institute}
              onChange={(e) => handleEduInputChange(e, i)}
            />
          </Grid>
          <Grid item xs={12} md={4} align="center">
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
                onChange={(e) => handleEduInputChange(e, i)}
                label="Type"
              >
                <option value="Bachelor's">Bachelor's</option>
                <option value="Bachelor's Honours">Bachelor's Honours</option>
                <option value="Diploma">Diploma</option>
                <option value="Masters">Masters</option>
                <option value="M.Phil.">M.Phil.</option>
                <option value="PhD">PhD</option>
                <option value="School">School</option>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} align="center">
            <TextField
              size="small"
              className={classes.textField}
              variant="outlined"
              fullWidth
              name="fieldOfStudy"
              label="Field Of Study"
              helperText="i.e. Computer Science/ Management"
              value={x.fieldOfStudy}
              onChange={(e) => handleEduInputChange(e, i)}
            />
          </Grid>
          <Grid item xs={12} md={6} align="center">
            <TextField
              size="small"
              className={classes.textField}
              variant="outlined"
              fullWidth
              name="startDate"
              helperText="From"
              type="month"
              value={x.startDate}
              onChange={(e) => handleEduInputChange(e, i)}
            />
          </Grid>
          <Grid item xs={12} md={6} align="center">
            <TextField
              size="small"
              className={classes.textField}
              variant="outlined"
              fullWidth
              name="endDate"
              helperText="To"
              type="month"
              value={x.endDate}
              onChange={(e) => handleEduInputChange(e, i)}
            />
          </Grid>
        </Grid>
      );
    } else if (x.type === "School") {
      return (
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} md={8} align="center">
            <TextField
              size="small"
              className={classes.textField}
              variant="outlined"
              fullWidth
              name="institute"
              label="School Name"
              required
              value={x.institute}
              onChange={(e) => handleEduInputChange(e, i)}
            />
          </Grid>
          <Grid item xs={12} md={4} align="center">
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
                onChange={(e) => handleEduInputChange(e, i)}
                label="Type"
              >
                <option value="Bachelor's">Bachelor's</option>
                <option value="Bachelor's Honours">Bachelor's Honours</option>
                <option value="Diploma">Diploma</option>
                <option value="Masters">Masters</option>
                <option value="M.Phil.">M.Phil.</option>
                <option value="PhD">PhD</option>
                <option value="School">School</option>
              </Select>
            </FormControl>
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
              onChange={(e) => handleEduInputChange(e, i)}
            />
          </Grid>
          <Grid item xs={12} md={6} align="center">
            <TextField
              size="small"
              className={classes.textField}
              variant="outlined"
              fullWidth
              name="startDate"
              helperText="From"
              type="month"
              value={x.startDate}
              onChange={(e) => handleEduInputChange(e, i)}
            />
          </Grid>
          <Grid item xs={12} md={6} align="center">
            <TextField
              size="small"
              className={classes.textField}
              variant="outlined"
              fullWidth
              name="endDate"
              helperText="To"
              type="month"
              value={x.endDate}
              onChange={(e) => handleEduInputChange(e, i)}
            />
          </Grid>
        </Grid>
      );
    }
  };

  return (
    <Container>
      <Grid
        container
        spacing={4}
        justify="space-between"
        className={classes.gridCont}
      >
        {/* Education Details */}
        <Grid item xs={12} md={6}>
          <Grid container alignItems="center" spacing={3}>
            <Grid item xs={12} align="left">
              <Typography component={"span"} className={classes.title}>
                <h4>Education Details</h4>
              </Typography>
            </Grid>
            <Grid item xs={12} align="left">
              {edu.map((x, i) => {
                return (
                  <Grid
                    container
                    alignItems="center"
                    spacing={3}
                    style={{ marginBottom: 20 }}
                    key={i}
                  >
                    <Grid item xs={12} md={9} align="center">
                      {showEducation(x, i)}
                    </Grid>
                    <Grid item xs={12} md={3} align="left">
                      {edu.length !== 1 && (
                        <IconButton
                          onClick={() => handleEduRemoveClick(i)}
                          color="secondary"
                        >
                          <RemoveCircleOutlineIcon />
                        </IconButton>
                      )}
                      {edu.length - 1 === i && (
                        <IconButton onClick={handleEduAddClick} color="primary">
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
                            required
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
                            onChange={(e) => handleCourseInputChange(e, i)}
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
                              Issuer *
                            </InputLabel>
                            <Select
                              native
                              label="Issuer"
                              name="issuer"
                              onChange={(e) => {
                                handleCertificateInputChange(e, i);
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
                              Certification *
                            </InputLabel>
                            <Select
                              native
                              name="title"
                              label="Certification"
                              onChange={(e) => handleCertificateInputChange(e, i)}
                              required
                            >
                              <option aria-label="None" value="" />
                              {getTitles(i)}
                            </Select>
                          </FormControl>
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
                          onClick={handleCertificateAddClick}
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
      </Grid>
    </Container>
  );
};
