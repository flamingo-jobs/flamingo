import { React, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Container, Grid } from '@material-ui/core';
import FloatCard from '../components/FloatCard';
import backgroundImage from "./images/background.jfif";
import { useStep } from "react-hooks-helper";
import { Experience } from "./components/Experience";
import { Education } from "./components/Education";
import { Volunteering } from "./components/Volunteering";
import { TechnologyStack } from "./components/TechnologyStack";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        textAlign: "left"
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
        textAlign: 'right',
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
    stepper: {
        background: "transparent"
    },
    mainTitle: {
        fontSize: 36,
        fontWeight: 500,
        marginTop: 20,
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
    label: {
        textAlign: "left",
        fontWeight: 600,
        fontSize: 20
    },
    active: {
        textAlign: "left",
        fontWeight: 600,
        fontSize: 24
    },
    completed: {
        textAlign: "left",
        fontWeight: 600,
        fontSize: 20
    }
}));

function getSteps() {
    return ['Experience', 'Education', 'Volunteering', 'Technology Stack', 'Review', 'Submit'];
}



export default function ProfileSetup() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
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
                return 'Unknown step';
        }
    }

    return (
        <div className={classes.root}>
            <div className={classes.background}>
                <div className={classes.overlay}>
                    <Container maxWidth="false" className={classes.container}>
                        <Grid container spacing={3} justify="center" alignItems="center" className={classes.mainGrid}>
                            <Grid item xs={12} align="center">
                                <FloatCard>
                                    <Container maxWidth="false">
                                        <Grid
                                            container
                                            spacing={4}
                                            direction="column"
                                            justify="center"
                                            alignItems="stretch"
                                            className={classes.gridCont}
                                        >
                                            <Grid item xs={12} align="left">
                                                <Typography className={classes.mainTitle}>Continue setting up you profile...</Typography>
                                            </Grid>
                                            <Stepper activeStep={activeStep} orientation="vertical" className={classes.stepper}>
                                                {steps.map((label, index) => (
                                                    <Step key={label}>
                                                        <StepLabel classes={{label:classes.label, active: classes.active, completed: classes.completed}}>{label}</StepLabel>
                                                        <StepContent>
                                                            {getStepContent(index)}
                                                            <div className={classes.actionsContainer}>
                                                                <div>
                                                                    {activeStep === 0 ?
                                                                        <Button
                                                                            className={classes.previous}
                                                                            onClick={() => window.location = '/jobs'}
                                                                        >
                                                                            Skip setting up profile
                                                                        </Button> :
                                                                        <Button
                                                                            disabled={activeStep === 0}
                                                                            onClick={handleBack}
                                                                            className={classes.previous}
                                                                        >
                                                                            Back
                                                                        </Button>}
                                                                    <Button
                                                                        variant="contained"
                                                                        color="primary"
                                                                        onClick={handleNext}
                                                                        className={classes.next}
                                                                    >
                                                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </StepContent>
                                                    </Step>
                                                ))}
                                            </Stepper>
                                            {activeStep === steps.length && (
                                                <Paper square elevation={0} className={classes.resetContainer}>
                                                    <Typography>All steps completed - you&apos;re finished</Typography>
                                                    <Button onClick={handleReset} className={classes.button}>
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
                </div >
            </div >

        </div >
    );
}
