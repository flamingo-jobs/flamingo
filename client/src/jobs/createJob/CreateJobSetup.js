import { Container, Grid, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Step from "@material-ui/core/Step";
import StepContent from "@material-ui/core/StepContent";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FloatCard from "../../components/FloatCard";
import SnackBarAlert from "../../components/SnackBarAlert";
import NoAccess from "../../components/NoAccess";
import Loading from "../../components/Loading";
import Reached from "../../components/Reached";
import BACKEND_URL from "../../Config";
import AdditionalSkills from "./components/additionalSkills";
import QualificationsForm from "./components/qualificationsForm";
import SummaryForm from "./components/summaryForm";
import TaskForm from "./components/tasksForm";
import TechStack from "./components/techStack";
const jwt = require("jsonwebtoken");

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
  },
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

let haveAccess = false;
if (sessionStorage.getItem("userToken")) {
  var accessTokens = jwt.decode(sessionStorage.getItem("userToken"), {
    complete: true,
  }).payload.accessTokens;
  if (
    accessTokens.includes("all") ||
    accessTokens.includes("singlejob") ||
    accessTokens.includes("alljobs")
  ) {
    haveAccess = true;
  }
}

function getSteps() {
  return [
    "Basic Details",
    "Tasks and Responsibilities",
    "Qualifications and Requirements",
    "Technology Stack",
    "Skills",
  ];
}

