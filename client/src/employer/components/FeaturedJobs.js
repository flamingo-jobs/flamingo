import { Grid, makeStyles, Typography, Button } from '@material-ui/core';
import React from 'react'
import FloatCard from '../../components/FloatCard';
import JobCard from './JobCard';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import axios from "axios";
import BACKEND_URL from "../../Config";
import { useState, useEffect } from "react";

const useStyles = makeStyles((theme) => ({
    title: {
        fontWeight: 600,
        color: theme.palette.black
    },
    container: {
        maxWidth: 'unset',
    },
    allJobs: {
        paddingTop: 20,
        paddingBottom: 20
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
            backgroundColor: theme.palette.tuftsBlueHover,
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
            color: theme.palette.tuftsBlueHover,
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

    useEffect(() => {
        retrieveFeaturedJobs();

    }, [])

    const displayFeaturedJobs = () => {
        if (featuredJobs) {

            return featuredJobs.map(featuredJob => (
                <Grid item sm={12}>
                    <JobCard info={featuredJob} />
                </Grid>
            ))
        } 
        else {
            return (
                <Grid item sm={12}>
                    <Typography>No featured Jobs</Typography>
                </Grid>
            )
        }
    }

    const isEmpty = (obj) => {
        for (var i in obj) return false;
        return true;
    }

    return (
        <div>
            <Grid container direction="column" spacing={1} className={classes.container}>
                <Grid item sm={12} >
                    <FloatCard>
                        <Typography variant="h5" className={classes.title}>Featured Jobs</Typography>
                    </FloatCard>
                </Grid>
                {/* <Grid item sm={12}>
                    {displayFeaturedJobs()}
                </Grid> */}

                <Grid item sm={12}>
                    <JobCard></JobCard>
                </Grid>
                <Grid item sm={12}>
                    <JobCard></JobCard>
                </Grid>
                <Grid item sm={12}>
                    <JobCard></JobCard>
                </Grid>
                <Grid item sm={12}>
                    <JobCard></JobCard>
                </Grid>

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
                
            </Grid>
        </div>
    )
}

export default FeaturedJobs
