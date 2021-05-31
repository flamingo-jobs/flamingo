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
}));

function Profile() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
                <div className="overlay">
                    <React.Fragment>
                        <CssBaseline />
                        <Container maxWidth="false" className={classes.container}>
                            <Grid container direction="row" spacing={3} alignItems="stretch">
                                    
                                <Grid item container xs={12} sm={4} md={3} lg={3} spacing={3}>
                                    <Grid item xs={12}>
                                        <IntroSection/>
                                        <Space />
                                        <EducationSection />
                                    </Grid>
                                                                   
                                </Grid>
                                <Grid item container direction="row" xs={12} sm={5} md={6} lg={6} spacing={3}>
                                    <Grid item xs={12}>
                                        <Achievements />
                                        <Space />
                                        <ProjectsSection />
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={3} md={3} lg={3} spacing={3}>
                                <FloatCard />
                                </Grid>
                            </Grid>
                        </Container>
                    </React.Fragment>
                </div>
        </div>
    )
}

export default Profile
