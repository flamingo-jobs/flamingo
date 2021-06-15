import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import theme from '../../Theme';
import StarIcon from '@material-ui/icons/Star';

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: '#F8F8F8',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 25,
    borderRadius: 10,
  },
}));

function AchievementItem(props) {
  const classes = useStyles();

  return (
      <Paper elevation={0} className={classes.paper}>
       <Grid container spacing={3}>
        <Grid item xs={1}>
        <StarIcon style={{color: theme.palette.pinkyRed,}} />
        </Grid>
        <Grid item xs={11}>
            <Typography gutterBottom style={{color: theme.palette.stateBlue,textAlign:'justify',fontSize:'15px',fontWeight:'bold',paddingTop:'5px'}}>
                {props.title}
            </Typography>
            <Typography gutterBottom style={{color: theme.palette.stateBlue,textAlign:'justify',fontSize:'15px',}}>
                {props.description}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{textAlign:'justify',paddingTop:'5px'}}>
                Issued by : {props.issuedBy}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{textAlign:'justify',paddingTop:'5px'}}>
                Issued date : {props.date}
            </Typography>
        </Grid>
        
       </Grid>
      </Paper>
  );
}

export default AchievementItem
