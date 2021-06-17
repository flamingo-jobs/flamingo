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
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import BACKEND_URL from '../../Config';


const useStyles = makeStyles({
  media: {
    height: '150px',
    width: '150px',
    margin: 'auto',
    borderRadius: 30,
    marginTop: 15,
  },
  defaultButton: {
    backgroundColor: theme.palette.stateBlue,
    color: theme.palette.white,
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
    padding: '5% 15% 5% 15%'
  },
  field: {
    margin: "20px 0px 20px 0px",
    display: "flex",
    fontSize: "16px",
    "& label": {
      color: "#777",
      fontSize: '16px',
    }
  }
});

function EducationSection() {
  const classes = useStyles();
  const [fetchedData, setFetchedData] = useState('');
  const [education, setEducation] = useState(null);
  const [state, setState] = useState({level: null, university: null, degree: null, GPA: null, startDate: null, endDate: null, college: null, highschool: null});
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const level= state.level;
  const university= state.university;
  const degree= state.degree;
  const GPA= state.GPA;
  const startDate= state.startDate;
  const endDate= state.endDate;


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

  //---------------------------- text field onChange events
  function onChangeUniversity(e){
    setState(prevState => {
      return {...prevState, university: e.target.value}
    })
  }

  function onChangeDegree(e){
    setState(prevState => {
      return {...prevState, degree: e.target.value}
    })
  }

  function onChangeGPA(e){
    setState(prevState => {
      return {...prevState, GPA: e.target.value}
    })
  }

  function onChangestartDate(e){
    setState(prevState => {
      return {...prevState, startDate: e.target.value}
    })
  }

  function onChangeEndDate(e){
    setState(prevState => {
      return {...prevState, endDate: e.target.value}
    })
  }

  function onChangeCollege(e){
    setState(prevState => {
      return {...prevState, college: e.target.value}
    })
  }

  function onChangeHighschool(e){
    setState(prevState => {
      return {...prevState, highschool: e.target.value}
    })
  }

  async function fetchData(){
    axios.get(`${BACKEND_URL}/jobseeker/60c5f2e555244d11c8012480`)
    .then(res => {
      if(res.data.success){
        setEducation(res.data.jobseeker.education)
        setFetchedData(res.data.jobseeker.education)
      }
    })
  }

  function onSubmit(e){
    e.preventDefault();
    let edu;
    if(level == "University"){
      edu = {
        level: level,
        university: university,
        degree: degree,
        GPA: GPA,
        startDate: startDate,
        endDate: endDate
      }
    }else if(level == "College"){
      edu = {
        level: level,
        college: state.college,
        startDate: startDate,
        endDate: endDate
      }
    }else if(level == "Highschool"){
      edu = {
        level: level,
        highschool: state.highschool,
        startDate: startDate,
        endDate: endDate
      }
    }

    axios.put(`${BACKEND_URL}/jobseeker/addEducation/60c5f2e555244d11c8012480`,edu)
    .then(res => console.log(edu));
    handleClose();
    fetchData();
  }

  useEffect(()=>{
    fetchData()
  },[open])

  const displayEduFields = () => {
    if (education) {
      if (education.length > 0) {
        return education.map(edu => (
              <EduItem level={edu.level} startYear={edu.startDate} endYear={edu.endDate} university={edu.university} degree={edu.degree} gpa={"GPA - "+edu.GPA} college={edu.college} highschool={edu.highschool} />
              ))
        }else{
          return (<Typography variant="body2" color="textSecondary" component="p">Education details not added.</Typography>)
        }
      }else{
        return (<Typography variant="body2" color="textSecondary" component="p">Education details not added.</Typography>)
      }
  }

  useEffect(()=>{
    if (level == "University") {
      let temp = <form className={classes.form} onSubmit={onSubmit}>
      <div>
      <TextField
        className={classes.field}
          id="outlined-basic"
          label="University"
          type="text"
          variant="outlined"
          size="small"
          onChange={onChangeUniversity}
        />
        <TextField
        className={classes.field}
          id="outlined-basic"
          label="Degree"
          type="text"
          variant="outlined"
          size="small"
          onChange={onChangeDegree}
        />
        <TextField
        className={classes.field}
          id="outlined-basic"
          label="GPA"
          type="number"
          variant="outlined"
          size="small"
          onChange={onChangeGPA}
          style={{width:'30%'}}
        />
        <Grid container direction="row" style={{marginTop:'-18px'}}>
        <TextField
        className={classes.field}
          id="outlined-basic"
          label="Start year"
          type="number"
          variant="outlined"
          size="small"
          onChange={onChangestartDate}
          style={{width:'30%',marginRight:'10%'}}
        />
        <TextField
        className={classes.field}
          id="outlined-basic"
          label="End year"
          type="number"
          variant="outlined"
          size="small"
          onChange={onChangeEndDate}
          style={{width:'30%'}}
        />
        </Grid>
        </div>
        <Button type="submit" className={classes.defaultButton} style={{ width:'100%',marginTop:'5%'}}>Apply Changes</Button>
    </form>;
      setForm(temp);
    }else if(level=="College"){
      let temp=<form className={classes.form} onSubmit={onSubmit}>
      <div>
      <TextField
        className={classes.field}
          id="outlined-basic"
          label="College"
          type="text"
          variant="outlined"
          size="small"
          onChange={onChangeCollege}
        />
        <Grid container direction="row">
        <TextField
        className={classes.field}
          id="outlined-basic"
          label="Start year"
          type="number"
          variant="outlined"
          size="small"
          onChange={onChangestartDate}
          style={{width:'30%',marginRight:'10%'}}
        />
        <TextField
        className={classes.field}
          id="outlined-basic"
          label="End year"
          type="number"
          variant="outlined"
          size="small"
          onChange={onChangeEndDate}
          style={{width:'30%'}}
        />
        </Grid>
        </div>
        <Button type="submit" className={classes.defaultButton} style={{ width:'100%',marginTop:'5%'}}>Apply Changes</Button>
    </form>;
    setForm(temp);
    }else if(level=="Highschool"){
      let temp=<form className={classes.form} onSubmit={onSubmit}>
      <div>
      <TextField
        className={classes.field}
          id="outlined-basic"
          label="Highschool"
          type="text"
          variant="outlined"
          size="small"
          onChange={onChangeHighschool}
        />
        <Grid container direction="row">
        <TextField
        className={classes.field}
          id="outlined-basic"
          label="Start year"
          type="number"
          variant="outlined"
          size="small"
          onChange={onChangestartDate}
          style={{width:'30%',marginRight:'10%'}}
        />
        <TextField
        className={classes.field}
          id="outlined-basic"
          label="End year"
          type="number"
          variant="outlined"
          size="small"
          onChange={onChangeEndDate}
          style={{width:'30%'}}
        />
        </Grid>
        </div>
        <Button type="submit" className={classes.defaultButton} style={{ width:'100%',marginTop:'5%'}}>Apply Changes</Button>
    </form>;
    setForm(temp);
    }
  },[state])

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
                setState(prevState => {
                  return {...prevState, level: "University"}
                })
                handleOpen()
                }}>University</MenuItem>
              <MenuItem onClick={()=>{
                handleCloseMenu()
                setState(prevState => {
                  return {...prevState, level: "College"}
                })
                handleOpen()
                }}>College</MenuItem>
              <MenuItem onClick={()=>{
                handleCloseMenu()
                setState(prevState => {
                  return {...prevState, level: "Highschool"}
                })
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
              <div style={{paddingTop:'40px'}}>
                <Grid container xs={12} direction="row">
                  <Grid item xs={10}>
                    <Typography gutterBottom variant="h5" style={{textAlign:'center',paddingLeft:'50px',color:theme.palette.stateBlue}}>
                      Add Education
                    </Typography>
                    <Divider variant="middle" style={{marginLeft:'100px'}} />
                  </Grid>
                  <Grid item xs={2}>
                    <Button className={classes.defaultButton} style={{ float: 'right',marginRight:'10px',marginTop:'-20px',backgroundColor:'white'}} onClick={handleClose}>
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
