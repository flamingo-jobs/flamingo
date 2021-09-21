import { Grid, makeStyles} from '@material-ui/core';
import React from 'react';
import Space from '../components/Space';
import Favourites from './components/Favourites';
import ProfileStatus from './components/ProfileStatus';
import ReachChart from './components/ReachChart';
import RecommendedJobs from './components/RecommendedJobs';
import TopCards from './components/TopCards';

// const useStyles = makeStyles((theme) => ({
//     jobStat: {
//         [theme.breakpoints.down('md')]: {
//             order: 1,
//         },
//     },
//     suggestions: {
//         [theme.breakpoints.down('md')]: {
//             order: 3,
//         },
//     },
//     profileStat: {
//         [theme.breakpoints.down('md')]: {
//             order: 2,
//         },
//     }
// }))


function JobseekerDashboard(props) {
   // const classes = useStyles();

    return (
        <Grid item container xs={12} spacing={3} direction="row" justify="space-between" alignItems="flex-start" >
            <Grid item xs={12} lg={8}>
                <TopCards userRole={props.userRole} />
                <Space />
                <RecommendedJobs userRole={props.userRole} />
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
