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
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: '150px',
    width: '150px',
    margin: 'auto',
    borderRadius: 30,
    marginTop: 15,
  },
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
  }
});

function IntroSection() {
  const classes = useStyles();

  return (
    <FloatCard>
      <CardActionArea>
      <CardMedia
            className={classes.media}
            image={cardImage}
            alt="profile image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" style={{color: theme.palette.stateBlue,}}>
            Anne
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Grid container>
        <Grid item xs style={{ textAlign: 'left' }}>
        <Button size="small" color="primary">
            <LinkedInIcon style={{color: theme.palette.turfsBlue,marginRight: '5px',}} />Add LinkedIn Account</Button>
        </Grid>
        <Grid item style={{ textAlign: 'right' }}>
            <Button className={classes.defaultButton} style={{ float: 'right',marginRight: '0px',}}>Upload CV</Button>
        </Grid>
      </Grid>
        
        
      </CardActions>
    </FloatCard>
  );
}

export default IntroSection
