import { Container, Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Step from "@material-ui/core/Step";
import StepContent from "@material-ui/core/StepContent";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FloatCard from "../components/FloatCard";
import SnackBarAlert from "../components/SnackBarAlert";
import BACKEND_URL from "../Config";
import { Education } from "./components/Education";
import { Experience } from "./components/Experience";
import { TechnologyStack } from "./components/TechnologyStack";
import { Volunteering } from "./components/Volunteering";
import backgroundImage from "./images/background.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    textAlign: "left",
  },
  container: {
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
    fontSize: 36,
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
    fontSize: 20,
  },
  active: {
    textAlign: "left",
    fontWeight: 600,
    fontSize: 24,
  },
  completed: {
    textAlign: "left",
    fontWeight: 600,
    fontSize: 20,
  },
}));

function getSteps() {
  return ["Experience", "Education", "Volunteering", "Technology Stack"];
}

export default function ProfileSetup() {
  const classes = useStyles();

  // Alert stuff
  const [alertShow, setAlertShow] = useState(false);
  const [alertData, setAlertData] = useState({ severity: "", msg: "" });
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

  const sendToHome = () => {
    if (edu.length > 1) {
      axios.get(
        `${BACKEND_URL}/jobs/generateJobSeekerRecommendations/${sessionStorage.getItem(
          "loginId"
        )}`
      );
    }
    window.location = "/";
  };

  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      const jobSeekerData = {
        education: edu
          .filter((x) => {
            return !!x.institute;
          })
          .map((x) => {
            if (x.type === "Bachelor's" || x.type === "Bachelor's Honours") {
              return {
                institute: x.institute ? x.institute : "",
                type: x.type ? x.type : "",
                fieldOfStudy: x.fieldOfStudy ? x.fieldOfStudy : "",
                GPA: x.GPA ? x.GPA : 0,
                startDate: x.startDate
                  ? x.startDate.slice(5) + "/" + x.startDate.slice(0, 4)
                  : "",
                endDate: x.endDate
                  ? x.endDate.slice(5) + "/" + x.endDate.slice(0, 4)
                  : "",
                societiesAndActivities: x.societiesAndActivities
                  ? x.societiesAndActivities
                  : "",
              };
            } else if (
              x.type === "Diploma" ||
              x.type === "Graduate Diploma" ||
              x.type === "Masters" ||
              x.type === "M.Phil." ||
              x.type === "PhD"
            ) {
              return {
                institute: x.institute ? x.institute : "",
                type: x.type ? x.type : "",
                fieldOfStudy: x.fieldOfStudy ? x.fieldOfStudy : "",
                startDate: x.startDate
                  ? x.startDate.slice(5) + "/" + x.startDate.slice(0, 4)
                  : "",
                endDate: x.endDate
                  ? x.endDate.slice(5) + "/" + x.endDate.slice(0, 4)
                  : "",
              };
            } else {
              return {
                institute: x.institute ? x.institute : "",
                type: x.type ? x.type : "",
                startDate: x.startDate
                  ? x.startDate.slice(5) + "/" + x.startDate.slice(0, 4)
                  : "",
                endDate: x.endDate
                  ? x.endDate.slice(5) + "/" + x.endDate.slice(0, 4)
                  : "",
                societiesAndActivities: x.societiesAndActivities
                  ? x.societiesAndActivities
                  : "",
              };
            }
          }),
        course: course
          .filter((x) => {
            return !!x.course;
          })
          .map((x) => {
            return {
              course: x.course ? x.course : "",
              institute: x.institute ? x.institute : "",
              from: x.from ? x.from.slice(5) + "/" + x.from.slice(0, 4) : "",
              to: x.to ? x.to.slice(5) + "/" + x.to.slice(0, 4) : "",
            };
          }),
        award: award
          .filter((x) => {
            return !!x.title;
          })
          .map((x) => {
            return {
              title: x.title ? x.title : "",
              issuedBy: x.issuedBy ? x.issuedBy : "",
              date: x.date ? x.date.slice(5) + "/" + x.date.slice(0, 4) : "",
              description: x.description ? x.description : "",
            };
          }),
        achievement: achievement
          .filter((x) => {
            return !!x.title;
          })
          .map((x) => {
            return {
              title: x.title ? x.title : "",
              relatedTo: x.relatedTo ? x.relatedTo : "",
              date: x.date ? x.date.slice(5) + "/" + x.date.slice(0, 4) : "",
            };
          }),
        work: work
          .filter((x) => {
            return !!x.place;
          })
          .map((x) => {
            return {
              place: x.place ? x.place : "",
              description: x.description ? x.description : "",
              position: x.position ? x.position : "",
              from: x.from ? x.from.slice(5) + "/" + x.from.slice(0, 4) : "",
              to: x.to ? x.to.slice(5) + "/" + x.to.slice(0, 4) : "",
              taskAndResponsibility: x.taskAndResponsibility
                ? x.taskAndResponsibility
                : "",
            };
          }),
        project: project
          .filter((x) => {
            return !!x.name;
          })
          .map((x) => {
            return {
              name: x.name ? x.name : "",
              link: x.link ? x.link : "",
              type: x.type ? x.type : "",
              description: x.description ? x.description : "",
              from: x.from ? x.from.slice(5) + "/" + x.from.slice(0, 4) : "",
              to: x.to ? x.to.slice(5) + "/" + x.to.slice(0, 4) : "",
              usedTech: x.usedTech ? x.usedTech : [],
            };
          }),
        volunteer: volunteer
          .filter((x) => {
            return !!x.title;
          })
          .map((x) => {
            return {
              title: x.title ? x.title : "",
              organization: x.organization ? x.organization : "",
              from: x.from ? x.from.slice(5) + "/" + x.from.slice(0, 4) : "",
              to: x.to ? x.to.slice(5) + "/" + x.to.slice(0, 4) : "",
              description: x.description ? x.description : "",
            };
          }),
        certificate: certificate
          .filter((x) => {
            return !!x.issuer && !!x.title;
          })
          .map((x) => {
            return {
              issuer: x.issuer ? x.issuer : "",
              title: x.title ? x.title : "",
              score: certificate.length
                ? allCertificates
                    .find((cert) => {
                      return cert.issuer === x.issuer;
                    })
                    .certificates.find((item) => {
                      return item.name === x.title;
                    }).score
                : "",
              date: x.date ? x.date.slice(5) + "/" + x.date.slice(0, 4) : "",
            };
          }),
        technologyStack: tech,
      };
      const loginId = sessionStorage.getItem("loginId");

      //console.log(jobSeekerData);
      //console.log(Object.values(award[0])[0])

      axios
        .put(`${BACKEND_URL}/jobseeker/update/${loginId}`, jobSeekerData)
        .then((res) => {
          if (res.data.success) {
            sendToHome();
          } else {
            setAlertData({
              severity: "error",
              msg: "Failed to update details! No worries. You can always update/ change these details in your profile page",
            });
            handleAlert();
          }
        })
        .catch((e) => {
          setAlertData({
            severity: "error",
            msg: "Failed to update details! No worries. You can always update/ change these details in your profile page",
          });
          handleAlert();
        });
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

  const [edu, setEdu] = useState([
    {
      institute: "",
      type: "School",
      fieldOfStudy: "",
      GPA: 0,
      startDate: "",
      endDate: "",
      societiesAndActivities: "",
    },
  ]);
  const handleEduInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...edu];
    list[index][name] = value;
    setEdu(list);
  };
  const handleEduRemoveClick = (index) => {
    const list = [...edu];
    list.splice(index, 1);
    setEdu(list);
  };
  const handleEduAddClick = () => {
    setEdu([
      ...edu,
      {
        institute: "",
        type: "School",
        fieldOfStudy: "",
        GPA: 0,
        startDate: "",
        endDate: "",
        societiesAndActivities: "",
      },
    ]);
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
      taskAndResponsibility: "",
    },
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
      {
        place: "",
        description: "",
        position: "",
        from: "",
        to: "",
        taskAndResponsibility: "",
      },
    ]);
  };

  const [project, setProject] = useState([
    {
      name: "",
      link: "",
      type: "Individual",
      description: "",
      from: "",
      to: "",
      usedTech: [],
    },
  ]);
  const handleProjectInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...project];
    list[index][name] = value;
    setProject(list);
  };
  const handleProjectTechInputChange = (event, value, index) => {
    let list = [...project];
    list[index]["usedTech"] = value;
    setProject(list);
  };
  const handleProjectRemoveClick = (index) => {
    const list = [...project];
    list.splice(index, 1);
    setProject(list);
  };
  const handleProjectAddClick = () => {
    setProject([
      ...project,
      {
        name: "",
        link: "",
        type: "Individual",
        description: "",
        from: "",
        to: "",
        usedTech: [],
      },
    ]);
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

  const [allCertificates, setAllCertificates] = useState(null);
  const [certificate, setCertificate] = useState([
    {
      issuer: "",
      title: "",
      score: "",
      date: "",
    },
  ]);
  const handleCertificateInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...certificate];
    list[index][name] = value;
    setCertificate(list);
  };
  const handleCertificateRemoveClick = (index) => {
    const list = [...certificate];
    list.splice(index, 1);
    setCertificate(list);
  };
  const handleCertificateAddClick = () => {
    setCertificate([
      ...certificate,
      {
        issuer: "",
        title: "",
        score: "",
        date: "",
      },
    ]);
  };
  const fetchCertificates = async () => {
    await axios.get(`${BACKEND_URL}/certifications`).then((res) => {
      if (res.data.success) {
        if (res.data.existingData?.length > 0) {
          if (Object.keys(res.data.existingData[0]).length === 0) {
            res.data.existingData.splice(0, 1);
          }
        }
        setAllCertificates(res.data.existingData);
      }
    });
  };

  const [tech, setTech] = useState([]);
  const handleTechAddClick = (techName) => {
    setTech(techName);
  };

  const props = {
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
    handleProjectTechInputChange,
    volunteer,
    handleVolunteerInputChange,
    handleVolunteerAddClick,
    handleVolunteerRemoveClick,
    tech,
    handleTechAddClick,
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <Experience {...props} />;
      case 1:
        return <Education {...props} />;
      case 2:
        return <Volunteering {...props} />;
      case 3:
        return <TechnologyStack {...props} />;
      default:
        return "Unknown step";
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.background}>
        <div className={classes.overlay}>
          {displayAlert()}
          <Container className={classes.container}>
            <Grid
              container
              spacing={3}
              justify="center"
              alignItems="center"
              className={classes.mainGrid}
            >
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
                        <Grid item xs={6} align="left">
                          <Typography className={classes.mainTitle}>
                            Continue setting up your profile...
                          </Typography>
                        </Grid>
                        <Grid item xs={6} align="right">
                          <Link to="/">
                            <Button className={classes.skip}>
                              Skip and do this later
                            </Button>
                          </Link>
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
                                    <Link to="/jobs">
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
          </Container>
        </div>
      </div>
    </div>
  );
}
