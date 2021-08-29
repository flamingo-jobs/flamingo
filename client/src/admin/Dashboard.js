import React from 'react'
import {Grid} from '@material-ui/core';
import WeeklyApplications from './components/WeeklyApplications';
import NewJobSeekers from './components/NewJobSeekers';
import NewEmployers from './components/NewEmployers';
import NewJobPostings from './components/NewJobPostings';
import JobsLineChart from './components/analytics/jobsLineChart';
import UsersBarChart from './components/analytics/userBarChart';
import CategoryPieChart from "./components/analytics/categoryPieChart";
import ResumeBarChart from "./components/analytics/resumeBarChart";
import SubsBarChart from './components/analytics/subsBarChart';

// style={{border: "1px solid red"}}
function Dashboard() {
    return (
        <Grid item container xs={12} spacing={3} direction="column"
            justify="space-between"
            alignItems="flex-start">


            <Grid item xs={12} style={{ minWidth: '100%' }}>
                <Grid item container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <NewJobPostings />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <WeeklyApplications />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <NewJobSeekers />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <NewEmployers />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <JobsLineChart/>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <UsersBarChart/>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <ResumeBarChart/>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <SubsBarChart/>
                    </Grid>

                    <Grid item container xs={12}  justify="center">
                        <Grid item xs={12} md={4}>
                            <CategoryPieChart/>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                    </Grid>

                    <Grid item xs={12} md={6} lg={8}>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Dashboard
