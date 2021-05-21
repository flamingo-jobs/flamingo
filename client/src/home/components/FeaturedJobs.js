import { Grid, makeStyles, Typography, Button } from '@material-ui/core';
import React from 'react'
import FloatCard from './FloatCard';
import Job from './Job';

const useStyles = makeStyles((theme) => ({
    title: {
        fontWeight: 600,
        color: theme.palette.black
    },
    container: {
        maxWidth: 'unset'
    }
}))
function FeaturedJobs() {
    const classes = useStyles();

    return (
        <div>
            <Grid container xs={12} direction="column" spacing={2} className={classes.container}>
                <Grid item sm={12} >
                    <FloatCard>
                        <Typography variant="h5" className={classes.title}>Featured Jobs</Typography>
                    </FloatCard>
                </Grid>
                <Grid item sm={12}>
                    <Job />
                </Grid>
                <Grid item sm={12}>
                    <Job />
                </Grid>
                <Grid item sm={12}>
                    <Job />
                </Grid>
            </Grid>
        </div>
    )
}

export default FeaturedJobs
