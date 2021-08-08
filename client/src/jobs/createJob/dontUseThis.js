import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import axios from "axios";
import FloatCard from "../../components/FloatCard";
import SummaryForm from "./components/summaryForm";
import TaskForm from "./components/tasksForm";
import QualificationsForm from "./components/qualificationsForm";
import Keywords from "./components/keywords";
import TechStack from "./components/techStack";
import BACKEND_URL from "../../Config";
import SnackBarAlert from "../../components/SnackBarAlert";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1.5),
  },
  title: {
    color: theme.palette.stateBlue,
  },
  card: {
    marginBottom: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(3),
  },
  keywordsTitle: {
    fontSize: "15px",
    textAlign: "left",
    marginBottom: theme.spacing(2),
  },
  keywordsContainer: {
    padding: "0px",
  },
  keywordGridItem: {
    textAlign: "left",
    paddingLeft: theme.spacing(9),
  },
}));

const keywords = [
  { name: "Devops" },
  { name: "Development" },
  { name: "Design" },
  { name: "MERN" },
  { name: "Back end" },
];

const minEducationList = [
  "Bachelor's Degree (Undergraduate)",
  "Bachelor's Degree (Graduated)",
  "Master's Degree",
  "Diploma",
];

const minExperienceList = ["0", "0-1", "1-3", "+3"];

const getFormattedDate = (date) => {
  const dateStr = `${date.getDate().toString().padStart(2, "0")}/
  ${(date.getMonth() + 1).toString().padStart(2, "0")}/
  ${date.getFullYear().toString()}`;
  return dateStr;
};

const CreateJobForm = () => {
  const classes = useStyles();
  const empId = sessionStorage.getItem("loginId");
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

  const handleSubmit = async (event) => {
    event.preventDefault();
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

  return (
    <>
      {displayAlert()}

      <Grid item container sm={12} spacing={3} direction="row" justify="space-between" className={classes.mainGrid} alignItems="flex-start">
        <Grid item xs={12}>
          <FloatCard>
            <Typography variant="h6" className={classes.title}>
              Create a new Job
            </Typography>
          </FloatCard>
        </Grid>

        <Grid item xs={12}>
          <form onSubmit={handleSubmit}>
            <Grid container xs={12}>
              {displaySummary()}

              {/* Tasks and Responsibilities card */}
              <TaskForm
                tasksFields={tasksFields}
                handleTaskChange={handleTaskChange}
                handleTaskRemove={handleTaskRemove}
                handleTaskAdd={handleTaskAdd}
              ></TaskForm>

              {/* Qualifications */}
              <QualificationsForm
                qualificationsFields={qualificationsFields}
                handleQualificationChange={handleQualificationChange}
                handleQualificationRemove={handleQualificationRemove}
                handleQualificationAdd={handleQualificationAdd}
              ></QualificationsForm>

              {displayTechStack()}

              {displayKeywords()}
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default CreateJobForm;
