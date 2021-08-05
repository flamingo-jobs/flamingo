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
import SnackBarAlert from "../../components/SnackBarAlert";


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
  selectYear: {
    margin: "20px 10px 0px 0px",
    minWidth: "90px",
    fontSize: "16px",
    display: "flex",
    "& .MuiSelect-outlined": {
      padding: "10px 10px 10px 10px"
    }
  },
  selectMonth: {
    margin: "20px 10px 0px 0px",
    minWidth: "80px",
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
  },
  placeholderDate: {
    color: "#777",
    fontSize: '14px',
    marginTop:"12px",
  }
});

function EducationSection(props) {
  const classes = useStyles();
  const [fetchedData, setFetchedData] = useState('');
  const [universityFields, setUniversityFields] = useState(null);
  const [schoolFields, setSchoolFields] = useState(null);
  const [university, setUniversity] = useState({university: null, degree: null,fieldOfStudy: null, GPA: null, startYear: null, startMonth: null, endYear: null, endMonth: null, societiesAndActivities: null});
  const [school, setSchool] = useState({school: null, startYear: null, startMonth: null, endYear: null, endMonth: null, description: null});
  const [level, setLevel] = useState(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [alertShow, setAlertShow] = React.useState(false);
  const [alertData, setAlertData] = React.useState({ severity: "", msg: "" });
  let i=0;
  let j=0;
  let eduCount=0;
  let loginId;
  const jwt = require("jsonwebtoken");
  const token = sessionStorage.getItem("userToken");
  const header = jwt.decode(token, { complete: true });
  if(token === null){
    loginId=props.jobseekerID;
  }else if (header.payload.userRole === "jobseeker") {
    loginId=sessionStorage.getItem("loginId");
  } else {
    loginId=props.jobseekerID;
  }

  //generate year list
  function getYearsFrom(){
    let maxOffset = 25;
    let thisYear = (new Date()).getFullYear();
    let allYears = [];
    for(let x = 0; x <= maxOffset; x++) {
        allYears.push(thisYear - x)
    }

    return allYears.map((x) => (<option value={x}>{x}</option>));
  }

  //generate month list
  function getMonthsFrom(){
    let maxOffset = 12;
    let allMonths = [];
    for(let x = 1; x <= maxOffset; x++) {
      if(x<10){
        allMonths.push("0"+x);
      }else{
        allMonths.push(x);
      }        
    }

    return allMonths.map((x) => (<option value={x}>{x}</option>));
  }

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

  // Alert stuff
  const displayAlert = () => {
    return (
      <SnackBarAlert
        open={alertShow}
        onClose={handleAlertClose}
        severity={alertData.severity}
        msg={alertData.msg}
      />
    );
  };

  const handleAlert = () => {
    setAlertShow(true);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertShow(false);
  };

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
    e.preventDefault();
    setUniversity(prevState => {
      return {...prevState, GPA: e.target.value}
    })
  }

  function onChangestartYear(e){
    setUniversity(prevState => {
      return {...prevState, startYear: e.target.value}
    })
  }

  function onChangestartMonth(e){
    setUniversity(prevState => {
      return {...prevState, startMonth: e.target.value}
    })
  }

  function onChangeEndYear(e){
    setUniversity(prevState => {
      return {...prevState, endYear: e.target.value}
    })
  }

  function onChangeEndMonth(e){
    setUniversity(prevState => {
      return {...prevState, endMonth: e.target.value}
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

  function onChangeSchoolstartYear(e){
    setSchool(prevState => {
      return {...prevState, startYear: e.target.value}
    })
  }

  function onChangeSchoolstartMonth(e){
    setSchool(prevState => {
      return {...prevState, startMonth: e.target.value}
    })
  }

  function onChangeSchoolEndYear(e){
    setSchool(prevState => {
      return {...prevState, endYear: e.target.value}
    })
  }

  function onChangeSchoolEndMonth(e){
    setSchool(prevState => {
      return {...prevState, endMonth: e.target.value}
    })
  }

  function onChangeDescription(e){
    setSchool(prevState => {
      return {...prevState, description: e.target.value}
    })
  }

  function fetchData(){
    let uniData,schoolData;
    axios.get(`${BACKEND_URL}/jobseeker/${loginId}`)
    .then(res => {
      if(res.data.success){
        if(res.data.jobseeker.university.length > 0){
          uniData = res.data.jobseeker.university;
          if(Object.keys(uniData[0]).length === 0){
            uniData.splice(0,1)
            i++;
          }else if(uniData[0].university === "" && uniData[0].degree === "" && uniData[0].fieldOfStudy === "" && uniData[0].startDate === "" && uniData[0].endDate === ""){
            uniData.splice(0,1)
            i++;
          }
        }
        if(res.data.jobseeker.school.length > 0){
          schoolData = res.data.jobseeker.school;
          if(Object.keys(schoolData[0]).length === 0){
            schoolData.splice(0,1)
            j++;
          }else if(schoolData[0].school === ""){
            schoolData.splice(0,1)
            i++;
          }
        }
        setUniversityFields(uniData)
        setSchoolFields(schoolData)
        console.log("data fetched");
      }
    })
    setFetchedData(0)
  }

  function onSubmitUniversity(e){
    e.preventDefault();
    const uni = {
      university: university.university,
      degree: university.degree,
      fieldOfStudy: university.fieldOfStudy,
      GPA: university.GPA,
      startDate: university.startMonth+"/"+university.startYear,
      endDate: university.endMonth+"/"+university.endYear,
      societiesAndActivities: university.societiesAndActivities
    }

    axios.put(`${BACKEND_URL}/jobseeker/addUniversity/${loginId}`,uni)
    .then(res => {
      if(res.data.success){
        setAlertData({
          severity: "success",
          msg: "University added successfully!",
        });
        handleAlert();
      } else {
        setAlertData({
          severity: "error",
          msg: "University could not be added!",
        });
        handleAlert();
      }
    });
    setFetchedData(1);
    handleClose();
  }

  function onSubmitSchool(e){
    e.preventDefault();
    const sch = {
      school: school.school,
      startDate: school.startMonth+"/"+school.startYear,
      endDate: school.endMonth+"/"+school.endYear,
      description: school.description
    }

    axios.put(`${BACKEND_URL}/jobseeker/addSchool/${loginId}`,sch)
    .then(res => {
      if(res.data.success){
        setAlertData({
          severity: "success",
          msg: "School added successfully!",
        });
        handleAlert();
      } else {
        setAlertData({
          severity: "error",
          msg: "School could not be added!",
        });
        handleAlert();
      }
    });
    setFetchedData(1);
    handleClose();
  }

  useEffect(()=>{
    setUniversity({
      university: null,
      degree: null,
      fieldOfStudy: null,
      GPA: null,
      startYear: null,
      startMonth: null,
      endYear: null,
      endMonth: null,
      societiesAndActivities: null
    })
    setSchool({
      school: null,
      startYear: null,
      startMonth: null,
      endYear: null,
      endMonth: null,
      description: null
    })
    setUniversityFields(null);
    setSchoolFields(null);
    fetchData()
  },[fetchedData])

  function deleteUniversity(index){
    universityFields.splice(index,1);
    console.log(universityFields)
    axios.put(`${BACKEND_URL}/jobseeker/removeUniversity/${loginId}`,universityFields)
    .then(res => {
      if(res.data.success){
        setAlertData({
          severity: "success",
          msg: "University deleted successfully!",
        });
        handleAlert();
      } else {
        setAlertData({
          severity: "error",
          msg: "University could not be deleted!",
        });
        handleAlert();
      }
    });
    handleClose();
    setFetchedData(1)  
  }

  function deleteSchool(index){
    schoolFields.splice(index,1);
    console.log(schoolFields)
    axios.put(`${BACKEND_URL}/jobseeker/removeSchool/${loginId}`,schoolFields)
    .then(res => {
      if(res.data.success){
        setAlertData({
          severity: "success",
          msg: "School deleted successfully!",
        });
        handleAlert();
      } else {
        setAlertData({
          severity: "error",
          msg: "School could not be deleted!",
        });
        handleAlert();
      }
    });
    handleClose();
    setFetchedData(1)  
  }


  const displayUniFields = () => {
    if (universityFields) {
      if (universityFields.length > 0) {
        eduCount=1;
        return universityFields.map(edu => (
              <EduItem index={i++} level="University" startDate={edu.startDate} endDate={edu.endDate} university={edu.university} degree={edu.degree} fieldOfStudy={edu.fieldOfStudy} gpa={edu.GPA} societiesAndActivities={edu.societiesAndActivities}  parentFunction={deleteUniversity} />
              ))
      }
    }
  }

  const displaySchoolFields = () => {
    if (schoolFields) {
      if (schoolFields.length > 0) {
        eduCount=1;
        return schoolFields.map(edu => (
              <EduItem index={j++} level="School" startDate={edu.startDate} endDate={edu.endDate} school={edu.school} description={edu.description}  parentFunction={deleteSchool} />
              ))
      }
    }
    if(eduCount === 0){
      return (<Typography variant="body2" color="textSecondary" component="p">Education details not added.</Typography>)
    }
  }

  useEffect(()=>{
    if (level === "University") {
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
          required
        />
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel className={classes.placeholder} htmlFor="outlined-age-native-simple">Select Degree</InputLabel>
        <Select
          native
          onChange={onChangeDegree}
          label="Select Degree"
          className={classes.select}
          required
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
          required
        />
        <TextField
        className={classes.field}
          type="number"
          id="outlined-basic"
          pattern="^(\d+)(,\d{1,2}|.\d{1,2})?$"
          onKeyDown={(event) => event.keyCode === 69 ? event.preventDefault() : true}
          label="GPA" 
          variant="outlined"
          size="small"
          onChange={onChangeGPA}
          style={{width:'30%'}}
        />
        <Grid container direction="row">
          <Grid item container sm={12} md={6} style={{paddingRight: "15px"}}>
            <Grid item xs={12}>
              <Typography variant="body2" component="p" style={{color: "#777",fontSize: '16px',marginBottom:"-10px"}}>Start Date</Typography>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel className={classes.placeholderDate} htmlFor="outlined-age-native-simple">YYYY</InputLabel>
                <Select
                  native
                  onChange={onChangestartYear}
                  label="Start Date"
                  className={classes.selectYear}
                >
                  <option aria-label="None" value="" />
                  {getYearsFrom()}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel className={classes.placeholderDate} htmlFor="outlined-age-native-simple">MM</InputLabel>
                <Select
                  native
                  onChange={onChangestartMonth}
                  label="Start Date"
                  className={classes.selectMonth}
                >
                  <option aria-label="None" value="" />
                  {getMonthsFrom()}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item container sm={12} md={6} style={{paddingRight: "15px"}}>
            <Grid item xs={12}>
              <Typography variant="body2" component="p" style={{color: "#777",fontSize: '16px',marginBottom:"-10px"}}>End Date</Typography>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel className={classes.placeholderDate} htmlFor="outlined-age-native-simple">YYYY</InputLabel>
                <Select
                  native
                  onChange={onChangeEndYear}
                  label="End Date"
                  className={classes.selectYear}
                >
                  <option aria-label="None" value="" />
                  {getYearsFrom()}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel className={classes.placeholderDate} htmlFor="outlined-age-native-simple">MM</InputLabel>
                <Select
                  native
                  onChange={onChangeEndMonth}
                  label="Start Date"
                  className={classes.selectMonth}
                >
                  <option aria-label="None" value="" />
                  {getMonthsFrom()}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
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
    }else if(level==="School"){
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
          required
        />
        <Grid container direction="row">
          <Grid item container sm={12} md={6} style={{paddingRight: "15px"}}>
            <Grid item xs={12}>
              <Typography variant="body2" component="p" style={{color: "#777",fontSize: '16px',marginBottom:"-10px"}}>Start Date</Typography>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel className={classes.placeholderDate} htmlFor="outlined-age-native-simple">YYYY</InputLabel>
                <Select
                  native
                  onChange={onChangeSchoolstartYear}
                  label="Start Date"
                  className={classes.selectYear}
                >
                  <option aria-label="None" value="" />
                  {getYearsFrom()}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel className={classes.placeholderDate} htmlFor="outlined-age-native-simple">MM</InputLabel>
                <Select
                  native
                  onChange={onChangeSchoolstartMonth}
                  label="Start Date"
                  className={classes.selectMonth}
                >
                  <option aria-label="None" value="" />
                  {getMonthsFrom()}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item container sm={12} md={6} style={{paddingRight: "15px"}}>
            <Grid item xs={12}>
              <Typography variant="body2" component="p" style={{color: "#777",fontSize: '16px',marginBottom:"-10px"}}>End Date</Typography>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel className={classes.placeholderDate} htmlFor="outlined-age-native-simple">YYYY</InputLabel>
                <Select
                  native
                  onChange={onChangeSchoolEndYear}
                  label="End Date"
                  className={classes.selectYear}
                >
                  <option aria-label="None" value="" />
                  {getYearsFrom()}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel className={classes.placeholderDate} htmlFor="outlined-age-native-simple">MM</InputLabel>
                <Select
                  native
                  onChange={onChangeSchoolEndMonth}
                  label="Start Date"
                  className={classes.selectMonth}
                >
                  <option aria-label="None" value="" />
                  {getMonthsFrom()}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
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
    <>
    {displayAlert()}
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
      <Grid container>
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
    </>
  );
}

export default EducationSection
