import React from 'react';
// import { makeStyles, useTheme } from '@material-ui/core/styles';
import { CssBaseline, Container, ThemeProvider, makeStyles,useTheme } from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import CompanyInfo from './components/CompanyInfo'
import TechStack from './components/TechStack'
import FeaturedJobs from './components/FeaturedJobs'
import Reviews from './components/Reviews'


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundSize: 'cover',
        minHeight: '100vh'
        
    },
    container: {
        paddingTop: 20,
        [theme.breakpoints.down('xs')]: {
            paddingTop: 0,
        },
    },
    FeaturedOrganizations: {
        paddingTop: 25
    },
    topBarGrid: {
        [theme.breakpoints.down('xs')]: {
            display: 'block',
            maxWidth: 'unset'
        },
    },
    sideDrawerGrid: {
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        },
    }
}));

const Employer = () => {
    const classes = useStyles();

    return (

        <Grid container xs={12} spacing={3} direction="row" justify="space-between" alignItems="flex-start">

            <Grid  item containerxs={7} sm={7} spacing={3}>
                <CompanyInfo></CompanyInfo>
                <br></br>
                <FeaturedJobs></FeaturedJobs> 
            </Grid>

            <Grid item xs={5} sm={5} spacing={3}>
               <TechStack></TechStack>
               <br></br>
               <Reviews></Reviews>  
            </Grid> 

        </Grid>
    )
}

export default Employer

