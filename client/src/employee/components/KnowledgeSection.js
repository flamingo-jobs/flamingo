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
import MenuBookIcon from '@material-ui/icons/MenuBook';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

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
  paper: {
    backgroundColor: '#F8F8F8',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 25,
    borderRadius: 10,
  },
});

function KnowledgeSection() {
  const classes = useStyles();

  return (
    <FloatCard>
      <Grid container spacing={3}>
        <Grid item xs style={{ textAlign: 'left',}}>
            <Typography gutterBottom variant="h5" style={{color: theme.palette.tuftsBlue,padding:'10px',fontWeight:'bold'}}>
                <MenuBookIcon style={{color: theme.palette.turfsBlue,marginRight: '10px',marginBottom:'-5px',fontSize:'27'}}/>
                Knowledge Area
            </Typography>
        </Grid>
        <Grid item style={{ textAlign: 'right' }}>
            {/* <Button className={classes.defaultButton} style={{ float: 'right',marginRight: '0px',backgroundColor:'white'}}>
                <EditIcon style={{color: theme.palette.tuftsBlue,}} />
            </Button> */}
        </Grid>
        
      </Grid>
      <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper elevation={0} className={classes.paper}>
                    <Typography gutterBottom style={{textAlign:'justify',fontSize:'16px',fontWeight:'bold',color:'#666'}}>
                        Programming Languages
                    </Typography>
                </Paper>
                <Paper elevation={0} className={classes.paper}>
                    <Typography gutterBottom style={{textAlign:'justify',fontSize:'16px',fontWeight:'bold',color:'#666'}}>
                        Web Development
                    </Typography>
                </Paper>
                <Paper elevation={0} className={classes.paper}>
                    <Typography gutterBottom style={{textAlign:'justify',fontSize:'16px',fontWeight:'bold',color:'#666'}}>
                        Database
                    </Typography>
                </Paper>
                <Paper elevation={0} className={classes.paper}>
                    <Typography gutterBottom style={{textAlign:'justify',fontSize:'16px',fontWeight:'bold',color:'#666'}}>
                        Other
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    </FloatCard>
  );
}

export default KnowledgeSection
