import React from 'react'
import { CssBaseline, Container, ThemeProvider, makeStyles } from '@material-ui/core'
import FloatCard from '../components/FloatCard'
import SideDrawer from '../components/SideDrawer'
import Grid from '@material-ui/core/Grid';
import Topbar from '../components/Topbar';
import backgroundImage from './images/background-image.jpg';
import Footer from '../components/Footer'
import JobSearchBar from './components/JobSearchBar';
import JobCard from './components/JobCard';
import JobFilters from './components/JobFilters';

const useStyles = makeStyles((theme) => ({
    root: {
        background: `url(${backgroundImage}) no-repeat`,
        backgroundSize: 'cover',
        minHeight: '100vh'
    },
    container: {
        paddingTop: 20,
        [theme.breakpoints.down('xs')]: {
            paddingTop: 0,
        },
    },
    FeaturedOrganizations: {
        paddingTop: 25
    },
    topBarGrid: {
        [theme.breakpoints.down('xs')]: {
            display: 'block',
            maxWidth: 'unset'
        },
    },
    sideDrawerGrid: {
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        },
    }
}));

function Jobs() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className="overlay">
                <React.Fragment>
                    <CssBaseline />
                    <Container maxWidth="false" className={classes.container}>
                        <Grid container direction="row" spacing={3} className={classes.topBarGrid}>
                            <Grid item xs={0} sm={4} md={3} lg={2} style={{ position: 'fixed' }} className={classes.sideDrawerGrid}>
                                <SideDrawer />
                            </Grid>
                            <Grid item xs={0} sm={4} md={3} lg={2} className={classes.sideDrawerGrid}></Grid>
                            <Grid item container xs={12} sm={8} md={9} lg={10} spacing={3} className={classes.topBarGrid}>
                                <Grid item sm={12}>
                                    <Topbar />
                                </Grid>
                                <Grid item sm={12}>
                                    <JobSearchBar />
                                </Grid>
                                <Grid item container sm={9} spacing={2} direction="row">
                                    <Grid item sm={6}>
                                      <JobCard />
                                    </Grid>
                                    <Grid item sm={6}>
                                      <JobCard />
                                    </Grid>
                                    <Grid item sm={6}>
                                      <JobCard />
                                    </Grid>
                                    <Grid item sm={6}>
                                      <JobCard />
                                    </Grid>
                                    <Grid item sm={6}>
                                      <JobCard />
                                    </Grid>
                                    <Grid item sm={6}>
                                      <JobCard />
                                    </Grid>
                                    <Grid item sm={6}>
                                      <JobCard />
                                    </Grid>
                                </Grid>
                                <Grid item sm={3}>
                                    <JobFilters />
                                </Grid>

                            </Grid>
                        </Grid>
                    </Container>
                </React.Fragment>
            </div>
        </div>
    )
}

export default Jobs
