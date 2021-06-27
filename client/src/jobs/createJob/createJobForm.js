import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Typography, Checkbox } from "@material-ui/core";
import axios from "axios";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

// Custom components
import FloatCard from "../../components/FloatCard";
import SummaryForm from "./components/summaryForm";
import TaskForm from "./components/tasksForm";
import QualificationsForm from "./components/qualificationsForm";
import Keywords from "./components/keywords";
import TechStack from "./components/techStack";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1.5),
  },
  title: {
    color: theme.palette.black,
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

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Development");
  const [jobType, setJobType] = useState("Full-time");
  const [description, setDescription] = useState("");
  const [currentDate, setCurrentDate] = useState(getCurrentDate());
  const [minSalary, setMinSalary] = useState(0);
  const [maxSalary, setMaxSalary] = useState(0);
  const [tasksFields, setTasksFields] = useState([{ task: "" }]);
  const [qualificationsFields, setQualificationsFields] = useState([
    { qualification: "" },
  ]);
  const [techStackState, setTechStack] = useState([]);
  const [keywordsState, setKeywords] = useState([]);

  // console.log("state", title, category, jobType, description, minSalary, minSalary, maxSalary)
  // console.log("tasksFields", tasksFields)
  // console.log("qualificationsFields", qualificationsFields)
  // console.log("techStackState", techStackState)
  // console.log("keywordsState", keywordsState)

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
  const handleMinSalaryChange = (event) => {
    setMinSalary(event.target.value);
  };
  const handleMaxSalaryChange = (event) => {
    setMaxSalary(event.target.value);
  };

  // ***** Tasks & Responsibilites *****
  const handleTaskChange = (event, index) => {
    const newTasksFields = tasksFields.map((taskField, i) => {
      if (index === i) {
        taskField[event.target.name] = event.target.value;
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
    setTasksFields([...tasksFields, { task: "" }]);
  };

  // ***** Qualifications *****
  const handleQualificationChange = (event, index) => {
    const newQualificationsFields = qualificationsFields.map(
      (qualificationField, i) => {
        if (index === i) {
          qualificationField[event.target.name] = event.target.value;
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
    setQualificationsFields([...qualificationsFields, { qualification: "" }]);
  };

  // Technology Stack
  const handleTechStack = (values) => {
    setTechStack(values);
  };

  // Keywords
  const handleKeywordsChange = (values) => {
    setKeywords(values);
  };

  return (
    <>
      <Grid container spacing={2} className={classes.root} justify="center">
        <Grid item xs={10}>
          <FloatCard>
            <Typography variant="h6" className={classes.title}>
              Create a new Job
            </Typography>
          </FloatCard>
        </Grid>

        <Grid item xs={10}>
          <form>
            <Grid container xs={12}>
              {/* Job summary */}
              <SummaryForm
                jobType={jobType}
                category={category}
                handleTitleChange={handleTitleChange}
                handleCategoryChange={handleCategoryChange}
                handleJobTypeChange={handleJobTypeChange}
                handleDescriptionChange={handleDescriptionChange}
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
