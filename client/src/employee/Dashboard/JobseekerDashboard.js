import React from 'react';
import { Grid } from '@material-ui/core';
import ProfileStatus from './components/ProfileStatus';
import Space from '../components/Space';
import RecommendedJobs from './components/RecommendedJobs';
import RecommendedOrganizations from './components/RecommendedOrganizations';
import SideMenu from './components/SideMenu';
import TopCards from './components/TopCards';
import Favourites from './components/Favourites';
import ReachChart from './components/ReachChart';



function JobseekerDashboard(props) {

    return (
        <Grid item container sm={12} spacing={3} direction="row" justify="space-between" alignItems="flex-start">
            <Grid item xs={12} md={12} lg={8} spacing={3}>
                <TopCards />
                <Space />
                <RecommendedJobs userRole={props.userRole}/>
                {/* <Space />
                <RecommendedOrganizations userRole={props.userRole}/> */}
            </Grid>
            <Grid item xs={12} md={12} lg={4} spacing={3}>
                <ProfileStatus />
                <Space />
                <ReachChart />
                <Space />
                <Favourites />
                {/* <Space />
                <SideMenu /> */}
            </Grid>      
        </Grid>
    )
}

export default JobseekerDashboard
