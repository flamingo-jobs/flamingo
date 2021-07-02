import React, { useState, useEffect } from "react";
import { Grid, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import BACKEND_URL from "../../Config";
import FloatCard from "../../components/FloatCard";
import JobSummary from "./components/jobSummary";
import Qualifications from "./components/qualifications";
import Responsibilities from "./components/responsibilities";
import TechStack from "./components/techStack";
import Keywords from "./components/keywords";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0px",
    padding: "0px",
  },
  containerGridItem: {
    marginBottom: theme.spacing(3),
  },
  containerGridLastItem: {
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      marginBottom: "0px",
    },
  },
  feedbackMsgContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  feedbackMsg: {
    padding: "10px",
    marginBottom: theme.spacing(3),
    background: theme.palette.white,
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    borderRadius: "25px",
    boxShadow: "rgba(83, 144, 217, 0.1) 0px 4px 12px",
  },
  checkIcon: {
    color: "#2b9348",
  },
  errorIcon: {
    color: "#e63946",
  },
}));

const DisplayJob = () => {
  const classes = useStyles();
  const techs = [
    {
      _id: "60d9d8f5a66e6d5941d57fca",
      name: "Programming Languages",
      stack: {
        list: ["Java", "C", "C#", "Scala"],
      },
    },
    {
      _id: "60d9d8f5a66e6d5941d57fcw",
      name: "Programming",
      stack: {
        list: ["wwww", "rrrr", "tttt", "gggg"],
      },
    },
  ];
  const [changesApplied, setChangesApplied] = useState(false);
  const [changesNotApplied, setChangesNotApplied] = useState(false);
  const [job, setJob] = useState("empty");
  const [categories, setCategories] = useState("empty");
  const [types, setTypes] = useState("empty");
  const [employer, setEmployer] = useState("empty");
  const [technologies, setTechnologies] = useState(techs);
  const jobId = "60c184a2c76c4d325461e7f0";
  const empId = "60c246913542f942e4c84454";

  useEffect(() => {
    retrieveJob();
    retrieveCategories();
    retrieveJobTypes();
    retrieveEmployer();
  }, []);

  const retrieveJob = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/jobs/${jobId}`);
      if (response.data.success) {
        setJob(response.data.job);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const retrieveCategories = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/categories`);
      if (response.data.success) {
        setCategories(response.data.existingCategories);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const retrieveJobTypes = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/types`);
      if (response.data.success) {
        setTypes(response.data.existingTypes);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const retrieveEmployer = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/employers/${empId}`);
      if (response.data.success) {
        setEmployer(response.data.employer);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const retrieveTechnologies = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/technologies}`);
      if (response.data.success) {
        setTechnologies(response.data.existingTechnologies);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const displaySummary = () => {
    if (
      job === "empty" ||
      categories === "empty" ||
      types === "empty" ||
      employer === "empty"
    ) {
      return (
        <FloatCard>
          <Typography>No information to display</Typography>
        </FloatCard>
      );
    } else {
      return (
        <JobSummary
          jobId={jobId}
          job={job}
          setJob={setJob}
          categories={categories}
          types={types}
          locations={employer.locations}
          setChangesApplied={setChangesApplied}
          setChangesNotApplied={setChangesNotApplied}
        ></JobSummary>
      );
    }
  };

  const displayQualifications = () => {
    if (job === "empty") {
      return (
        <FloatCard>
          <Typography>No information to display</Typography>
        </FloatCard>
      );
    } else {
      return (
        <Qualifications
          jobId={jobId}
          job={job}
          setJob={setJob}
          setChangesApplied={setChangesApplied}
          setChangesNotApplied={setChangesNotApplied}
        ></Qualifications>
      );
    }
  };

  const displayResponsibilities = () => {
    if (job === "empty") {
      return (
        <FloatCard>
          <Typography>No information to display</Typography>
        </FloatCard>
      );
    } else {
      return (
        <Responsibilities
          jobId={jobId}
          job={job}
          setJob={setJob}
          setChangesApplied={setChangesApplied}
          setChangesNotApplied={setChangesNotApplied}
        ></Responsibilities>
      );
    }
  };
  const displayTechStack = () => {
    if (job === "empty" || technologies === "empty") {
      return (
        <FloatCard>
          <Typography>No information to display</Typography>
        </FloatCard>
      );
    } else {
      return (
        <TechStack
          jobId={jobId}
          job={job}
          setJob={setJob}
          technologies={technologies}
          setChangesApplied={setChangesApplied}
          setChangesNotApplied={setChangesNotApplied}
        ></TechStack>
      );
    }
  };
  const displayKeywords = () => {
    if (job === "empty") {
      return (
        <FloatCard>
          <Typography>No information to display</Typography>
        </FloatCard>
      );
    } else {
      return (
        <Keywords
          jobId={jobId}
          job={job}
          setJob={setJob}
          setChangesApplied={setChangesApplied}
          setChangesNotApplied={setChangesNotApplied}
        ></Keywords>
      );
    }
  };

  const displaySuccessMsg = () => {
    if (changesApplied) {
      return (
        <div className={classes.feedbackMsgContainer}>
          <div className={classes.feedbackMsg}>
            <CheckCircleIcon className={classes.checkIcon} />
            <Typography alignItems="center">Changes applied !</Typography>
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  const displayUnsuccessMsg = () => {
    if (changesNotApplied) {
      return (
        <div className={classes.feedbackMsgContainer}>
          <div className={classes.feedbackMsg}>
            <ErrorIcon className={classes.errorIcon} />
            <Typography alignItems="center">
              Changes could not be applied !
            </Typography>
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  //  style={{border: "1px solid red"}}
  return (
    <>
      {displaySuccessMsg()}
      {displayUnsuccessMsg()}
      <Grid container xs={12} spacing={3}>
        {/* Left column */}
        <Grid item xs={12} lg={6}>
          <Grid container xs={12}>
            <Grid item xs={12} className={classes.containerGridItem}>
              {displaySummary()}
            </Grid>
            <Grid item xs={12} className={classes.containerGridLastItem}>
              {displayQualifications()}
            </Grid>
          </Grid>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} lg={6}>
          <Grid container xs={12}>
            <Grid item xs={12} className={classes.containerGridItem}>
              {displayTechStack()}
            </Grid>
            <Grid item xs={12} className={classes.containerGridItem}>
              {displayKeywords()}
            </Grid>
            <Grid item xs={12} className={classes.containerGridLastItem}>
              {displayResponsibilities()}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default DisplayJob;
