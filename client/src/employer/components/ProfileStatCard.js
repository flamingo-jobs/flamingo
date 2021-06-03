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
import HelpIcon from '@material-ui/icons/Help';



import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CachedIcon from '@material-ui/icons/Cached';
import DescriptionIcon from '@material-ui/icons/Description';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


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
        marginLeft: 20,
    },
    ratingText: {
        color: theme.palette.white,
        marginTop:5,
        marginLeft:5,

    },
    timeline:{
        marginLeft:-300,
    },
    paper: {
        padding: '6px 16px',
    },
    secondaryTail: {
        backgroundColor: theme.palette.secondary.main,
    },
    timelineIcons:{
        color: theme.palette.white,
    },
    button: {
        marginTop:-0.5,
        color:theme.palette.white,
        backgroundColor:theme.palette.frenchViolet,
        margin: theme.spacing(1),
    
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

                    <Grid item container spacing={1}>

                        <Grid item xs={12}>

                            <Timeline className={classes.timeline}>

                                <TimelineItem>
                                    
                                    <TimelineSeparator>
                                        <TimelineDot >
                                            <AccountCircleIcon className={classes.timelineIcons}/>
                                        </TimelineDot>
                                        <TimelineConnector />
                                    </TimelineSeparator>

                                    <TimelineContent>
                                        <Grid item container spacing={1}>
                                            <Grid item xs={8}>
                                                <Paper elevation={3} className={classes.paper}>
                                                <Typography variant="body2" component="h1">
                                                24 profile views this month</Typography>
                                                </Paper>

                                            </Grid>
                                            <Grid item xs={4}>
                                                <Button
                                                variant="contained" size="small"
                                                className={classes.button}
                                                startIcon={<HelpIcon />}
                                                >
                                                    
                                                </Button>
                                            </Grid>

                                        </Grid>
                                        
                                       
                                    </TimelineContent>
                                </TimelineItem>

                                <TimelineItem>
                                    
                                    <TimelineSeparator>
                                        <TimelineDot >
                                            <CheckCircleIcon className={classes.timelineIcons}/>
                                        </TimelineDot>
                                        <TimelineConnector />
                                    </TimelineSeparator>

                                    <TimelineContent>
                                        <Grid item container spacing={1}>
                                            <Grid item xs={8}>
                                                <Paper elevation={3} className={classes.paper}>
                                                <Typography variant="body2" component="h1">
                                                10 completed jobs </Typography>
                                                </Paper>

                                            </Grid>
                                            <Grid item xs={4}>
                                                <Button
                                                variant="contained" size="small"
                                                className={classes.button}
                                                startIcon={<HelpIcon />}
                                                >
                                                    
                                                </Button>
                                            </Grid>

                                        </Grid>
                                        
                                       
                                    </TimelineContent>
                                </TimelineItem>

                                <TimelineItem>
                                    
                                    <TimelineSeparator>
                                        <TimelineDot >
                                            <CachedIcon className={classes.timelineIcons}/>
                                        </TimelineDot>
                                        <TimelineConnector />
                                    </TimelineSeparator>

                                    <TimelineContent>
                                        <Grid item container spacing={1}>
                                            <Grid item xs={8}>
                                                <Paper elevation={3} className={classes.paper}>
                                                <Typography variant="body2" component="h1">
                                                15 jobs in progress</Typography>
                                                </Paper>

                                            </Grid>
                                            <Grid item xs={4}>
                                                <Button
                                                variant="contained" size="small"
                                                className={classes.button}
                                                startIcon={<HelpIcon />}
                                                >
                                                    
                                                </Button>
                                            </Grid>

                                        </Grid>
                                        
                                       
                                    </TimelineContent>
                                </TimelineItem>

                                <TimelineItem>
                                    
                                    <TimelineSeparator>
                                        <TimelineDot >
                                            <DescriptionIcon className={classes.timelineIcons}/>
                                        </TimelineDot>
                                        {/* <TimelineConnector /> */}
                                    </TimelineSeparator>

                                    <TimelineContent>
                                        <Grid item container spacing={1}>
                                            <Grid item xs={8}>
                                                <Paper elevation={3} className={classes.paper}>
                                                <Typography variant="body2" component="h1">
                                                Total of 25 Resumes received so far</Typography>
                                                </Paper>

                                            </Grid>
                                            <Grid item xs={4}>
                                                <Button
                                                variant="contained" size="small"
                                                className={classes.button}
                                                startIcon={<HelpIcon />}
                                                >
                                                    
                                                </Button>
                                            </Grid>

                                        </Grid>
                                        
                                       
                                    </TimelineContent>
                                </TimelineItem>

                                
                                
                            </Timeline>

                        </Grid>

                    </Grid>

                </div>

            </FloatCard>
            
        </div>
    )
}

export default ProfileStatCard
