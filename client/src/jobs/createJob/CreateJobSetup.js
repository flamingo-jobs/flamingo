import React, { useState, useEffect } from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Container } from "@material-ui/core";
import axios from "axios";
import FloatCard from "../../components/FloatCard";
import SummaryForm from "./components/summaryForm";
import TaskForm from "./components/tasksForm";
import QualificationsForm from "./components/qualificationsForm";
import Keywords from "./components/keywords";
import TechStack from "./components/techStack";
import BACKEND_URL from "../../Config";
import SnackBarAlert from "../../components/SnackBarAlert";
const jwt = require("jsonwebtoken");

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginTop: 16,
    textAlign: "right",
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  stepper: {
    background: "transparent",
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 500,
    marginTop: 40,
    marginLeft: 20,
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
    marginRight: 16,
    "&:hover": {
      backgroundColor: theme.palette.white,
      color: "black",
      boxShadow: "none",
    },
  },
  skip: {
    marginTop: 50,
    marginRight: 20,
  },
  label: {
    textAlign: "left",
    fontWeight: 600,
    fontSize: 14,
  },
  active: {
    textAlign: "left",
    fontWeight: 600,
    fontSize: 18,
  },
  completed: {
    textAlign: "left",
    fontWeight: 600,
    fontSize: 16,
  },
}));

function getSteps() {
  return ["Basic Details", "Tasks and Responsibilites", "Qualifications and Requirements", "Technology Stack", "Keywords"];
}

