import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import theme from '../../Theme';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '20px',
        backgroundColor: 'SeaShell',
        boxShadow: "0px 0px 0px 0px",
        borderRadius: 15,
      },
}));

function ProjectItem(props) {
  const classes = useStyles();

  return (   
    <TimelineItem>
        <TimelineOppositeContent style={{flex:'0.2'}}>
            <Typography variant="body2" color="textSecondary">
                {props.from} - {props.to}
            </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
            <TimelineDot style={{backgroundColor: "thistle"}}>
                <LaptopMacIcon />
            </TimelineDot>
            <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
            <Paper className={classes.paper}>
                <Typography gutterBottom style={{textAlign:'justify',fontSize:'16px',fontWeight:'bold',color:'#666'}}>
                    {props.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" style={{textAlign:'left'}}>
                    {props.description}
                </Typography>
                <Typography gutterBottom style={{color: theme.palette.stateBlue,textAlign:'justify',fontSize:'14px',fontWeight:'bold',paddingTop:'10px'}}>
                    {props.usedTech}
                </Typography>
            </Paper>
        </TimelineContent>
    </TimelineItem>
  );
}

export default ProjectItem
