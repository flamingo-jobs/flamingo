import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import BACKEND_URL from "../../Config";
import FloatCard from "../../components/FloatCard";
import JobSummary from "./components/jobSummary";
import Qualifications from "./components/qualifications";
import Responsibilities from "./components/responsibilities";
import TechStack from "./components/techStack";
import AdditionalSkills from "./components/additionalSkills";
import SnackBarAlert from "../../components/SnackBarAlert";

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
    [theme.breakpoints.down("md")]: {
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

  const [job, setJob] = useState("empty");
  const [categories, setCategories] = useState("empty");
  const [types, setTypes] = useState("empty");
  const [employer, setEmployer] = useState("empty");
  const [technologies, setTechnologies] = useState("empty");
  // const jobId = "60c184a2c76c4d325461e7f0";
  // const empId = "60c246913542f942e4c84454";
  const [jobId, setJobId] = useState(window.location.pathname.split("/")[4]);
  const [empId, setEmpId] = useState(sessionStorage.getItem("loginId"));

  const [alertShow, setAlertShow] = React.useState(false);
  const [alertData, setAlertData] = React.useState({ severity: "", msg: "" });

  const [errors, setErrors] = useState({ tasks: [], requirements:[] });

  useEffect(() => {
    retrieveJob();
    retrieveCategories();
    retrieveJobTypes();
    retrieveEmployer();
    retrieveTechnologies();
  }, []);

  // Error related stuff
  const displayAlert = () => {
    return (
      <SnackBarAlert
        open={alertShow}
        onClose={handleAlertClose}
        severity={alertData.severity}
        msg={alertData.msg}
      />
    );
  };

  const handleAlert = () => {
    setAlertShow(true);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertShow(false);
  };

  const createErrorArray = () => {
    const newErrors = {...errors};
    if(job !== "empty"){
      job.qualifications.map(q => {
        newErrors.requirements = [...newErrors.requirements, ""];
      });
      setErrors(newErrors);
    }
  }

  const retrieveJob = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/jobs/${jobId}`);
      if (response.data.success) {
        setJob(response.data.job);
        console.log("add skills", response.data.job)
      }
    } catch (err) {
      console.error(err);
    }
  };

  const retrieveCategories = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/categories`);
      if (response.data.success) {
        setCategories(response.data.existingData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const retrieveJobTypes = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/types`);
      if (response.data.success) {
        setTypes(response.data.existingData);
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
      const response = await axios.get(`${BACKEND_URL}/technologies`);
      if (response.data.success) {
        setTechnologies(response.data.existingData);
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
          setAlertData={setAlertData}
          handleAlert={handleAlert}
          errors={errors}
          setErrors={setErrors}
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
          setAlertData={setAlertData}
          handleAlert={handleAlert}
          errors={errors}
          setErrors={setErrors}
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
          setAlertData={setAlertData}
          handleAlert={handleAlert}
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
          setAlertData={setAlertData}
          handleAlert={handleAlert}
        ></TechStack>
      );
    }
  };

  const displayAdditionalSkills = () => {
    if (job === "empty") {
      return (
        <FloatCard>
          <Typography>No information to display</Typography>
        </FloatCard>
      );
    } else {
      return (
        <AdditionalSkills
          jobId={jobId}
          job={job}
          setJob={setJob}
          setAlertData={setAlertData}
          handleAlert={handleAlert}
        ></AdditionalSkills>
      );
    }
  };

  //  style={{border: "1px solid red"}}
  return (
    <>
      {displayAlert()}
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
              {displayAdditionalSkills()}
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
