import React from 'react'
import { Avatar, Button, Chip, makeStyles, Typography } from '@material-ui/core';
import { FavoriteRounded } from '@material-ui/icons';
import FloatCard from './FloatCard';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'left',
        color: theme.palette.white,
    },

}))

function ProfileStatCard() {

    const classes = useStyles();


    return (

        <div className={classes.root}>

            <FloatCard backColor={'#72EFDD'}>

                
            </FloatCard>
            
        </div>
    )
}

export default ProfileStatCard