export default function CreateJobSetup() {
  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handleSubmit();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };



  const keywords = [
    { name: "Devops" },
    { name: "Development" },
    { name: "Design" },
    { name: "MERN" },
    { name: "Back end" },
  ];

  const minEducationList = [
    "Diploma",
    "Graduate Diploma",
    "Bachelor's",
    "Bachelor's Honours",
    "M.Phil.",
    "PhD",
  ];

  const minExperienceList = ["0", "0-1", "1-3", "+3"];

  const getFormattedDate = (date) => {
    const dateStr = `${date.getDate().toString().padStart(2, "0")}/
    ${(date.getMonth() + 1).toString().padStart(2, "0")}/
    ${date.getFullYear().toString()}`;
    return dateStr;
  };

  // Session variables
  const empId = sessionStorage.getItem("loginId");
  const userId = jwt.decode(sessionStorage.getItem("userToken"),{complete:true}).payload.userId;

  // Data retrieved from DB
  const [categories, setCategories] = useState("empty");
  const [types, setTypes] = useState("empty");
  const [employer, setEmployer] = useState("empty");
  const [technologies, setTechnologies] = useState("empty");

  // Job state
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Development");
  const [jobType, setJobType] = useState("Full-time");
  const [description, setDescription] = useState("");
  const [organization, setOrganization] = useState({
    id: "",
    name: "",
    logo: "",
  });
  const [location, setLocation] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(null);
  const [minEducation, setMinEducation] = useState(minEducationList[0]);
  const [minExperience, setMinExperience] = useState(minExperienceList[0]);
  const [minSalary, setMinSalary] = useState(0);
  const [maxSalary, setMaxSalary] = useState(0);
  const [tasksFields, setTasksFields] = useState([""]);
  const [qualificationsFields, setQualificationsFields] = useState([""]);
  const [techStackState, setTechStack] = useState([]);
  const [keywordsState, setKeywords] = useState([]);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isPublished, setIsPublished] = useState(true);

  const [alertShow, setAlertShow] = React.useState(false);
  const [alertData, setAlertData] = React.useState({ severity: "", msg: "" });

  useEffect(() => {
    retrieveCategories();
    retrieveJobTypes();
    retrieveEmployer();
    retrieveTechnologies();
  }, []);

  // Job basic details
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  const handleJobTypeChange = (event) => {
    setJobType(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };
  const handleDateChange = (date) => {
    // setDueDate(getFormattedDate(date));
    setDueDate(date);
  };
  const handleMinSalaryChange = (event) => {
    setMinSalary(parseFloat(event.target.value, 10));
  };
  const handleMaxSalaryChange = (event) => {
    setMaxSalary(parseFloat(event.target.value, 10));
  };
  const handleMinEducationChange = (event) => {
    setMinEducation(event.target.value);
  };
  const handleMinExperienceChange = (event) => {
    setMinExperience(event.target.value);
  };

  // ***** Tasks & Responsibilites *****
  const handleTaskChange = (event, index) => {
    const newTasksFields = tasksFields.map((taskField, i) => {
      if (index === i) {
        taskField = event.target.value;
      }
      return taskField;
    });

    setTasksFields(newTasksFields);
  };

  const handleTaskRemove = (index) => {
    const newTasksFields = [...tasksFields];
    newTasksFields.splice(
      newTasksFields.findIndex((task, i) => index === i),
      1
    );
    setTasksFields(newTasksFields);
  };

  const handleTaskAdd = () => {
    setTasksFields([...tasksFields, [""]]);
  };

  // ***** Qualifications *****
  const handleQualificationChange = (event, index) => {
    const newQualificationsFields = qualificationsFields.map(
      (qualificationField, i) => {
        if (index === i) {
          qualificationField = event.target.value;
        }
        return qualificationField;
      }
    );

    setQualificationsFields(newQualificationsFields);
  };

  const handleQualificationRemove = (index) => {
    const newQualificationsFields = [...qualificationsFields];
    newQualificationsFields.splice(
      newQualificationsFields.findIndex((qualification, i) => index === i),
      1
    );
    setQualificationsFields(newQualificationsFields);
  };

  const handleQualificationAdd = () => {
    setQualificationsFields([...qualificationsFields, [""]]);
  };

  // Technology Stack
  const handleTechStack = (values) => {
    setTechStack(values);
  };

  // Keywords
  const handleKeywordsChange = (values) => {
    setKeywords(values);
  };

  // Alert stuff
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

  const handleSubmit = async () => {
    const newJob = {
      title: title,
      category: category,
      type: jobType,
      description: description,
      organization: organization,
      location: location,
      postedDate: currentDate,
      dueDate: dueDate,
      minimumEducation: minEducation,
      minimumExperience: minExperience,
      salaryRange: {
        min: minSalary,
        max: maxSalary,
      },
      tasksAndResponsibilities: tasksFields,
      qualifications: qualificationsFields,
      technologyStack: techStackState,
      keywords: keywordsState,
      isPublished: isPublished,
      isFeatured: isFeatured,
      createdBy: userId,
    };

    try {
      const response = await axios.post(`${BACKEND_URL}/jobs/create`, newJob);
      if (response.data.success === true) {
        setAlertData({
          severity: "success",
          msg: "Job created successfully!",
        });
        handleAlert();
        await axios.get(`${BACKEND_URL}/jobs/generateRecommendations/${response.data.job._id}`);
        window.location = "/employer/jobs";
      } else {
        setAlertData({
          severity: "error",
          msg: "Job could not be created!",
        });
        handleAlert();
      }
    } catch (err) {
      setAlertData({
        severity: "error",
        msg: "Sorry, Something Went Wrong!",
      });
      handleAlert();
      // console.log(err);
    }
  };

  const displaySummary = () => {
    if (categories === "empty" || types === "empty" || employer === "empty") {
      return null;
    } else {
      return (
        <SummaryForm
          location={location}
          empLocations={employer.locations}
          types={types}
          jobType={jobType}
          category={category}
          categories={categories}
          dueDate={dueDate}
          minEducation={minEducation}
          minExperience={minExperience}
          minEducationList={minEducationList}
          minExperienceList={minExperienceList}
          handleTitleChange={handleTitleChange}
          handleCategoryChange={handleCategoryChange}
          handleJobTypeChange={handleJobTypeChange}
          handleDescriptionChange={handleDescriptionChange}
          handleLocationChange={handleLocationChange}
          handleDateChange={handleDateChange}
          handleMinSalaryChange={handleMinSalaryChange}
          handleMaxSalaryChange={handleMaxSalaryChange}
          handleMinEducationChange={handleMinEducationChange}
          handleMinExperienceChange={handleMinExperienceChange}
        ></SummaryForm>
      );
    }
  };
  const displayTechStack = () => {
    if (technologies === "empty") {
      return null;
    } else {
      return (
        <TechStack
          technologies={technologies}
          handleTechStack={handleTechStack}
        ></TechStack>
      );
    }
  };

  const displayKeywords = () => {
    if (technologies === "empty" || technologies === undefined) {
      return null;
    } else {
      return (
        <Keywords
          keywords={keywords}
          handleKeywordsChange={handleKeywordsChange}
        ></Keywords>
      );
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
        setOrganization({
          id: response.data.employer._id,
          name: response.data.employer.name,
          logo: response.data.employer.logo,
        });
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

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return displaySummary();
      case 1:
        return <TaskForm
          tasksFields={tasksFields}
          handleTaskChange={handleTaskChange}
          handleTaskRemove={handleTaskRemove}
          handleTaskAdd={handleTaskAdd} />;
      case 2:
        return <QualificationsForm
          qualificationsFields={qualificationsFields}
          handleQualificationChange={handleQualificationChange}
          handleQualificationRemove={handleQualificationRemove}
          handleQualificationAdd={handleQualificationAdd} />;
      case 3:
        return displayTechStack();
      case 4:
        return displayKeywords();
      default:
        return "Unknown step";
    }
  };

  return (
    <>
      {displayAlert()}
      <Grid item container sm={12} spacing={3} direction="row" justify="space-between" className={classes.mainGrid} alignItems="flex-start">

        <Grid item xs={12} align="center">
          <FloatCard>
            <Container>
              <Grid
                container
                spacing={4}
                direction="column"
                justify="center"
                alignItems="stretch"
                className={classes.gridCont}
              >
                <Grid container direction="row">
                  <Grid item xs={12} align="left">
                    <Typography className={classes.mainTitle}>
                      Create a new job...
                    </Typography>
                  </Grid>
                </Grid>
                <Stepper
                  activeStep={activeStep}
                  orientation="vertical"
                  className={classes.stepper}
                >
                  {steps.map((label, index) => (
                    <Step key={label}>
                      <StepLabel
                        classes={{
                          label: classes.label,
                          active: classes.active,
                          completed: classes.completed,
                        }}
                      >
                        {label}
                      </StepLabel>
                      <StepContent>
                        {getStepContent(index)}
                        <div className={classes.actionsContainer}>
                          <div>
                            {activeStep === 0 ? (
                              <Link to="/employer/jobs">
                                <Button className={classes.previous}>
                                  Cancel
                                </Button>
                              </Link>
                            ) : (
                              <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                className={classes.previous}
                              >
                                Back
                              </Button>
                            )}
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={handleNext}
                              className={classes.next}
                            >
                              {activeStep === steps.length - 1
                                ? "Finish"
                                : "Next"}
                            </Button>
                          </div>
                        </div>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
                {activeStep === steps.length && (
                  <Paper
                    square
                    elevation={0}
                    className={classes.resetContainer}
                  >
                    <Typography>
                      All steps completed - you&apos;re finished
                    </Typography>
                    <Button
                      onClick={handleReset}
                      className={classes.button}
                    >
                      Reset
                    </Button>
                  </Paper>
                )}
              </Grid>
            </Container>
          </FloatCard>
        </Grid>
      </Grid>
    </>
  );
}
