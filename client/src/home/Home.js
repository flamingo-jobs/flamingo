import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import FeaturedJobs from './components/FeaturedJobs';
import FeaturedOrganizations from './components/FeaturedOrganizations';
import HeroSection from './components/HeroSection';
import PostJobSection from './components/PostJobSection';
import './styles/Home.css';

const useStyles = makeStyles((theme) => ({

    postJobSection: {
        minWidth: '100%',

    },
    featuredOrganizations: {
        minWidth: '100%'
    },
    rightSubColumn: {
        [theme.breakpoints.down('sm')]: {
            minWidth: 'fit-content',
            paddingTop: 24
        },
    }
}));

function Home(props) {
    const classes = useStyles();

    return (
        <Grid item container xs={12} spacing={3} direction="column"
        justify="space-between"
        alignItems="flex-start">
            <Grid item container sm={12}>
                <HeroSection />
            </Grid>
            <Grid item container xs={12} spacing={0} direction="row"
                justify="space-between"
                alignItems="flex-start">
                <Grid item xs={12} md={6}>
                    <FeaturedJobs userRole={props.userRole}/>
                </Grid>
                <Grid item container xs={12} md={6} spacing={3} direction="column"
                    justify="space-between"
                    alignItems="flex-start" className={classes.rightSubColumn}>
                    <Grid item sm={12} className={classes.postJobSection}>
                        <PostJobSection />
                    </Grid>
                    <Grid item sm={12} className={classes.featuredOrganizations}>
                        <FeaturedOrganizations />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Home
