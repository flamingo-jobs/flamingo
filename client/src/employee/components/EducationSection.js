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
  const [educationFields, setEducationFields] = useState(null);
  const [education, setEducation] = useState({institute: null, type: "School", fieldOfStudy: null, GPA: null, startYear: null, startMonth: null, endYear: null, endMonth: null, societiesAndActivities: null});
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
  let login = false;
  const jwt = require("jsonwebtoken");
  const token = sessionStorage.getItem("userToken");
  const header = jwt.decode(token, { complete: true });
  if(token === null){
    loginId=props.jobseekerID;
  }else if (header.payload.userRole === "jobseeker") {
    login = true;
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

    //generate year list
    function getYearsTo(){
      let maxOffset = 30;
      let thisYear = (new Date()).getFullYear();
      let allYears = [];
      for(let x = -7; x <= maxOffset; x++) {
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

  //---------------------------- text fields onChange events
  function onChangeInstitute(e){
    setEducation(prevState => {
      return {...prevState, institute: e.target.value}
    })
  }

  function onChangeType(e){
    setEducation(prevState => {
      return {...prevState, type: e.target.value}
    })
  }

  function onChangeFieldOfStudy(e){
    setEducation(prevState => {
      return {...prevState, fieldOfStudy: e.target.value}
    })
  }

  function onChangeGPA(e){
    e.preventDefault();
    setEducation(prevState => {
      return {...prevState, GPA: e.target.value}
    })
  }

  function onChangestartYear(e){
    setEducation(prevState => {
      return {...prevState, startYear: e.target.value}
    })
  }

  function onChangestartMonth(e){
    setEducation(prevState => {
      return {...prevState, startMonth: e.target.value}
    })
  }

  function onChangeEndYear(e){
    setEducation(prevState => {
      return {...prevState, endYear: e.target.value}
    })
  }

  function onChangeEndMonth(e){
    setEducation(prevState => {
      return {...prevState, endMonth: e.target.value}
    })
  }

  function onChangeSocietiesAndActivities(e){
    setEducation(prevState => {
      return {...prevState, societiesAndActivities: e.target.value}
    })
  }


  function fetchData(){
    let eduData;
    axios.get(`${BACKEND_URL}/jobseeker/${loginId}`)
    .then(res => {
      if(res.data.success){
        if(res.data.jobseeker.education.length > 0){
          eduData = res.data.jobseeker.education;
          if(Object.keys(eduData[0]).length === 0){
            eduData.splice(0,1)
            i++;
          }else if(eduData[0].institute === "" && eduData[0].type === "" && eduData[0].fieldOfStudy === "" && eduData[0].startDate === "" && eduData[0].endDate === ""){
            eduData.splice(0,1)
            i++;
          }
        }
        setEducationFields(eduData)
        console.log("data fetched");
      }
    })
    setFetchedData(0)
  }

  function onSubmitEducation(e){
    e.preventDefault();
    let edu;
    if(education.type === "Bachelor's"){
    edu = {
      institute: education.institute,
      type: education.type,
      fieldOfStudy: education.fieldOfStudy,
      GPA: education.GPA,
      startDate: education.startMonth+"/"+education.startYear,
      endDate: education.endMonth+"/"+education.endYear,
      societiesAndActivities: education.societiesAndActivities
    }
  }else if(education.type === "Diploma" || education.type === "Graduate Diploma" || education.type === "M.Phil." || education.type === "PhD"){
    edu = {
      institute: education.institute,
      type: education.type,
      fieldOfStudy: education.fieldOfStudy,
      startDate: education.startMonth+"/"+education.startYear,
      endDate: education.endMonth+"/"+education.endYear
    }
  }else if(education.type === "School" || education.type === "College"){
    edu = {
      institute: education.institute,
      type: education.type,
      startDate: education.startMonth+"/"+education.startYear,
      endDate: education.endMonth+"/"+education.endYear,
      societiesAndActivities: education.societiesAndActivities
    }
  }

    axios.put(`${BACKEND_URL}/jobseeker/addEducation/${loginId}`,edu)
    .then(res => {
      if(res.data.success){
        setAlertData({
          severity: "success",
          msg: "Education added successfully!",
        });
        handleAlert();
      } else {
        setAlertData({
          severity: "error",
          msg: "Education could not be added!",
        });
        handleAlert();
      }
    });
    setFetchedData(1);
    handleClose();
  }


  useEffect(()=>{
    setEducation({
      institute: null,
      type: null,
      fieldOfStudy: null,
      GPA: null,
      startYear: null,
      startMonth: null,
      endYear: null,
      endMonth: null,
      societiesAndActivities: null
    })
    setEducationFields(null);
    fetchData()
  },[fetchedData])

  function deleteEducation(index){
    educationFields.splice(index,1);
    axios.put(`${BACKEND_URL}/jobseeker/removeEducation/${loginId}`,educationFields)
    .then(res => {
      if(res.data.success){
        setAlertData({
          severity: "success",
          msg: "Education details deleted successfully!",
        });
        handleAlert();
      } else {
        setAlertData({
          severity: "error",
          msg: "Education details could not be deleted!",
        });
        handleAlert();
      }
    });
    handleClose();
    setFetchedData(1)  
  }


  const displayEduFields = () => {
    if (educationFields) {
      if (educationFields.length > 0) {
        return educationFields.map(edu => (
              <EduItem index={i++} startDate={edu.startDate} endDate={edu.endDate} institute={edu.institute} type={edu.type} fieldOfStudy={edu.fieldOfStudy} gpa={edu.GPA} societiesAndActivities={edu.societiesAndActivities}  parentFunction={deleteEducation} />
              ))
      }else{
        return (<Typography variant="body2" color="textSecondary" component="p">Education details not added.</Typography>)
      }
    }else{
      return (<Typography variant="body2" color="textSecondary" component="p">Education details not added.</Typography>)
    }
  }


  useEffect(()=>{
    setForm(null);
    if(education.type === "Bachelor's"){
      let temp =
      <>
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
                  {getYearsTo()}
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
        </>;
      setForm(temp);
      // -----------------------------------School/College fields ---------------------------------
    }else if(education.type === "Diploma" || education.type === "Graduate Diploma" || education.type === "M.Phil." || education.type === "PhD"){
      let temp =
      <>
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
        <Grid container direction="row">
          <Grid item container sm={12} md={6} style={{paddingRight: "15px"}}>
            <Grid item xs={12}>
              <Typography variant="body2" component="p" style={{color: "#777",fontSize: '16px',marginBottom:"-10px",marginTop:"15px"}}>Start Date</Typography>
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
              <Typography variant="body2" component="p" style={{color: "#777",fontSize: '16px',marginBottom:"-10px",marginTop:"15px"}}>End Date</Typography>
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
                  {getYearsTo()}
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
        </>;
      setForm(temp);
  }else{
        let temp =
        <>
          <Grid container direction="row">
            <Grid item container sm={12} md={6} style={{paddingRight: "15px"}}>
              <Grid item xs={12}>
                <Typography variant="body2" component="p" style={{color: "#777",fontSize: '16px',marginBottom:"-10px",marginTop:"15px"}}>Start Date</Typography>
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
                <Typography variant="body2" component="p" style={{color: "#777",fontSize: '16px',marginBottom:"-10px",marginTop:"15px"}}>End Date</Typography>
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
                    {getYearsTo()}
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
          </>;
        setForm(temp);
    }
  },[open,education])

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
        { login ? <>
            <Button className={classes.defaultButton} style={{ float: 'right',marginRight: '0px',backgroundColor:'white'}} onClick={handleOpen}>
                <AddIcon style={{color: theme.palette.tuftsBlue,}} className={classes.editIcon} />
            </Button>
            </> : null }
        </Grid>
        
      </Grid>
      <Grid container>
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
              <form className={classes.form} onSubmit={onSubmitEducation}>
                <div>
                  <TextField
                    className={classes.field}
                    id="outlined-basic"
                    label="University/School/Institute"
                    type="text"
                    variant="outlined"
                    size="small"
                    onChange={onChangeInstitute}
                    required
                  />
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel className={classes.placeholder} htmlFor="outlined-age-native-simple">Select Type</InputLabel>
                    <Select
                      native
                      onChange={onChangeType}
                      label="Select Type"
                      className={classes.select}
                      required
                    >
                      <option value="School">School</option>
                      <option value="College">College</option>
                      <option value="Diploma">Diploma</option>
                      <option value="Graduate Diploma">Graduate Diploma</option>
                      <option value="Bachelor's">Bachelor's</option>
                      <option value="M.Phil.">M.Phil.</option>
                      <option value="PhD">PhD</option>
                    </Select>
                  </FormControl>
                  {form}
                </div>
                <Button type="submit" className={classes.defaultButton} style={{ width:'100%',marginTop:'5%'}}>Apply Changes</Button>
              </form>         
            </div>
          </Fade>
        </Modal>
    </FloatCard>
    </>
  );
}

export default EducationSection
