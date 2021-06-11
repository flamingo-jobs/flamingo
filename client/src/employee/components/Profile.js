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
        <div className={classes.root}>
                <div className="overlay">
                    <React.Fragment>
                        <CssBaseline />
                        <Container maxWidth={false} className={classes.container}>
                            <Grid container direction="row" spacing={3} style={{margin:'0px'}} alignItems="stretch">
                                    
                                <Grid item xs={false} sm={4} md={3} lg={2} style={{ position: 'fixed' }} className={classes.sideDrawerGrid}>
                                    {/* <Grid item xs={12}>
                                        <IntroSection/>
                                        <Space />
                                        <EducationSection />
                                        <Space />
                                        <WorkExperience />
                                    </Grid> */}
                                    <Grid item xs={12}>
                                        <SideDrawer />
                                    </Grid>                                 
                                </Grid>
                                <Grid item xs={false} sm={4} md={3} lg={2} className={classes.sideDrawerGrid}></Grid>

                                <Grid item container direction="row" xs={12} sm={8} md={9} lg={10} spacing={3}>
                                    <Grid item xs={12}>
                                        <EmployeeTopbar />
                                    </Grid>
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
                            </Grid>
                        </Container>
                    </React.Fragment>
                </div>
        </div>
    )
}

export default Profile
