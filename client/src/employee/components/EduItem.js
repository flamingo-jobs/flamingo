import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import theme from '../../Theme';
import Popup from './Popup';

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: '#F8F8F8',
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


function EduItem(props) {
  const classes = useStyles();
  const [styleEdit, setStyleEdit] = useState({display: 'none'});

  const filterFields = () => {
    if(props.level == "University"){
        return (
            <React.Fragment>
                <Grid item xs={8} spacing={2} style={{marginTop:"-15px"}}>
                    <Typography gutterBottom style={{color: theme.palette.stateBlue,textAlign:'justify',fontSize:'14px',fontWeight:'bold',}}>
                        {props.university}
                    </Typography>
                    <Typography gutterBottom style={{color: theme.palette.stateBlue,textAlign:'justify',fontSize:'14px',}}>
                        {props.degree}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" style={{textAlign:'justify',}}>
                        {props.gpa}
                    </Typography>
                </Grid>
            </React.Fragment>
        );
    }else if(props.level == "College"){
        return (
            <React.Fragment>
                <Grid item xs={8} spacing={2} style={{marginTop:"-15px",marginBottom:'-15px'}}>
                    <Typography gutterBottom style={{color: theme.palette.stateBlue,textAlign:'justify',fontSize:'14px',fontWeight:'bold',}}>
                        {props.college}
                    </Typography>
                </Grid>
            </React.Fragment>
        );
    }else if(props.level == "Highschool"){
        return (
            <React.Fragment>
                <Grid item xs={8} spacing={2} style={{marginTop:"-15px",marginBottom:'-15px'}}>
                    <Typography gutterBottom style={{color: theme.palette.stateBlue,textAlign:'justify',fontSize:'14px',fontWeight:'bold',}}>
                        {props.highschool}
                    </Typography>
                </Grid>
            </React.Fragment>
        );
    }
  }

  return (
      <Paper elevation={0} className={classes.paper}
      onMouseEnter={e => {
        setStyleEdit({display: 'block'});
    }}
    onMouseLeave={e => {
        setStyleEdit({display: 'none'});
    }}>
       <Grid container spacing={3}>
       <Grid item xs={10} style={{paddingBottom:0}}>
          {/* <Typography gutterBottom style={{textAlign:'justify',fontSize:'16px',fontWeight:'bold',color:'#666',paddingLeft:'10px'}}>
              {props.level}
          </Typography> */}
        </Grid>
        <Grid item xs={3} style={{marginTop:"-15px"}}>
            <Typography variant="body2" color="textSecondary" component="p">
                {props.startYear} - {props.endYear}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{fontStyle:"italic"}}>
                {props.level}
            </Typography>
        </Grid>       
        {filterFields()}
        <Grid item xs={1} spacing={2} style={{marginTop:"-15px"}}>
            <Button style={{minWidth:'25px',width:'25px'}}>
                <EditIcon style={styleEdit} className={classes.editIcon} size="small" />
            </Button>
        </Grid>
       </Grid>
      </Paper>
  );
}

export default EduItem
