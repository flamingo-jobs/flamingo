import React from 'react'
import { CssBaseline, Container, ThemeProvider, makeStyles } from '@material-ui/core'
import '../styles/Profile.css'
import FloatCard from '../../components/FloatCard'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import theme from '../../Theme';
import Footer from '../../components/Footer';
import IntroSection from './IntroSection'
import EducationSection from './EducationSection';
import ProjectsSection from './ProjectsSection';
import Achievements from './Achievements';
import { Component } from 'react';
import Space from './Space';
import EmployeeTopbar from '../../components/Topbar';
import SideDrawer from '../../components/SideDrawer';
import WorkExperience from './WorkExperience';
import KnowledgeSection from './KnowledgeSection';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundSize: 'cover',
        minHeight: '100vh'
    },
    container: {
        paddingTop: 20,
        [theme.breakpoints.down('xs')]: {
            paddingTop: 0,
        },
    },
    sideDrawerGrid: {
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        },
    }
}));

function Profile() {
    const classes = useStyles();

    return (
        <Grid item container xs={12} spacing={3} direction="row" justify="space-between" alignItems="flex-start">
            <Grid item xs={12} sm={4} spacing={3}>
                <IntroSection />
                <Space />
                <EducationSection />
                <Space />
                <Achievements />
            </Grid>
            <Grid item xs={12} sm={8} spacing={3}>
                <WorkExperience />
                <Space />
                <ProjectsSection />
            </Grid>                                            
        </Grid>
    )
}

export default Profile
