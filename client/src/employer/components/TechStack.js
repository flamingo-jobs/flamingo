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

                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Typography>

                
            </FloatCard>
            
        </div>
    )
}

export default ProfileStatCard
