import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import JobSearchBar from './components/JobSearchBar';
import JobCard from './components/JobCard';
import JobFilters from './components/JobFilters';
import { useState, useEffect } from 'react';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({

}));

function Jobs() {
    const classes = useStyles();

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        retrieveJobs()
    })

    const retrieveJobs = () => {
        axios.get("http://localhost:8000/jobs").then(res => {
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
                <Grid item sm={6}>
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
            <Grid item container sm={12} spacing={3} direction="row" justify="space-between">
                <Grid item sm={12}>
                    <JobSearchBar />
                </Grid>
                <Grid item container sm={9} spacing={2} direction="row">
                    {displayJobs()}
                </Grid>
                <Grid item sm={3}>
                    <JobFilters />
                </Grid>
            </Grid>
        </>
    )
}

export default Jobs
