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

function StatCard() {
    const classes = useStyles();
    const TOTAL = 714000;

    return (
        <FloatCard>
            <Grid container spacing={3} style={{padding: "25px"}}>
                <Grid item xs={12}>
                    <Typography variant="h4" align="left" width="100%">Hi, Welcome back</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Paper elevation={0} className={classes.paperCont}>  
                        <Grid container xs={12}>
                            <Grid item sm={12} md={5}>
                                <CardMedia
                                image={statImage2}
                                title="Contemplative Reptile"
                                style={{height:"150px",width:"150px",borderRadius: 10}}
                                zIndex="background"
                                /> 
                            </Grid>
                            <Grid item sm={12} md={5} style={{alignItems:"center",display: "flex"}}>
                                <div style={{width:"100%"}}>
                                    <Typography sx={{ opacity: 0.72 }} style={{fontSize:"17px"}}>
                                        Careers for Me
                                    </Typography>
                                    <Typography variant="h3">15</Typography>
                                </div>
                            </Grid>
                        </Grid>        
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper elevation={0} className={classes.paperCont}>  
                        <Grid container xs={12}>
                            <Grid item sm={12} md={5}>
                                <CardMedia
                                image={statImage1}
                                title="Contemplative Reptile"
                                style={{height:"150px",width:"150px",borderRadius: 10}}
                                zIndex="background"
                                /> 
                            </Grid>
                            <Grid item sm={12} md={5} style={{alignItems:"center",display: "flex"}}>
                                <div style={{width:"100%"}}>
                                    <Typography sx={{ opacity: 0.72 }} style={{fontSize:"17px"}}>
                                        Applied Jobs
                                    </Typography>
                                    <Typography variant="h3">15</Typography>
                                </div>
                            </Grid>
                        </Grid>        
                    </Paper>
                </Grid>
            </Grid>
        </FloatCard>
    )
}

export default StatCard
