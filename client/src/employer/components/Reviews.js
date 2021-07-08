import React from 'react'
import { Avatar, Button, Chip, makeStyles, Typography } from '@material-ui/core';
import { FavoriteRounded } from '@material-ui/icons';
import FloatCard from './FloatCard';
import Grid from '@material-ui/core/Grid';
import ReviewCard from './ReviewCard';


const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'left',
        color: theme.palette.white,
    },

}))

function Reviews() {

    const classes = useStyles();


    return (

        <div className={classes.root}>

            <FloatCard backColor={'#64DFDF'}>
            

            {/* <FloatCard> */}
                <Grid container xs={12} direction="column" spacing={1}>

                    <Grid item sm={12}>
                        <ReviewCard></ReviewCard>
                    </Grid>

                    <Grid item sm={12}>
                        <ReviewCard></ReviewCard>
                    </Grid>

                    <Grid item sm={12}>
                        <ReviewCard></ReviewCard>
                    </Grid>

                </Grid>

            </FloatCard>
            
        </div>
    )
}

export default Reviews
