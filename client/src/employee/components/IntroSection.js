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
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
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
  },
  changePicture: {
      width: '0px',
  }
});

function IntroSection() {
  const classes = useStyles();

  return (
    <FloatCard>
      <CardActionArea>
          <Typography component="div">
      <CardMedia
            className={classes.media}
            image={cardImage}
            alt="profile image"
            zIndex="modal"
        />

        {/* <Box
        bgcolor="#F0F8FF"
        color="white"
        position="fixed"
        top="19%"
        left="13%"
        zIndex="tooltip"
        className={classes.changePicture}
      >
          <Button variant="outlined" color="primary" className={classes.defaultButton} style={{backgroundColor:'#F0F8FF'}} >
            <ImageSearchIcon style={{color: theme.palette.tuftsBlue,}} />
          </Button>
      </Box> */}

      </Typography>
        <CardContent>
          <Typography gutterBottom variant="h5" style={{color: theme.palette.stateBlue,}}>
            Anne
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" style={{textAlign:'justify',}}>
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
