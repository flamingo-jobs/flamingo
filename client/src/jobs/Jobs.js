import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import JobSearchBar from './components/JobSearchBar';
import JobCard from './components/JobCard';
import JobFilters from './components/JobFilters';
import { useState, useEffect } from 'react';
import axios from 'axios';
import BACKEND_URL from '../Config';

const useStyles = makeStyles((theme) => ({
    jobsGrid: {
        [theme.breakpoints.down('sm')]: {
            maxWidth: 'unset',
            flexDirection: 'column'
        },
        [theme.breakpoints.down('xs')]: {
            order: 3
        },
    },
    mainGrid: {
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column'
        },
        [theme.breakpoints.down('xs')]: {
            paddingRight: 12,
            paddingLeft: 12
        },
    },
    filterGrid:{
        [theme.breakpoints.down('xs')]: {
            order: 2
        },
    },
    searchGrid:{
        [theme.breakpoints.down('xs')]: {
            order: 1
        },
    }

}));

function Jobs() {
    const classes = useStyles();

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        retrieveJobs()
    })

    const retrieveJobs = () => {
        axios.get(`${BACKEND_URL}/jobs`).then(res => {
            if (res.data.success) {
                setJobs(res.data.existingJobs)
            } else {
                setJobs(null)
            }
        })
    }

    const displayJobs = () => {
        if (jobs) {

            return jobs.map(job => (
                <Grid item xs={12} md={12} lg={6}>
                    <JobCard info={job} />
                </Grid>
            ))
        } else {
            return (
                <Grid item sm={12}>
                    <Typography>No featured Jobs</Typography>
                </Grid>)
        }
    }

    return (
        <>
            <Grid item container sm={12} spacing={3} direction="row" justify="space-between" className={classes.mainGrid} >
                <Grid item sm={12} className={classes.searchGrid}>
                    <JobSearchBar />
                </Grid>
                <Grid item container xs={12} sm={12} md={8} lg={9} spacing={2} direction="row" className={classes.jobsGrid} alignItems="stretch">
                    {displayJobs()}
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={3} className={classes.filterGrid}>
                    <JobFilters />
                </Grid>
            </Grid>
        </>
    )
}

export default Jobs
