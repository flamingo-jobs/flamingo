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
import WorkIcon from '@material-ui/icons/Work';
import Grid from '@material-ui/core/Grid';
import WorkExpItem from './WorkExpItem';

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

function WorkExperience() {
  const classes = useStyles();

  return (
    <FloatCard>
      <Grid container spacing={3}>
        <Grid item xs style={{ textAlign: 'left',}}>
            <Typography gutterBottom variant="h5" style={{color: theme.palette.tuftsBlue,padding:'10px',fontWeight:'bold'}}>
                <WorkIcon style={{color: theme.palette.turfsBlue,marginRight: '10px',marginBottom:'-5px',fontSize:'27'}}/>
                Work Experience
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
                <WorkExpItem startYear="2019" endYear="2022" role="Intern Software Engineer" companyName="Company XYZ" description="This is a brief description on what work you have done and what responsibilities were given to you." />
                <WorkExpItem startYear="2019" endYear="2022" role="Volunteer" companyName="Programme Name" description="This is a brief description on what work you have done and what responsibilities were given to you." />
            </Grid>
        </Grid>
    </FloatCard>
  );
}

export default WorkExperience
