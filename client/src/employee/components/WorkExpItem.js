import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import theme from '../../Theme';

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: '#F8F8F8',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 25,
    borderRadius: 10,
  },
}));

function WorkExpItem(props) {
  const classes = useStyles();

  return (
      <Paper elevation={0} className={classes.paper}>
        <Typography gutterBottom style={{textAlign:'justify',fontSize:'16px',fontWeight:'bold',color:'#666'}}>
            {props.role}
        </Typography>
        <Typography gutterBottom style={{color: theme.palette.stateBlue,textAlign:'justify',fontSize:'14px',fontWeight:'bold',}}>
            {props.companyName}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p" style={{textAlign:'justify'}}>
            {props.description}
        </Typography>
        <Typography variant="body2" component="p" style={{textAlign:'justify',color:theme.palette.stateBlue}}>
            {props.startYear} - {props.endYear}
        </Typography>
      </Paper>
  );
}

export default WorkExpItem
