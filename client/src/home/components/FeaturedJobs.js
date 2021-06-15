import { Grid, makeStyles, Typography, Button } from '@material-ui/core';
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import FloatCard from '../../components/FloatCard';
import JobCard from '../../jobs/components/JobCard';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import theme from '../../Theme';
import BACKEND_URL from '../../Config';


const useStyles = makeStyles((theme) => ({
    title: {
        fontWeight: 600,
        color: theme.palette.black
    },
    container: {
        maxWidth: 'unset'
    },
    allJobs: {
        paddingTop: 9,
        paddingBottom: 9
    },
    text: {
        color: theme.palette.white
    },
    button: {
        backgroundColor: theme.palette.white,
        color: theme.palette.tuftsBlue,
        fontWeight: 800,
        borderRadius: 25,
        paddingLeft: 20,
        paddingRight: 20,
        "&:hover": {
            backgroundColor: theme.palette.blueJeans,
            color: 'white',
        },
        [theme.breakpoints.down('md')]: {
            marginTop: 20
        },
    },
    link: {
        backgroundColor: theme.palette.white,
        color: theme.palette.tuftsBlue,
        fontWeight: 800,
        borderRadius: 25,
        paddingLeft: 20,
        paddingRight: 20,
        "&:hover": {
            backgroundColor: theme.palette.white,
            color: theme.palette.pinkyRed,
        }
    },
}))
function FeaturedJobs() {
    const classes = useStyles();

    const [featuredJobs, setFeaturedJobs] = useState([]);

        

    const retrieveFeaturedJobs = () => {
        axios.get(`${BACKEND_URL}/jobs/featuredJobs`).then(res => {
            if (res.data.success) {
                setFeaturedJobs(res.data.featuredJobs)
            } else {
                setFeaturedJobs(null)
            }
        })
    }

    retrieveFeaturedJobs();

    const displayFeaturedJobs = () => {
        if (featuredJobs) {

            return featuredJobs.map(featuredJob => (
                <Grid item sm={12}>
                    <JobCard info={featuredJob} />
                </Grid>
            ))
        } else {
            return (
                <Grid item sm={12}>
                    <Typography>No featured Jobs</Typography>
                </Grid>)
        }
    }

    const isEmpty = (obj) => {
        for (var i in obj) return false;
        return true;
    }

    return (
        <div>
            <Grid container direction="column" spacing={2} className={classes.container}>
                <Grid item sm={12} >
                    <FloatCard>
                        <Typography variant="h5" className={classes.title}>Featured Jobs</Typography>
                    </FloatCard>
                </Grid>
                {displayFeaturedJobs()}
                <Grid item sm={12}>
                    <FloatCard>
                        <Button
                            className={classes.link}
                            endIcon={<ArrowForwardRoundedIcon />}
                        >
                            See All Featured Jobs
      </Button>
                    </FloatCard>
                </Grid>
                <Grid item sm={12}>
                    <FloatCard backColor={theme.palette.tuftsBlue}>
                        <Grid item container direction="row" sm={12} className={classes.allJobs}>
                            <Grid item xs={12} lg={6}>
                                <Typography variant="h6" className={classes.text}>Want to dive into?</Typography>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <Button className={classes.button} endIcon={<ArrowForwardRoundedIcon />}> Browse All Public Jobs </Button>
                            </Grid>
                        </Grid>
                    </FloatCard>
                </Grid>
            </Grid>
        </div>
    )
}

export default FeaturedJobs
