import { React, useState } from "react";
import { useForm, useStep } from "react-hooks-helper";

import { PersonalDetails } from "./components/PersonalDetails";
import { Experience } from "./components/Experience";
import { Education } from "./components/Education";
import { Volunteering } from "./components/Volunteering";
import { TechnologyStack } from "./components/TechnologyStack";
import { Review } from "./components/Review";

const token = sessionStorage.getItem("userToken");

const defaultData = {
  firstName: "",
  lastName: "",
  gender: "",
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
  { id: "experience" },
  { id: "education" },
  { id: "volunteering" },
  { id: "technologystack" },
  { id: "review" },
  { id: "submit" },
];

export default function GetHired() {
  const [formData, setForm] = useForm(defaultData);
  const { step, navigation } = useStep({
    steps,
    initialStep: token ? 1 : 1,
  });

  const [birthday, setBirthday] = useState(new Date("2014-08-18"));
  const handleDateChange = (date) => {
    setBirthday(date);
  };

  const [university, setUniversity] = useState([
    { university: "", degree: "", GPA: 0, startDate: "", endDate: "" },
  ]);
  const handleSchoolInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...university];
    list[index][name] = value;
    setUniversity(list);
  };
  const handleSchoolRemoveClick = (index) => {
    const list = [...university];
    list.splice(index, 1);
    setUniversity(list);
  };
  const handleSchoolAddClick = () => {
    setUniversity([
      ...university,
      { university: "", degree: "", GPA: 0, startDate: "", endDate: "" },
    ]);
  };

  const [college, setCollege] = useState([
    { college: "", startDate: "", endDate: "" },
  ]);
  const handleCollegeInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...college];
    list[index][name] = value;
    setCollege(list);
  };
  const handleCollegeRemoveClick = (index) => {
    const list = [...college];
    list.splice(index, 1);
    setCollege(list);
  };
  const handleCollegeAddClick = () => {
    setCollege([...college, { college: "", startDate: "", endDate: "" }]);
  };

  const [course, setCourse] = useState([
    { course: "", institute: "", from: "", to: "" },
  ]);
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
    setCourse([...course, { course: "", institute: "", from: "", to: "" }]);
  };

  const [award, setAward] = useState([
    { title: "", issuedBy: "", date: "", description: "" },
  ]);
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
    setAward([
      ...award,
      { title: "", issuedBy: "", date: "", description: "" },
    ]);
  };

  const [achievement, setAchievement] = useState([
    { title: "", relatedTo: "", date: "" },
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
    setAchievement([...achievement, { title: "", relatedTo: "", date: "" }]);
  };

  const [work, setWork] = useState([
    {
      place: "",
      description: "",
      position: "",
      from: "",
      to: "",
      taskAndResponsibility: [{ taskName: "" }],
    },
  ]);
  const handleWorkInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...work];
    list[index][name] = value;
    setWork(list);
  };
  const handleTaskInputChange = (e, index, secondIndex) => {
    const { name, value } = e.target;
    const list = [...work];
    list[index]["taskAndResponsibility"][secondIndex][name] = value;
    setWork(list);
  };
  const handleWorkRemoveClick = (index) => {
    const list = [...work];
    list.splice(index, 1);
    setWork(list);
  };
  const handleTaskRemoveClick = (index, secondIndex) => {
    const list = [...work];
    list[index]["taskAndResponsibility"].splice(secondIndex, 1);
    setWork(list);
  };
  const handleWorkAddClick = () => {
    setWork([
      ...work,
      {
        place: "",
        description: "",
        position: "",
        from: "",
        to: "",
        taskAndResponsibility: [{ taskName: "" }],
      },
    ]);
  };
  const handleTaskAddClick = (index) => {
    const list = [...work];
    list[index]["taskAndResponsibility"].push({ taskName: "" });
    setWork(list);
  };

  const [project, setProject] = useState([
    {
      name: "",
      link: "",
      description: "",
      from: "",
      to: "",
      usedTech: [{ category: "", language: "" }],
    },
  ]);
  const handleProjectInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...project];
    list[index][name] = value;
    setProject(list);
  };
  const handleProjectTechInputChange = (e, index, secondIndex) => {
    const { name, value } = e.target;
    const list = [...project];
    list[index]["usedTech"][secondIndex][name] = value;
    setProject(list);
  };
  const handleProjectRemoveClick = (index) => {
    const list = [...project];
    list.splice(index, 1);
    setProject(list);
  };
  const handleProjectTechRemoveClick = (index, secondIndex) => {
    const list = [...project];
    list[index]["usedTech"].splice(secondIndex, 1);
    setProject(list);
  };
  const handleProjectAddClick = () => {
    setProject([
      ...project,
      {
        name: "",
        link: "",
        description: "",
        from: "",
        to: "",
        usedTech: [{ category: "", language: "" }],
      },
    ]);
  };
  const handleProjectTechAddClick = (index) => {
    const list = [...project];
    list[index]["usedTech"].push({ category: "", language: "" });
    setProject(list);
  };

  const [volunteer, setVolunteer] = useState([
    { title: "", organization: "", from: "", to: "", description: "" },
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
    setVolunteer([
      ...volunteer,
      { title: "", organization: "", from: "", to: "", description: "" },
    ]);
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
    university,
    handleSchoolInputChange,
    handleSchoolAddClick,
    handleSchoolRemoveClick,
    college,
    handleCollegeInputChange,
    handleCollegeAddClick,
    handleCollegeRemoveClick,
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
    handleTaskInputChange,
    handleWorkAddClick,
    handleTaskAddClick,
    handleWorkRemoveClick,
    handleTaskRemoveClick,
    project,
    handleProjectInputChange,
    handleProjectAddClick,
    handleProjectRemoveClick,
    handleProjectTechInputChange,
    handleProjectTechAddClick,
    handleProjectTechRemoveClick,
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
    case "experience":
      return <Experience {...props} />;
    case "education":
      return <Education {...props} />;
    case "review":
      return <Review {...props} />;
    case "volunteering":
      return <Volunteering {...props} />;
    case "technologystack":
      return <TechnologyStack {...props} />;
    default:
      return (
        <div>
          <h1>Multi Step Form</h1>
        </div>
      );
  }
}
