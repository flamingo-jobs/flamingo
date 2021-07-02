import React from 'react';
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
import { Experience } from './components/Experience';


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
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
    stepper: {
        background: "transparent"
    }
}));

function getSteps() {
    return ['Experience', 'Education', 'Volunteering', 'Technology Stack', 'Review', 'Submit'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`;
        case 1:
            return <Experience />;
        case 2:
            return `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`;
        default:
            return 'Unknown step';
    }
}

export default function ProfileSetup() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
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
                                            justify="space-between"
                                            className={classes.gridCont}
                                        >
                                            <Stepper activeStep={activeStep} orientation="vertical" className={classes.stepper}>
                                                {steps.map((label, index) => (
                                                    <Step key={label}>
                                                        <StepLabel>{label}</StepLabel>
                                                        <StepContent>
                                                            {getStepContent(index)}
                                                            <div className={classes.actionsContainer}>
                                                                <div>
                                                                    <Button
                                                                        disabled={activeStep === 0}
                                                                        onClick={handleBack}
                                                                        className={classes.button}
                                                                    >
                                                                        Back
                                                                    </Button>
                                                                    <Button
                                                                        variant="contained"
                                                                        color="primary"
                                                                        onClick={handleNext}
                                                                        className={classes.button}
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
