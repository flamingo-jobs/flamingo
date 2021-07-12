import React from 'react'
import {  makeStyles } from '@material-ui/core'
import FloatCard from '../../../components/FloatCard';
import { Box, Grid, Container, Typography, Card, Paper } from '@material-ui/core';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import { indigo } from '@material-ui/core/colors';
import CardMedia from '@material-ui/core/CardMedia';
import statImage1 from '../images/statImage1.jpg';
import statImage2 from '../images/statImage2.jpg';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundSize: 'cover',
        minHeight: '100vh'
    },
    card: {
        boxShadow: indigo[75],
        textAlign: 'center',
        padding: theme.spacing(5, 0),
        color: "#3f51b5",
        backgroundColor: "white"
    },
    iconWrapper: {
        margin: 'auto',
        display: 'flex',
        borderRadius: '50%',
        alignItems: 'center',
        width: theme.spacing(4),
        height: theme.spacing(3),
        justifyContent: 'center',
        marginBottom: theme.spacing(3),
        color: "#7986cb",
    },
    paperCont: {
        backgroundColor: indigo[50],
        color: indigo[600],
        padding: "15px 0px 15px 15px",
        borderRadius: 10,
        "&:hover": {
            defaultButton: {
                display: 'block'
            }
          }
      },
}));

function ProfileStatus() {
    const classes = useStyles();
    const TOTAL = 714000;

    return (
        <FloatCard>
            <Grid container spacing={3} style={{padding: "25px"}}>
                <Grid item xs={12}>
                    <Typography variant="h4" align="left" width="100%">Hi, Welcome back</Typography>
                </Grid>
            </Grid>
        </FloatCard>
    )
}

export default ProfileStatus
