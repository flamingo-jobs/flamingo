import React from 'react'
import {  makeStyles } from '@material-ui/core'
import '../styles/Profile.css'
import Grid from '@material-ui/core/Grid';
import IntroSection from './IntroSection'
import EducationSection from './EducationSection';
import ProjectsSection from './ProjectsSection';
import Achievements from './Awards';
import Space from './Space';
import WorkExperience from './WorkExperience';
import Volunteer from './Volunteer';
import TechnologySection from './TechnologySection';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundSize: 'cover',
        minHeight: '100vh'
    },
    container: {
        paddingTop: 20,
        [theme.breakpoints.down('sm')]: {
            paddingTop: 0,
        },
    },
    sideDrawerGrid: {
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        },
    }
}));

function Profile() {
    const classes = useStyles();

    return (
        <Grid item container sm={12} spacing={3} direction="row" justify="space-between" alignItems="flex-start">
            <Grid item md={12} lg={4} spacing={3}>
                <IntroSection />
                <Space />
                <EducationSection />
                <Space />
                <Achievements />
                <Space />
                <Volunteer />
            </Grid>
            <Grid item md={12} lg={8} spacing={3}>
                <WorkExperience />
                <Space />
                <ProjectsSection />
                <Space />
                <TechnologySection />
            </Grid>                                            
        </Grid>
    )
}

export default Profile
