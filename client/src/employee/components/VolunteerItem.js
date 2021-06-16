import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import theme from '../../Theme';
import StarIcon from '@material-ui/icons/Star';
import Avatar from '@material-ui/core/Avatar';
import volunteerImage from '../images/volunteering.jpg';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: 'Snow',
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 25,
        borderRadius: 10,
        "&:hover": {
            defaultButton: {
                display: 'block'
            }
          }
      },
      defaultButton: {
        display: 'none',
        backgroundColor: theme.palette.tuftsBlue,
        color: theme.palette.white,
        marginLeft: 20,
        borderRadius: 25,
        paddingLeft: 20,
        paddingRight: 20,
        "&:hover": {
          backgroundColor: 'white ',
          color: 'white',
        }
      },
      editIcon: {
        padding:'0px',
        margin:'-15px',
        color: theme.palette.tuftsBlue,
      }
}));

function VolunteerItem(props) {
  const classes = useStyles();
  const [styleEdit, setStyleEdit] = useState({display: 'none'});

  return (
      <Paper elevation={0} className={classes.paper}
        onMouseEnter={e => {
            setStyleEdit({display: 'block'});
        }}
        onMouseLeave={e => {
            setStyleEdit({display: 'none'});
      }}>
       <Grid container spacing={3}>
        <Grid item xs={3}>
            <Typography variant="body2" color="textSecondary" component="p">
                {props.from} - {props.to}
            </Typography>
        </Grid>
        <Grid item xs={8} spacing={2} style={{marginTop:"-5px"}}>
            <Typography gutterBottom style={{color: theme.palette.stateBlue,textAlign:'justify',fontSize:'15px',fontWeight:'bold',paddingTop:'5px'}}>
                {props.title}
            </Typography>
            <Typography gutterBottom style={{color: theme.palette.stateBlue,textAlign:'justify',fontSize:'15px',}}>
                {props.description}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{textAlign:'justify',paddingTop:'5px'}}>
                Organization : {props.organization}
            </Typography>
        </Grid>
        <Grid item xs={1} spacing={2} style={{marginTop:"-5px"}}>
            <Button style={{minWidth:'25px',width:'25px'}}>
                <EditIcon style={styleEdit} className={classes.editIcon} size="small" />
            </Button>
        </Grid>
        
       </Grid>
      </Paper>
  );
}

export default VolunteerItem
