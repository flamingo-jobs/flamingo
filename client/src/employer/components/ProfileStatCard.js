import React from 'react'
import { Avatar, Button, Chip, makeStyles, Typography } from '@material-ui/core';
import { FavoriteRounded } from '@material-ui/icons';
import FloatCard from './FloatCard';


const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'left',
        backgroundColor: theme.palette.aquamarine,
    },
}))

function ProfileStatCard() {

    const classes = useStyles();


    return (

        <div className={classes.root} >

            <FloatCard>

            </FloatCard>
            
        </div>
    )
}

export default ProfileStatCard