export default function CreateJobSetup() {
  const classes = useStyles();

  const [salaryErrors, setSalaryErrors] = useState({ minSalary: "", maxSalary: "" });

  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = (index) => {
    if (activeStep === steps.length - 1) {
      handleSubmit();
    } else {
      var validation = validateStep(index);

      if (validation) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const validateSalary = () => {
    if(!errors.hasOwnProperty("minSalary") && !errors.hasOwnProperty("maxSalary")){
      if(minSalary !== "" && maxSalary !== ""){
        const newErrors = { ...errors };
        if(parseInt(minSalary, 10) >= parseInt(maxSalary, 10)){
          newErrors["minSalary"] = `Minimum salary should be less than maximum salary.`;
          setErrors(newErrors);
          return false;
        }
      }
    }
    return true;
  }

  const validateSalaryOnchange = () => {
    if(!errors.hasOwnProperty("maxSalary")){
      if(errors.hasOwnProperty("minSalary") && errors["minSalary"] === "Minimum salary should be less than maximum salary."){
        if(minSalary !== "" && maxSalary !== ""){
          var newErrors = { ...errors };
          if(parseInt(minSalary, 10) >= parseInt(maxSalary, 10)){
            newErrors["minSalary"] = `Minimum salary should be less than maximum salary.`;
          } else {
            delete newErrors["minSalary"];
          }
          setErrors(newErrors);
        }
      }
    }
  }

  const validateStep = (index) => {
    const newErrors = { ...errors };

    if (index === 0) {
      if (title.trim() === "") {
        // Required
        newErrors["title"] = `Title cannot be empty.`;
        setErrors(newErrors);
        return false;
      } else if (description.trim() === "") {
        // Required
        newErrors["description"] = `Description cannot be empty.`;
        setErrors(newErrors);
        return false;
      } else if (errors.hasOwnProperty("minSalary")) {
        return false;
      } else if (errors.hasOwnProperty("maxSalary")) {
        return false;
      } else if (errors.hasOwnProperty("numberOfVacancies")) {
        return false;
      }
    } else if (index === 1) {
      var emptyFieldFound = false;
      tasksFields.map((task, index) => {
        if (task === "") {
          emptyFieldFound = true;
          newErrors.tasks[index] = `This field cannot be empty.`;
        }
      });
      setErrors(newErrors);
      if (emptyFieldFound) {
        return false;
      }
    } else if (index === 2) {
      var emptyFieldFound = false;
      qualificationsFields.map((q, index) => {
        if (q === "") {
          emptyFieldFound = true;
          newErrors.requirements[index] = `This field cannot be empty.`;
        }
      });
      setErrors(newErrors);
      if (emptyFieldFound) {
        return false;
      }
    } else if (index === 3) {
      if (techStackState.length === 0) {
        newErrors["techStack"] = `Technology stack cannot be empty.`;
        setErrors(newErrors);
        return false;
      }
    }
    return true;
  };

  const minEducationList = [
    "Diploma",
    "Graduate Diploma",
    "Bachelor's",
    "Bachelor's Honours",
    "M.Phil.",
    "PhD",
  ];

  const minExperienceList = ["0", "0-1", "1-3", "3-5", "5+"];

  const getFormattedDate = (date) => {
    const dateStr = `${date.getDate().toString().padStart(2, "0")}/
    ${(date.getMonth() + 1).toString().padStart(2, "0")}/
    ${date.getFullYear().toString()}`;
    return dateStr;
  };

  // Session variables
  const empId = sessionStorage.getItem("loginId");
  const userId = jwt.decode(sessionStorage.getItem("userToken"), {
    complete: true,
  }).payload.userId;

  // Data retrieved from DB
  const [categories, setCategories] = useState("empty");
  const [types, setTypes] = useState("empty");
  const [employer, setEmployer] = useState("empty");
  const [technologies, setTechnologies] = useState("empty");
  const [subscriptionStatus, setSubscriptionStatus] = useState();

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
  const [dueDate, setDueDate] = useState(new Date());
  const [minEducation, setMinEducation] = useState(minEducationList[0]);
  const [minExperience, setMinExperience] = useState(minExperienceList[0]);
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [tasksFields, setTasksFields] = useState([""]);
  const [qualificationsFields, setQualificationsFields] = useState([""]);
  const [techStackState, setTechStack] = useState([]);
  const [additionalSkillsState, setAdditionalSkills] = useState([]);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isPublished, setIsPublished] = useState(true);
  const [numberOfVacancies, setNumberOfVacancies] = useState("");

  const [alertShow, setAlertShow] = React.useState(false);
  const [alertData, setAlertData] = React.useState({ severity: "", msg: "" });

  const [errors, setErrors] = useState({ tasks: [""], requirements: [""] });

  useEffect(() => {
    retrieveCategories();
    retrieveJobTypes();
    retrieveEmployer();
    retrieveTechnologies();
    retrieveSubscriptionStatus();
  }, []);

  // Job basic details
  const handleTextFieldChange = (e) => {
    const newErrors = { ...errors };
    // const regex = new RegExp('^[a-zA-Z0-9\)\(\\ ]+$');
    const name = e.target.name;
    const value = e.target.value;

    if (value.trim() === "") {
      newErrors[name] = `${
        name.charAt(0).toUpperCase() + name.slice(1)
      } cannot be empty.`;
    } else {
      delete newErrors[name];
    }
    setErrors(newErrors);
    if (name === "title") {
      setTitle(value);
    } else if (name === "description") {
      setDescription(value);
    }
  };
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  const handleJobTypeChange = (event) => {
    setJobType(event.target.value);
  };
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };
  const handleDateChange = (date) => {
    // setDueDate(getFormattedDate(date));
    setDueDate(date);
  };

  const handleMinSalaryChange = (e) => {
    const newErrors = { ...errors };
    const regex = new RegExp("^[0-9]+$");
    const name = e.target.name;
    const value = e.target.value;

    if (value.trim() === "") {
      delete newErrors[name];
    } else {
      if (regex.test(value.trim().replace(/\s/g, ""))) {
        delete newErrors[name];
      } else {
        newErrors[name] = "Salary can only contain numbers.";
      }
    }
    setErrors(newErrors);
    setMinSalary(value);
    // if (name === "minSalary") {
    //   setMinSalary(value);
    // } else if (name === "maxSalary") {
    //   setMaxSalary(value);
    // }
  };

  const handleMaxSalaryChange = (e) => {
    const newErrors = { ...errors };
    const regex = new RegExp("^[0-9]+$");
    const name = e.target.name;
    const value = e.target.value;

    if (value.trim() === "") {
      delete newErrors[name];
      
    } else {
      if (regex.test(value.trim().replace(/\s/g, ""))) {
        delete newErrors[name];
      } else {
        newErrors[name] = "Salary can only contain numbers.";
      }
    }
    setErrors(newErrors);
    setMaxSalary(value);
    // if (name === "minSalary") {
    //   setMinSalary(value);
    // } else if (name === "maxSalary") {
    //   setMaxSalary(value);
    // }
  };

  const handleVacanciesChange = (e) => {
    const newErrors = { ...errors };
    const regex = new RegExp("^[0-9]+$");
    const name = e.target.name;
    const value = e.target.value;

    if (value.trim() === "") {
      delete newErrors[name];
    } else {
      if (regex.test(value.trim().replace(/\s/g, ""))) {
        delete newErrors[name];
      } else {
        newErrors[name] = "Number of vacancies can only contain numbers.";
      }
    }
    setErrors(newErrors);

    setNumberOfVacancies(value);
  };

  const handleMinEducationChange = (event) => {
    setMinEducation(event.target.value);
  };
  const handleMinExperienceChange = (event) => {
    setMinExperience(event.target.value);
  };

  // ***** Tasks & Responsibilities *****
  const handleTaskChange = (e, index) => {
    const newErrors = { ...errors };
    const value = e.target.value;

    if (value.trim() === "") {
      newErrors.tasks[index] = "This field cannot be empty.";
    } else {
      newErrors.tasks[index] = "";
    }
    setErrors(newErrors);

    const newTasksFields = tasksFields.map((taskField, i) => {
      if (index === i) {
        taskField = value;
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

    var newErrors = { ...errors };
    newErrors.tasks.splice(
      newErrors.tasks.findIndex((taskErr, i) => index === i),
      1
    );
    setErrors(newErrors);
  };

  const handleTaskAdd = () => {
    setTasksFields([...tasksFields, ""]);
    // Add element to errors task array
    var newErrors = { ...errors };
    newErrors.tasks = [...newErrors.tasks, ""];
    setErrors(newErrors);
  };

  // ***** Qualifications *****
  const handleQualificationChange = (e, index) => {
    const newErrors = { ...errors };
    const value = e.target.value;

    if (value.trim() === "") {
      newErrors.requirements[index] = "This field cannot be empty.";
    } else {
      newErrors.requirements[index] = "";
    }
    setErrors(newErrors);

    const newQualificationsFields = qualificationsFields.map(
      (qualificationField, i) => {
        if (index === i) {
          qualificationField = value;
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

    var newErrors = { ...errors };
    newErrors.requirements.splice(
      newErrors.requirements.findIndex((requirementsErr, i) => index === i),
      1
    );
    setErrors(newErrors);
  };

  const handleQualificationAdd = () => {
    setQualificationsFields([...qualificationsFields, ""]);
    var newErrors = { ...errors };
    newErrors.requirements = [...newErrors.requirements, ""];
    setErrors(newErrors);
  };

  // Technology Stack
  const handleTechStack = (values) => {
    const newErrors = { ...errors };

    if (values.length === 0) {
      newErrors["techStack"] = `Technology stack cannot be empty.`;
    } else if (errors.hasOwnProperty("techStack")) {
      delete newErrors["techStack"];
    }
    setErrors(newErrors);

    setTechStack(values);
  };

  // Additional Skills
  const handleAdditionalSkillsChange = (values) => {
    setAdditionalSkills(values);
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
      title: title.trim(),
      category: category,
      type: jobType,
      description: description.trim(),
      organization: organization,
      location: location,
      postedDate: new Date(),
      dueDate: dueDate,
      minimumEducation: minEducation,
      minimumExperience: minExperience,
      salaryRange: {
        min: minSalary.trim().replace(/\s/g, ""),
        max: maxSalary.trim().replace(/\s/g, ""),
      },
      tasksAndResponsibilities: tasksFields.map((t) => t.trim()),
      qualifications: qualificationsFields.map((q) => q.trim()),
      technologyStack: techStackState,
      additionalSkills: additionalSkillsState,
      isPublished: isPublished,
      isFeatured: isFeatured,
      numberOfVacancies: numberOfVacancies.trim().replace(/\s/g, ""),
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
        await axios.get(
          `${BACKEND_URL}/jobs/generateRecommendations/${response.data.job._id}`
        );

        // Create Log
        const msg = "Job created";
        const status = "informational";
        await axios.post(
          `${BACKEND_URL}/logs/create/${response.data.job._id}/${userId}`,
          { msg: msg, status: status }
        );

        window.location = "/employer/jobs";
      } else {
        setAlertData({
          severity: "error",
          msg: response.data.error,
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
          title={title}
          location={location}
          empLocations={employer.locations}
          types={types}
          jobType={jobType}
          description={description}
          category={category}
          categories={categories}
          dueDate={dueDate}
          minEducation={minEducation}
          minExperience={minExperience}
          minEducationList={minEducationList}
          minExperienceList={minExperienceList}
          minSalary={minSalary}
          maxSalary={maxSalary}
          numberOfVacancies={numberOfVacancies}
          handleTextFieldChange={handleTextFieldChange}
          handleCategoryChange={handleCategoryChange}
          handleJobTypeChange={handleJobTypeChange}
          handleLocationChange={handleLocationChange}
          handleDateChange={handleDateChange}
          handleMinSalaryChange={handleMinSalaryChange}
          handleMaxSalaryChange={handleMaxSalaryChange}
          handleVacanciesChange={handleVacanciesChange}
          handleMinEducationChange={handleMinEducationChange}
          handleMinExperienceChange={handleMinExperienceChange}
          errors={errors}
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
          techStackState={techStackState}
          technologies={technologies}
          handleTechStack={handleTechStack}
          errors={errors}
        ></TechStack>
      );
    }
  };

  const displayAdditionalSkills = () => {
    if (technologies === "empty" || technologies === undefined) {
      return null;
    } else {
      return (
        <AdditionalSkills
          additionalSkillsState={additionalSkillsState}
          handleAdditionalSkillsChange={handleAdditionalSkillsChange}
        ></AdditionalSkills>
      );
    }
  };

  const retrieveSubscriptionStatus = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/employer/subscription-status/${empId}`
      );
      if (response.data.success) {
        setSubscriptionStatus(response.data.existingData);
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
        setLocation(response.data.employer.locations[0]);
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
        return (
          <TaskForm
            tasksFields={tasksFields}
            handleTaskChange={handleTaskChange}
            handleTaskRemove={handleTaskRemove}
            handleTaskAdd={handleTaskAdd}
            errors={errors}
          />
        );
      case 2:
        return (
          <QualificationsForm
            qualificationsFields={qualificationsFields}
            handleQualificationChange={handleQualificationChange}
            handleQualificationRemove={handleQualificationRemove}
            handleQualificationAdd={handleQualificationAdd}
            errors={errors}
          />
        );
      case 3:
        return displayTechStack();
      case 4:
        return displayAdditionalSkills();
      default:
        return "Unknown step";
    }
  };

  // style={{border: "1px solid red"}}
  return (
    <>
      {displayAlert()}
      <Grid item container sm={12} className={classes.root}>
        <Grid item xs={12} align="center">
          <div className={classes.floatCardWrapper}>
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
                  {haveAccess ? (
                    subscriptionStatus ? (
                      subscriptionStatus.subscriptionType === "Premium" ||
                      subscriptionStatus.subscriptionType === "premium" ||
                      subscriptionStatus.remainingJobs > 0 ? (
                        <div>
                          <Grid container direction="row">
                            <Grid item xs={12} align="left">
                              <Typography className={classes.mainTitle}>
                                Post a new job...
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
                                        color="primary"
                                        onClick={() => handleNext(index)}
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
                        </div>
                      ) : (
                        <Reached message="You have reached the maximum job count" />
                      )
                    ) : (
                      <Loading />
                    )
                  ) : (
                    <NoAccess />
                  )}
                </Grid>
              </Container>
            </FloatCard>
          </div>
        </Grid>
      </Grid>
    </>
  );
}
