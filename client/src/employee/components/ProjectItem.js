import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: '#F8F8F8',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 25,
    borderRadius: 10,
  },
}));

function ProjectItem(props) {
  const classes = useStyles();

  return (   
    <TimelineItem>
        <TimelineOppositeContent style={{flex:'0.2'}}>
            <Typography variant="body2" color="textSecondary">
                2021 Apr - 2021 July
            </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
            <TimelineDot style={{backgroundColor: '#9494b8'}}>
                <LaptopMacIcon />
            </TimelineDot>
            <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
            <Paper className={classes.paper}>
                <Typography variant="h6" component="h1">
                Eat
                </Typography>
                <Typography>Because you need strength</Typography>
            </Paper>
        </TimelineContent>
    </TimelineItem>
  );
}

export default ProjectItem
