import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FloatCard from '../../components/FloatCard';
import theme from '../../Theme';
import SchoolIcon from '@material-ui/icons/School';
import Grid from '@material-ui/core/Grid';
import EduItem from './EduItem';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

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
      backgroundColor: '#0088cc',
      color: 'white',
    }
  },
  editIcon: {
    "&:hover": {
      fontSize: "30px",
    }
  },
  closeIcon: {
    "&:hover": {
      fontSize: "25px",
      color: "#b30000 !important"
    }
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    width: '600px',
    borderRadius: 10,
    paddingBottom: "30px"
  },
  form: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px 30px 30px 30px'
  },
  field: {
    margin: "20px",
    display: "flex",
    fontSize: "16px",
    "& label": {
      color: "#777",
      fontSize: '22px',
    }
  }
});

function EducationSection() {
  const classes = useStyles();
  const [state, setState] = useState({name:'bbb', intro:'ccc',intro: ["blaa","kkk"]});
  const [open, setOpen] = useState(false);
  const [level, setLevel] = useState(null);
  const [form, setForm] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const name = state.name;
  const intro = state.intro;
  const education = state.education;

  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  function handleCloseMenu() {
    setAnchorEl(null);
  }

  function handleOpen(){
    setOpen(true);
  }

  function handleClose(){
    setOpen(false);
  }

  useEffect(()=>{
    axios.get('http://localhost:8000/jobseeker/60c5f2e555244d11c8012480')
    .then(res => {
      if(res.data.success){
        setState({
          name: res.data.jobseeker.name,
          intro: res.data.jobseeker.intro,
          education: res.data.jobseeker.education
        })
      }
    })
  },[])

  const displayEduFields = () => {
    if (education) {
    return education.map(edu => (
          <EduItem level={edu.level} startYear={edu.startDate} endYear={edu.endDate} institute={edu.university} degree={edu.degree} gpa={"GPA - "+edu.GPA} />
          ))
    }else{
      return (<Typography>Education details not added.</Typography>)
    }

}

  useEffect(()=>{
    if (level == "University") {
      let temp = <form className={classes.form}>
      <div>
      <TextField
        className={classes.field}
          id="standard-number"
          label="University"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
        className={classes.field}
          id="standard-number"
          label="Degree"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
        className={classes.field}
          id="standard-number"
          label="GPA"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          style={{width:'30%'}}
        />
        <Grid container direction="row">
        <TextField
        className={classes.field}
          id="standard-number"
          label="Start year"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          style={{width:'30%'}}
        />
        <TextField
        className={classes.field}
          id="standard-number"
          label="End year"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          style={{width:'30%'}}
        />
        </Grid>
        </div>
        <Button type="submit" className={classes.defaultButton} style={{ float: 'right',margin:'30px 20px 0px 0px'}}>Apply Changes</Button>
    </form>;
      setForm(temp);
    }else if(level=="College"){
      let temp=<form className={classes.form}>
      <div>
      <TextField
        className={classes.field}
          id="standard-number"
          label="College"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Grid container direction="row">
        <TextField
        className={classes.field}
          id="standard-number"
          label="Start year"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          style={{width:'30%'}}
        />
        <TextField
        className={classes.field}
          id="standard-number"
          label="End year"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          style={{width:'30%'}}
        />
        </Grid>
        </div>
        <Button type="submit" className={classes.defaultButton} style={{ float: 'right',margin:'30px 20px 0px 0px'}}>Apply Changes</Button>
    </form>;
    setForm(temp);
    }else if(level=="Highschool"){
      let temp=<form className={classes.form}>
      <div>
      <TextField
        className={classes.field}
          id="standard-number"
          label="Highschool"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Grid container direction="row">
        <TextField
        className={classes.field}
          id="standard-number"
          label="Start year"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          style={{width:'30%'}}
        />
        <TextField
        className={classes.field}
          id="standard-number"
          label="End year"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          style={{width:'30%'}}
        />
        </Grid>
        </div>
        <Button type="submit" className={classes.defaultButton} style={{ float: 'right',margin:'30px 20px 0px 0px'}}>Apply Changes</Button>
    </form>;
    setForm(temp);
    }
  },[level])

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
            <Button className={classes.defaultButton} style={{ float: 'right',marginRight: '0px',backgroundColor:'white'}} onClick={handleClick}>
                <AddIcon style={{color: theme.palette.tuftsBlue,}} className={classes.editIcon} />
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
              <MenuItem onClick={()=>{
                handleCloseMenu()
                setLevel("University")
                handleOpen()
                }}>University</MenuItem>
              <MenuItem onClick={()=>{
                handleCloseMenu()
                setLevel("College")
                handleOpen()
                }}>College</MenuItem>
              <MenuItem onClick={()=>{
                handleCloseMenu()
                setLevel("Highschool")
                handleOpen()
                }}>Highschool</MenuItem>
            </Menu>
        </Grid>
        
      </Grid>
      <Grid container spacing={3}>
            <Grid item xs={12}>
              {displayEduFields()}
            </Grid>
        </Grid>

        {/*-------------- add new edu field popup content ------------------- */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <div style={{paddingTop:'20px',backgroundColor:'#e6f2ff'}}>
                <Grid container xs={12} direction="row">
                  <Grid item xs={10}>
                    <Typography gutterBottom variant="h5" style={{color: '#0066cc',paddingLeft:'30px'}}>
                      Add Education
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Button className={classes.defaultButton} style={{ float: 'right',marginRight:'20px',marginTop:'-5px',backgroundColor:'white'}} onClick={handleClose}>
                      <CloseIcon className={classes.closeIcon} style={{color: '#666',}} />
                    </Button>
                  </Grid>
                </Grid>
              </div>
              {form}
              
            </div>
          </Fade>
        </Modal>
    </FloatCard>
  );
}

export default EducationSection
