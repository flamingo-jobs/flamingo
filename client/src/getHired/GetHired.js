import { React, useState } from "react";
import { useForm, useStep } from "react-hooks-helper";
import {
  Button,
  TextField,
  Box,
  Grid,
  Typography,
  Container,
  IconButton,
  Stepper,
  Step,
  StepLabel,
} from "@material-ui/core";
import { PersonalDetails } from "./components/PersonalDetails";
import { Qualifications } from "./components/Qualifications";
import { Preferences } from "./components/Preferences";
import { Review } from "./components/Review";
import { Submit } from "./components/Submit";

const defaultData = {
  firstName: "",
  lastName: "",
  description: "",
  street: "",
  city: "",
  zipcode: "",
  mobile: "",
  landLine: "",
  email: "",
  password: "",
  condirmPassword: "",
};

const steps = [
  { id: "personal" },
  { id: "preferences" },
  { id: "qualifications" },
  { id: "review" },
  { id: "submit" },
];

export default function GetHired() {
  const [formData, setForm] = useForm(defaultData);
  const { step, navigation } = useStep({
    steps,
    initialStep: 0,
  });

  const [birthday, setBirthday] = useState(new Date("2014-08-18"));
  const handleDateChange = (date) => {
    setBirthday(date);
  };

  const [school, setSchool] = useState([
    { school: "", degree: "", schoolFrom: "", schoolTo: "" },
  ]);
  const handleSchoolInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...school];
    list[index][name] = value;
    setSchool(list);
  };
  const handleSchoolRemoveClick = (index) => {
    const list = [...school];
    list.splice(index, 1);
    setSchool(list);
  };
  const handleSchoolAddClick = () => {
    setSchool([...school, { school: "", year: "" }]);
  };

  const [course, setCourse] = useState([{ course: "", institute: "" }]);
  const handleCourseInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...course];
    list[index][name] = value;
    setCourse(list);
  };
  const handleCourseRemoveClick = (index) => {
    const list = [...course];
    list.splice(index, 1);
    setCourse(list);
  };
  const handleCourseAddClick = () => {
    setCourse([...course, { course: "", institute: "" }]);
  };

  const [award, setAward] = useState([{ award: "", awardDescription: "" }]);
  const handleAwardInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...award];
    list[index][name] = value;
    setAward(list);
  };
  const handleAwardRemoveClick = (index) => {
    const list = [...award];
    list.splice(index, 1);
    setAward(list);
  };
  const handleAwardAddClick = () => {
    setAward([...award, { award: "", awardDescription: "" }]);
  };

  const [achievement, setAchievement] = useState([
    { achievement: "", achievementDescription: "" },
  ]);
  const handleAchievementInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...achievement];
    list[index][name] = value;
    setAchievement(list);
  };
  const handleAchievementRemoveClick = (index) => {
    const list = [...achievement];
    list.splice(index, 1);
    setAchievement(list);
  };
  const handleAchievementAddClick = () => {
    setAchievement([
      ...achievement,
      { achievement: "", achievementDescription: "" },
    ]);
  };

  const [work, setWork] = useState([
    { work: "", workPosition: "", workFrom: "", workTo: "" },
  ]);
  const handleWorkInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...work];
    list[index][name] = value;
    setWork(list);
  };
  const handleWorkRemoveClick = (index) => {
    const list = [...work];
    list.splice(index, 1);
    setWork(list);
  };
  const handleWorkAddClick = () => {
    setWork([
      ...work,
      { work: "", workPosition: "", workFrom: "", workTo: "" },
    ]);
  };

  const [project, setProject] = useState([{ project: "", projectLink: "" }]);
  const handleProjectInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...project];
    list[index][name] = value;
    setProject(list);
  };
  const handleProjectRemoveClick = (index) => {
    const list = [...project];
    list.splice(index, 1);
    setProject(list);
  };
  const handleProjectAddClick = () => {
    setProject([...project, { project: "", projectLink: "" }]);
  };

  const [volunteer, setVolunteer] = useState([
    { volunteer: "", volunteerDescription: "" },
  ]);
  const handleVolunteerInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...volunteer];
    list[index][name] = value;
    setVolunteer(list);
  };
  const handleVolunteerRemoveClick = (index) => {
    const list = [...volunteer];
    list.splice(index, 1);
    setVolunteer(list);
  };
  const handleVolunteerAddClick = () => {
    setVolunteer([...volunteer, { volunteer: "", volunteerDescription: "" }]);
  };

  const [tech, setTech] = useState([{ tech: "", techRate: 0 }]);
  const handleTechInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...tech];
    list[index][name] = value;
    setTech(list);
  };
  const handleTechRemoveClick = (index) => {
    const list = [...tech];
    list.splice(index, 1);
    setTech(list);
  };
  const handleTechAddClick = () => {
    setTech([...tech, { tech: "", techRate: 40 }]);
  };

  const props = {
    formData,
    setForm,
    birthday,
    handleDateChange,
    school,
    handleSchoolInputChange,
    handleSchoolAddClick,
    handleSchoolRemoveClick,
    course,
    handleCourseInputChange,
    handleCourseAddClick,
    handleCourseRemoveClick,
    award,
    handleAwardInputChange,
    handleAwardAddClick,
    handleAwardRemoveClick,
    achievement,
    handleAchievementInputChange,
    handleAchievementAddClick,
    handleAchievementRemoveClick,
    work,
    handleWorkInputChange,
    handleWorkAddClick,
    handleWorkRemoveClick,
    project,
    handleProjectInputChange,
    handleProjectAddClick,
    handleProjectRemoveClick,
    volunteer,
    handleVolunteerInputChange,
    handleVolunteerAddClick,
    handleVolunteerRemoveClick,
    tech,
    handleTechInputChange,
    handleTechAddClick,
    handleTechRemoveClick,
    navigation,
  };

  switch (step.id) {
    case "personal":
      return <PersonalDetails {...props} />;
    case "qualifications":
      return <Qualifications {...props} />;
    case "preferences":
      return <Preferences {...props} />;
    case "review":
      return <Review {...props} />;
    case "submit":
      return <Submit {...props} />;
    default:
      return (
        <div>
          <h1>Multi Step Form</h1>
        </div>
      );
  }
}
