import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography, Checkbox, Button } from "@material-ui/core";
import axios from "axios";

// Custom components
import FloatCard from "../../components/FloatCard";
import SummaryForm from "./components/summaryForm";
import TaskForm from "./components/tasksForm";
import QualificationsForm from "./components/qualificationsForm";
import Keywords from "./components/keywords";
import TechStack from "./components/techStack";
import BACKEND_URL from "../../Config";
import FeedbackModal from "./components/feedbackModal";
import checkAnimation from "./lotties/check.json";
import ExclamationMarkAnimation from "./lotties/exclamation.json";

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

const jobTypes = [{ name: "Full-time" }, { name: "Part-time" }];

const categories = [{ name: "Design" }, { name: "Development" }];

const keywords = [
  { name: "Devops" },
  { name: "Development" },
  { name: "Design" },
  { name: "MERN" },
  { name: "Back end" },
];

const techStack = [
  { name: "React" },
  { name: "Express" },
  { name: "Node" },
  { name: "MongoDB" },
];

const getCurrentDate = () => {
  const date = new Date();
  const dateStr = `${date.getDate().toString().padStart(2, "0")}/${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${date.getFullYear().toString()}`;
  return dateStr;
};

const CreateJobForm = () => {
  const classes = useStyles();

  // const [modalStyle] = React.useState(getModalStyle);
  const [successOpen, setSuccessOpen] = useState(false);
  const [unsuccessOpen, setUnsuccessOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Development");
  const [jobType, setJobType] = useState("Full-time");
  const [description, setDescription] = useState("");
  const [organization, setOrganization] = useState({
    id: "12345",
    name: "Virtusa",
  });
  const [location, setLocation] = useState("");
  const [currentDate, setCurrentDate] = useState(getCurrentDate());
  const [dueDate, setDueDate] = useState("12/12/2012");
  const [minSalary, setMinSalary] = useState(0);
  const [maxSalary, setMaxSalary] = useState(0);
  const [tasksFields, setTasksFields] = useState([""]);
  const [qualificationsFields, setQualificationsFields] = useState([""]);
  const [techStackState, setTechStack] = useState([]);
  const [keywordsState, setKeywords] = useState([]);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isPublished, setIsPublished] = useState(true);

  // console.log("currentDate", currentDate)

  // Modals
  const handleSuccessClose = () => {
    setSuccessOpen(false);
  };
  const handleUnsuccessClose = () => {
    setUnsuccessOpen(false);
  };

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
  const handleMinSalaryChange = (event) => {
    setMinSalary(parseFloat(event.target.value, 10));
  };
  const handleMaxSalaryChange = (event) => {
    setMaxSalary(parseFloat(event.target.value, 10));
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
        setSuccessOpen(true);
      } else {
        setUnsuccessOpen(true);
      }
    } catch (err) {
      setUnsuccessOpen(true);
      // console.log(err);
    }
  };

  return (
    <>
      <FeedbackModal
        open={successOpen}
        handleClose={handleSuccessClose}
        animation={checkAnimation}
        loop={false}
        msg={"Job Created, successfully !"}
      ></FeedbackModal>

      <FeedbackModal
        open={unsuccessOpen}
        handleClose={handleUnsuccessClose}
        animation={ExclamationMarkAnimation}
        loop={true}
        msg={"Sorry. Something went wrong. Please try again later."}
      ></FeedbackModal>

      <Grid container spacing={2} className={classes.root} justify="center">
        <Grid item xs={10}>
          <FloatCard>
            <Typography variant="h6" className={classes.title}>
              Create a new Job
            </Typography>
          </FloatCard>
        </Grid>

        <Grid item xs={10}>
          <form onSubmit={handleSubmit}>
            <Grid container xs={12}>
              {/* Job summary */}
              <SummaryForm
                location={location}
                jobType={jobType}
                category={category}
                handleTitleChange={handleTitleChange}
                handleCategoryChange={handleCategoryChange}
                handleJobTypeChange={handleJobTypeChange}
                handleDescriptionChange={handleDescriptionChange}
                handleLocationChange={handleLocationChange}
                handleMinSalaryChange={handleMinSalaryChange}
                handleMaxSalaryChange={handleMaxSalaryChange}
              ></SummaryForm>

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

              {/* Technology Stack */}
              <TechStack
                techStack={techStack}
                handleTechStack={handleTechStack}
              ></TechStack>

              {/* Keywords */}
              <Keywords
                keywords={keywords}
                handleKeywordsChange={handleKeywordsChange}
              ></Keywords>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default CreateJobForm;
