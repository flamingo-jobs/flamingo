import { Grid, makeStyles, Typography, Button } from '@material-ui/core';
import React from 'react'
import FloatCard from './FloatCard';
import JobCard from './JobCard';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import theme from '../../Theme';

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
            backgroundColor: theme.palette.blueJeans,
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
            color: theme.palette.pinkyRed,
        }
    },
}))
function FeaturedJobs() {
    const classes = useStyles();

    return (
        <div>
            <Grid container xs={12} direction="column" spacing={1} className={classes.container}>
                <Grid item sm={12} >
                    <FloatCard>
                        <Typography variant="h5" className={classes.title}>Featured Jobs</Typography>
                    </FloatCard>
                </Grid>
                <Grid item sm={12}>
                    <JobCard />
                </Grid>
                <Grid item sm={12}>
                    <JobCard />
                </Grid>
                <Grid item sm={12}>
                    <JobCard />
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
