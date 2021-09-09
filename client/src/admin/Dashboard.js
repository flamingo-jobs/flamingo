import React from 'react'
import { Grid, Typography } from '@material-ui/core';
import WeeklyApplications from './components/WeeklyApplications';
import NewJobSeekers from './components/NewJobSeekers';
import NewEmployers from './components/NewEmployers';
import NewJobPostings from './components/NewJobPostings';
import JobsLineChart from './components/analytics/jobsLineChart';
import UsersBarChart from './components/analytics/userBarChart';
import CategoryPieChart from "./components/analytics/categoryPieChart";
import ResumeBarChart from "./components/analytics/resumeBarChart";
import SubsBarChart from './components/analytics/subsBarChart';
import FloatCard from '../components/FloatCard';

// style={{border: "1px solid red"}}
function Dashboard() {
    return (
        <Grid item container xs={12} spacing={3} direction="row"
            justify="space-between"
            alignItems="streched">
            <Grid item xs={12} lg={6}>
                <Grid container spacing={3}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="stretch" style={{ minHeight: "100%" }}>
                    <Grid item xs={12}>
                        <FloatCard>
                            <Typography style={{ fontSize: 18, fontWeight: 500 }}>Hi, Welcome back!</Typography>
                        </FloatCard>
                    </Grid>
                    <Grid item xs={12} md={6} >
                        <NewJobPostings />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <WeeklyApplications />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <NewJobSeekers />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <NewEmployers />
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
                <JobsLineChart />
            </Grid>

            <Grid item xs={12} md={6}>
                <UsersBarChart />
            </Grid>

            <Grid item xs={12} md={6}>
                <JobsLineChart />
            </Grid>

            <Grid item xs={12} md={6}>
                <SubsBarChart />
            </Grid>

            <Grid item xs={12} md={6}>
                <CategoryPieChart />

            </Grid>
        </Grid>

    )
}

export default Dashboard
