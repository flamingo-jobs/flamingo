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
        <Grid item container xs={12} spacing={3} direction="row" justify="space-between" alignItems="flex-start">
            <Grid item xs={12} lg={8}>
                <TopCards userRole={props.userRole} />
                <Space />
                <RecommendedJobs userRole={props.userRole}/>
            </Grid>
            <Grid item xs={12} lg={4}>
                <ProfileStatus userRole={props.userRole} />
                <Space />
                <ReachChart userRole={props.userRole} />
                <Space />
                <Favourites userRole={props.userRole} />
            </Grid>      
        </Grid>
    )
}

export default JobseekerDashboard
