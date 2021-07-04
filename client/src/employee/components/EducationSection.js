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
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';


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
      backgroundColor: theme.palette.stateBlueHover,
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
  },
  select: {
    minWidth: "200px",
    fontSize: "16px",
    display: "flex",
    "& .MuiSelect-outlined": {
      padding: "10px 10px 10px 10px"
    }
  },
  placeholder: {
    color: "#777",
      fontSize: '16px',
      marginTop:"-8px",
  }
});

function EducationSection() {
  const classes = useStyles();
  const [fetchedData, setFetchedData] = useState('');
  const [universityFields, setUniversityFields] = useState(null);
  const [schoolFields, setSchoolFields] = useState(null);
  const [university, setUniversity] = useState({university: null, degree: null,fieldOfStudy: null, GPA: null, startDate: null, endDate: null, societiesAndActivities: null});
  const [school, setSchool] = useState({school: null, startDate: null, endDate: null, description: null});
  const [level, setLevel] = useState(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  let eduCount=0;

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

  //---------------------------- university text fields onChange events
  function onChangeUniversity(e){
    setUniversity(prevState => {
      return {...prevState, university: e.target.value}
    })
  }

  function onChangeDegree(e){
    setUniversity(prevState => {
      return {...prevState, degree: e.target.value}
    })
  }

  function onChangeFieldOfStudy(e){
    setUniversity(prevState => {
      return {...prevState, fieldOfStudy: e.target.value}
    })
  }

  function onChangeGPA(e){
    setUniversity(prevState => {
      return {...prevState, GPA: e.target.value}
    })
  }

  function onChangestartDate(e){
    setUniversity(prevState => {
      return {...prevState, startDate: e.target.value}
    })
  }

  function onChangeEndDate(e){
    setUniversity(prevState => {
      return {...prevState, endDate: e.target.value}
    })
  }

  function onChangeSocietiesAndActivities(e){
    setUniversity(prevState => {
      return {...prevState, societiesAndActivities: e.target.value}
    })
  }

  //---------------------------- school text fields onChange events
  function onChangeSchool(e){
    setSchool(prevState => {
      return {...prevState, school: e.target.value}
    })
  }

  function onChangestartDate(e){
    setSchool(prevState => {
      return {...prevState, startDate: e.target.value}
    })
  }

  function onChangeEndDate(e){
    setSchool(prevState => {
      return {...prevState, endDate: e.target.value}
    })
  }

  function onChangeDescription(e){
    setSchool(prevState => {
      return {...prevState, description: e.target.value}
    })
  }

  function fetchData(){
    axios.get(`${BACKEND_URL}/jobseeker/60c5f2e555244d11c8012480`)
    .then(res => {
      if(res.data.success){
        setUniversityFields(res.data.jobseeker.university)
        setSchoolFields(res.data.jobseeker.school)
      }
    })
    setFetchedData(0);
  }

  function onSubmitUniversity(e){
    e.preventDefault();
    const uni = {
        university: university.university,
        degree: university.degree,
        fieldOfStudy: university.fieldOfStudy,
        GPA: university.GPA,
        startDate: university.startDate,
        endDate: university.endDate,
        societiesAndActivities: university.societiesAndActivities
      }

    axios.put(`${BACKEND_URL}/jobseeker/addUniversity/60c5f2e555244d11c8012480`,uni)
    .then(res => console.log(uni));
    setFetchedData(1);
    handleClose();
  }

  function onSubmitSchool(e){
    e.preventDefault();
    const sch = {
        school: school.school,
        startDate: school.startDate,
        endDate: school.endDate,
        description: school.description
      }

    axios.put(`${BACKEND_URL}/jobseeker/addSchool/60c5f2e555244d11c8012480`,sch)
    .then(res => console.log(sch));
    setFetchedData(1);
    handleClose();
  }

  useEffect(()=>{
    setUniversity({
      university: null,
      degree: null,
      fieldOfStudy: null,
      GPA: null,
      startDate: null,
      endDate: null,
      societiesAndActivities: null
    })
    setSchool({
      school: null,
      startDate: null,
      endDate: null,
      description: null
    })
    fetchData()
  },[fetchedData])

  const displayUniFields = () => {
    if (universityFields) {
      eduCount=1;
      if (universityFields.length > 0) {
        return universityFields.map(edu => (
              <EduItem level="University" startYear={edu.startDate} endYear={edu.endDate} university={edu.university} degree={edu.degree} fieldOfStudy={edu.fieldOfStudy} gpa={"GPA : "+edu.GPA} societiesAndActivities={edu.societiesAndActivities} />
              ))
      }
    }
  }

  const displaySchoolFields = () => {
    if (schoolFields) {
      eduCount=1;
      if (schoolFields.length > 0) {
        return schoolFields.map(edu => (
              <EduItem level="School" startYear={edu.startDate} endYear={edu.endDate} school={edu.school} description={edu.description} />
              ))
      }
    }
    if(eduCount==0){
      return (<Typography variant="body2" color="textSecondary" component="p">Education details not added.</Typography>);
    }
  }

  useEffect(()=>{
    if (level == "University") {
      let temp = <form className={classes.form} onSubmit={onSubmitUniversity}>
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
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel className={classes.placeholder} htmlFor="outlined-age-native-simple">Select Degree</InputLabel>
        <Select
          native
          onChange={onChangeDegree}
          label="Select Degree"
          className={classes.select}
        >
          <option aria-label="None" value="" />
          <option value="Bachelor's">Bachelor's</option>
          <option value="Msc">Msc</option>
        </Select>
      </FormControl>
        <TextField
        className={classes.field}
          id="outlined-basic"
          label="Field of Study"
          type="text"
          variant="outlined"
          size="small"
          onChange={onChangeFieldOfStudy}
        />
        <TextField
        className={classes.field}
          id="outlined-basic"
          label="GPA"
          min="0.00"
          step="0.01"
          max="4.25"
          presicion={2}  
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
        <TextField
        className={classes.field}
          id="outlined-basic"
          label="Societies and Activities"
          type="text"
          variant="outlined"
          size="small"
          onChange={onChangeSocietiesAndActivities}
        />
        </div>
        <Button type="submit" className={classes.defaultButton} style={{ width:'100%',marginTop:'5%'}}>Apply Changes</Button>
    </form>;
      setForm(temp);
    }else if(level=="School"){
      let temp=<form className={classes.form} onSubmit={onSubmitSchool}>
      <div>
      <TextField
        className={classes.field}
          id="outlined-basic"
          label="School"
          type="text"
          variant="outlined"
          size="small"
          onChange={onChangeSchool}
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
        <TextField
          className={classes.field}
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={5}
          variant="outlined"
          onChange= {onChangeDescription}
        />
        </div>
        <Button type="submit" className={classes.defaultButton} style={{ width:'100%',marginTop:'5%'}}>Apply Changes</Button>
    </form>;
    setForm(temp);
    }
  },[level,university,school])

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
                setLevel("School")
                handleOpen()
                }}>School</MenuItem>
            </Menu>
        </Grid>
        
      </Grid>
      <Grid container spacing={3}>
            <Grid item xs={12}>
              {displayUniFields()}
              {displaySchoolFields()}
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
