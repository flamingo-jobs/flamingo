import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Container, Typography } from '@material-ui/core';
import StatCard from './components/StatCard';
import ProfileStatus from './components/ProfileStatus';



function JobseekerDashboard() {

    return (
        <Grid item container sm={12} spacing={3} direction="row" justify="space-between" alignItems="flex-start">
            <Grid item md={12} lg={8} spacing={3}>
                <StatCard />
            </Grid>
            <Grid item md={12} lg={4} spacing={3}>
                <ProfileStatus />
            </Grid>                                          
        </Grid>
    )
}

export default JobseekerDashboard
