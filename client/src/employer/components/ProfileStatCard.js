import React from 'react'
import { Avatar, Button, Chip, makeStyles, Typography } from '@material-ui/core';
import { FavoriteRounded } from '@material-ui/icons';
import FloatCard from './FloatCard';
import Rating from '@material-ui/lab/Rating';
import Grid from '@material-ui/core/Grid';
import Timeline from '@material-ui/lab/Timeline';
import Paper from '@material-ui/core/Paper';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';

import FastfoodIcon from '@material-ui/icons/Fastfood';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import HotelIcon from '@material-ui/icons/Hotel';
import RepeatIcon from '@material-ui/icons/Repeat';


const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'left',
        color: theme.palette.white,

    },
    rating: {
        display: 'flex',
        flexDirection: 'column',
        '& > * + *': {
          marginTop: theme.spacing(1),
        },
    },
    ratingText: {
        color: theme.palette.white,
        marginTop:5,

    },
    // statChart:{

    // },
    paper: {
        padding: '6px 16px',
    },
    secondaryTail: {
        backgroundColor: theme.palette.secondary.main,
    },
}))

function ProfileStatCard() {

    const classes = useStyles();


    return (

        <div className={classes.root}>

            <FloatCard backColor={'#5E60CE'}>

                <Grid item container spacing={2}>

                    <Grid item xs={4}>
                        <div className={classes.rating}>
                            <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                        </div>                       
                    </Grid>
                    
                    <Grid item xs={8} >
                        <div className={classes.ratingText}>
                            <Typography variant="body2">
                                4.5 stars based on 124 reviews
                            </Typography>

                        </div>                    
                    </Grid>

                </Grid>

                <div>

                    <Timeline>

                        <TimelineItem>
                            
                            <TimelineSeparator>
                            <TimelineDot>
                                <FastfoodIcon />
                            </TimelineDot>
                            <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                            <Paper elevation={3} className={classes.paper}>
                                <Typography variant="body2" component="h1">
                                Eat
                                </Typography>
                                <Typography>Because you need strength</Typography>
                            </Paper>
                            </TimelineContent>
                        </TimelineItem>


                        <TimelineItem>
                            
                            <TimelineSeparator>
                            <TimelineDot color="primary">
                                <LaptopMacIcon />
                            </TimelineDot>
                            <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                            <Paper elevation={3} className={classes.paper}>
                                <Typography variant="body2" component="h1">
                                Code
                                </Typography>
                                <Typography>Because it&apos;s awesome!</Typography>
                            </Paper>
                            </TimelineContent>
                        </TimelineItem>


                        <TimelineItem>
                            <TimelineSeparator>
                            <TimelineDot color="primary" variant="outlined">
                                <HotelIcon />
                            </TimelineDot>
                            <TimelineConnector className={classes.secondaryTail} />
                            </TimelineSeparator>
                            <TimelineContent>
                            <Paper elevation={3} className={classes.paper}>
                                <Typography variant="body2" component="h1">
                                Sleep
                                </Typography>
                                <Typography>Because you need rest</Typography>
                            </Paper>
                            </TimelineContent>
                        </TimelineItem>


                        <TimelineItem>
                            <TimelineSeparator>
                            <TimelineDot color="secondary">
                                <RepeatIcon />
                            </TimelineDot>
                            </TimelineSeparator>
                            <TimelineContent>
                            <Paper elevation={3} className={classes.paper}>
                                <Typography variant="body2" component="h1">
                                Repeat
                                </Typography>
                                <Typography>Because this is the life you love!</Typography>
                            </Paper>
                            </TimelineContent>
                        </TimelineItem>

                        
                    </Timeline>

                </div>

            </FloatCard>
            
        </div>
    )
}

export default ProfileStatCard
