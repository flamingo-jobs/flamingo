import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FloatCard from '../../components/FloatCard';
import cardImage from '../images/profilePic.jpg';
import theme from '../../Theme';
import EditIcon from '@material-ui/icons/Edit';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import Grid from '@material-ui/core/Grid';
import AchievementItem from './AchievementItem';

const useStyles = makeStyles({
  defaultButton: {
    backgroundColor: theme.palette.tuftsBlue,
    color: theme.palette.white,
    marginLeft: 20,
    borderRadius: 25,
    paddingLeft: 20,
    paddingRight: 20,
    "&:hover": {
      backgroundColor: theme.palette.mediumTurquoise,
      color: 'white',
    }
  },
});

function Achievements() {
  const classes = useStyles();

  return (
    <FloatCard>
      <Grid container spacing={3}>
        <Grid item xs style={{ textAlign: 'left',}}>
            <Typography gutterBottom variant="h5" style={{color: theme.palette.tuftsBlue,padding:'10px',fontWeight:'bold'}}>
                <EmojiEventsIcon style={{color: theme.palette.turfsBlue,marginRight: '10px',marginBottom:'-5px',fontSize:'27'}}/>
                Achievements
            </Typography>
        </Grid>
        <Grid item style={{ textAlign: 'right' }}>
            <Button className={classes.defaultButton} style={{ float: 'right',marginRight: '0px',backgroundColor:'white'}}>
                <EditIcon style={{color: theme.palette.tuftsBlue,}} />
            </Button>
        </Grid>
        
      </Grid>
      <Grid container spacing={3}>
      <Grid item xs={12}>
                <AchievementItem name="1st place competition abcd" />
                <AchievementItem name="1st place competition abcd" />
            </Grid>
        </Grid>
    </FloatCard>
  );
}

export default Achievements
