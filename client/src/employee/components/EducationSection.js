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
import SchoolIcon from '@material-ui/icons/School';
import Grid from '@material-ui/core/Grid';
import EduItem from './EduItem';

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
});

function EducationSection() {
  const classes = useStyles();

  return (
    <FloatCard>
      <Grid container spacing={3}>
        <Grid item xs style={{ textAlign: 'left',}}>
            <Typography gutterBottom variant="h5" style={{color: theme.palette.tuftsBlue,padding:'10px',fontWeight:'bold'}}>
                <SchoolIcon style={{color: theme.palette.turfsBlue,marginRight: '10px',marginBottom:'-5px',fontSize:'27'}}/>
                Education
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
                <EduItem startYear="2019" endYear="2022" name="University of Colombo School of Computing" />
                <EduItem startYear="2008" endYear="2017" name="Taxila Central College" />
            </Grid>
        </Grid>
    </FloatCard>
  );
}

export default EducationSection
