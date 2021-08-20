import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import theme from '../../Theme';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import BACKEND_URL from '../../Config';
import Fade from '@material-ui/core/Fade';
import Divider from '@material-ui/core/Divider';
import CloseIcon from '@material-ui/icons/Close';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SnackBarAlert from "../../components/SnackBarAlert";

const useStyles = makeStyles((theme) => ({
    paperCont: {
        backgroundColor: 'MintCream',
        padding: "15px 5px 20px 5px",
        marginBottom: 10,
        borderRadius: 10,
        "&:hover": {
            defaultButton: {
                display: 'block'
            }
          }
      },
      defaultButton: {
        backgroundColor: theme.palette.stateBlue,
        color: theme.palette.white,
        "&:hover": {
          backgroundColor: '#0088cc',
          color: 'white',
        }
      },
      editButton: {
        backgroundColor: "MintCream",
        "&:hover": {
          backgroundColor: "MintCream",
        }
      },
      editIcon: {
        padding:'0px',
        margin:'-15px',
        color: theme.palette.tuftsBlue,
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
        margin: "25px 0px 20px 0px",
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
}));


function EduItem(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [styleEdit, setStyleEdit] = useState({display: 'none'});
  let startDate=[0,0];
  let endDate=[0,0];
  if(props.startDate !== 'null/null' && props.startDate !== '0/0' ){
    startDate = props.startDate.split("/");
  }
  if(props.endDate !== 'null/null' && props.endDate !== '0/0' ){
    endDate = props.endDate.split("/");
  }
  const [education, setEducation] = useState({institute: props.institute, type: props.type, fieldOfStudy: props.fieldOfStudy, GPA: props.gpa, startYear: startDate[1], startMonth: startDate[0], endYear: endDate[1], endMonth: endDate[0], societiesAndActivities: props.societiesAndActivities});

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [alertData, setAlertData] = useState({severity: "", msg: ""});
  const [loading, setLoading] = useState(true);
  const [alertShow, setAlertShow] = React.useState(false);
  
  const [form, setForm] = useState(null);
  const [GPAError, setGPAError] = useState(null);

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

  useEffect(() => {
    if (deleteSuccess === true) {
        setAlertData({severity: "success", msg: "Item deleted successfully!"});
        handleAlert();
    }
    setLoading(true);
    setDeleteSuccess(false);
  }, [deleteSuccess]);

  const handleDelete = () => {
    props.parentFunction(props.index)
  }

  const handleClickOpen = () => {
    setConfirmDelete(true);
  };

  const handleClickClose = () => {
    setConfirmDelete(false);
  };

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
    setEducation(prevState => {
      return {...prevState, GPA: e.target.value}
    })
    validateGPA(e);
  }

  function validateGPA(e){
    const error = <span style={{color:"red",paddingTop:"-30px",fontSize:"13px"}}>GPA can only contain numbers upto 2 decimal places</span>;
    var regexp = /^[0-4](\.\d{1,2})?$/;
    if(e.target.value !== ""){
      if(!regexp.test(e.target.value)){
        setGPAError(error);
      }else{
        setGPAError(null);
      }
    }else{
      setGPAError(null);
    }
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
  //----------------------------------

  function onSubmit(e){
    // console.log("update function");
    // e.preventDefault();
    // const uni = {
    //     university: university.university,
    //     degree: university.degree,
    //     fieldOfStudy: university.fieldOfStudy,
    //     GPA: university.GPA,
    //     startDate: university.startMonth+"/"+university.startYear,
    //     endDate: university.endMonth+"/"+university.endYear,
    //     societiesAndActivities: university.societiesAndActivities
    // }

    // axios.put(`${BACKEND_URL}/jobseeker/updateUniversity/${loginId}`,{index:props.index,university:uni})
    // .then(res => {
    //   if(res.data.success){
    //     setAlertData({
    //       severity: "success",
    //       msg: "University updated successfully!",
    //     });
    //     handleAlert();
    //   } else {
    //     setAlertData({
    //       severity: "error",
    //       msg: "University could not be updated!",
    //     });
    //     handleAlert();
    //   }
    // });
    // handleClose();
    e.preventDefault();
    let edu;
    if(education.type === "Bachelor's" || education.type === "Bachelor's Honours"){
      if(GPAError !== null){
        return;
      }
      edu = {
        institute: education.institute,
        type: education.type,
        fieldOfStudy: education.fieldOfStudy,
        GPA: education.GPA,
        startDate: education.startMonth+"/"+education.startYear,
        endDate: education.endMonth+"/"+education.endYear,
        societiesAndActivities: education.societiesAndActivities
      }
    }else if(education.type === "Diploma" || education.type === "Graduate Diploma" || education.type === "Masters" || education.type === "M.Phil." || education.type === "PhD"){
      edu = {
        institute: education.institute,
        type: education.type,
        fieldOfStudy: education.fieldOfStudy,
        startDate: education.startMonth+"/"+education.startYear,
        endDate: education.endMonth+"/"+education.endYear
      }
    }else if(education.type === "School"){
      edu = {
        institute: education.institute,
        type: education.type,
        startDate: education.startMonth+"/"+education.startYear,
        endDate: education.endMonth+"/"+education.endYear,
        societiesAndActivities: education.societiesAndActivities
      }
    }

    axios.put(`${BACKEND_URL}/jobseeker/updateEducation/${loginId}`,{index:props.index,education:edu})
    .then(res => {
      if(res.data.success){
        setAlertData({
          severity: "success",
          msg: "Education details updated successfully!",
        });
        handleAlert();
      } else {
        setAlertData({
          severity: "error",
          msg: "Education details could not be updated!",
        });
        handleAlert();
      }
    });
    handleClose();
  }
  

  useEffect(()=>{
    setForm(null);
    if(props.type === "Bachelor's" || props.type === "Bachelor's Honours"){
      let temp =
      <>
        <TextField
        className={classes.field}
          id="outlined-basic"
          label="Field of Study"
          type="text"
          variant="outlined"
          size="small"
          value={education.fieldOfStudy}
          onChange={onChangeFieldOfStudy}
          required
        />
        <TextField
        className={classes.field}
          type="text"
          id="outlined-basic"
          label="GPA" 
          variant="outlined"
          size="small"
          value={education.GPA}
          onChange={onChangeGPA}
          style={{width:'30%'}}
        />
        <div style={{marginTop:"-15px",paddingBottom:"20px"}}>
        {GPAError}
        </div>

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
                  value={education.startYear}
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
                  value={education.startMonth}
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
                  value={education.endYear}
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
                  value={education.endMonth}
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
          value={education.societiesAndActivities}
          onChange={onChangeSocietiesAndActivities}
        />
        </>;
      setForm(temp);
      // -----------------------------------School fields ---------------------------------
    }else if(education.type === "Diploma" || education.type === "Graduate Diploma" || education.type === "Masters" || education.type === "M.Phil." || education.type === "PhD"){
      let temp =
      <>
        <TextField
          className={classes.field}
          id="outlined-basic"
          label="Field of Study"
          type="text"
          variant="outlined"
          size="small"
          value={education.fieldOfStudy}
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
                  value={education.startYear}
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
                  value={education.startMonth}
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
                  value={education.endYear}
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
                  value={education.endMonth}
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
    }else if(props.type === "School"){
        let temp =
        <>
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
                    value={education.startYear}
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
                    value={education.startMonth}
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
                    value={education.endYear}
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
                    value={education.endMonth}
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
            value={education.societiesAndActivities}
            onChange={onChangeSocietiesAndActivities}
          />
          </>;
        setForm(temp);
    }
  },[open,education])

  const filterFields = () => {
    if(props.type === "Bachelor's" || props.type === "Bachelor's Honours"){
        return (
            <React.Fragment>
                <Grid item xs={3} style={{marginLeft:"-10px"}}>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {education.endMonth === 0 ? "" : (education.endMonth+"/"+education.endYear)}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {education.endMonth === 0 ? "" : "|" }
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {education.startMonth === 0 ? "" : (education.startMonth+"/"+education.startYear)}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" style={{fontStyle:"italic",fontWeight:"bolder"}}>
                        {education.type}
                    </Typography>
                </Grid>
                <Grid item xs={7} spacing={2}>
                    <Typography gutterBottom style={{color: theme.palette.stateBlue,textAlign:'left',fontSize:'15px',fontWeight:'bold',marginRight:"-45px"}}>
                        {education.institute}
                    </Typography>
                    <Typography gutterBottom style={{color: theme.palette.stateBlue,textAlign:'left',fontSize:'15px',}}>
                    {(education.fieldOfStudy ? "Field of Study : " + education.fieldOfStudy : "")}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" style={{textAlign:'left',}}>
                        {education.GPA ? "GPA : " + education.GPA : ""}
                    </Typography>
                    <Typography variant="body2" component="p" style={{textAlign:'left',color: '#666',marginTop:'15px'}}>
                        <b>{education.societiesAndActivities ? "Societies & activities : " : ""}</b>{education.societiesAndActivities}
                    </Typography>
                </Grid>
            </React.Fragment>
        );
    }else if(props.type === "Diploma" || props.type === "Graduate Diploma" || props.type === "Masters" || props.type === "M.Phil." || props.type === "PhD"){
        return (
            <React.Fragment>
                <Grid item xs={3} style={{marginLeft:"-10px"}}>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {education.endMonth === 0 ? "" : (education.endMonth+"/"+education.endYear)}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {education.endMonth === 0 ? "" : "|" }
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {education.startMonth === 0 ? "" : (education.startMonth+"/"+education.startYear)}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" style={{fontStyle:"italic",fontWeight:"bolder"}}>
                        {education.type}
                    </Typography>
                </Grid>
                <Grid item xs={7} spacing={2}>
                    <Typography gutterBottom style={{color: theme.palette.stateBlue,textAlign:'left',fontSize:'15px',fontWeight:'bold',marginRight:"-45px"}}>
                        {education.institute}
                    </Typography>
                    <Typography gutterBottom style={{color: theme.palette.stateBlue,textAlign:'left',fontSize:'15px',}}>
                    {(education.fieldOfStudy ? "Field of Study : " + education.fieldOfStudy : "")}
                    </Typography>
                </Grid>
            </React.Fragment>
        );
    }else if(props.type === "School"){
      return (
          <React.Fragment>
              <Grid item xs={3} style={{marginLeft:"-10px"}}>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {education.endMonth === 0 ? "" : (education.endMonth+"/"+education.endYear)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {education.endMonth === 0 ? "" : "|" }
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {education.startMonth === 0 ? "" : (education.startMonth+"/"+education.startYear)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p" style={{fontStyle:"italic",fontWeight:"bolder"}}>
                      {education.type}
                  </Typography>
              </Grid>
              <Grid item xs={7} spacing={2}>
                  <Typography gutterBottom style={{color: theme.palette.stateBlue,textAlign:'left',fontSize:'15px',fontWeight:'bold',marginRight:"-45px"}}>
                      {education.institute}
                  </Typography>
                  <Typography variant="body2" component="p" style={{textAlign:'left',color: '#666',marginTop:'15px'}}>
                      <b>{education.societiesAndActivities ? "Societies & activities : " : ""}</b>{education.societiesAndActivities}
                  </Typography>
              </Grid>
          </React.Fragment>
      );
  }
  }

  return (
    <>
    {displayAlert()}
      <Paper elevation={0} className={classes.paperCont}
      onMouseEnter={e => {
          setStyleEdit({display: 'block'});
      }}
      onMouseLeave={e => {
          setStyleEdit({display: 'none'});
    }}>
       <Grid container style={{paddingTop:"10px"}}>      
        {filterFields()}
        <Grid item xs={2} spacing={2} style={{marginTop:"-20px"}}>
        { login ? <>
          <Button className={classes.editButton} style={{minWidth:'25px',width:'25px',marginRight:"5px"}}>
              <EditIcon style={styleEdit} className={classes.editIcon} size="small" onClick={handleOpen} />
          </Button>
          <Button className={classes.editButton} style={{minWidth:'25px',width:'25px',marginRight:"-45px"}}>
              <DeleteIcon style={styleEdit} className={classes.editIcon} size="small"  onClick={handleClickOpen} />
          </Button>
          </> : null }
          <Dialog
              open={confirmDelete}
              onClose={handleClickClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
          >
              <DialogTitle id="alert-dialog-title">{"Confirm Delete?"}</DialogTitle>
              <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                      Are you sure that you want to delete the selected item? This cannot be undone.
                  </DialogContentText>
              </DialogContent>
              <DialogActions>
                  <Button onClick={handleClickClose} color="primary">
                      No
                  </Button>
                  <Button onClick={handleDelete}
                    color="primary" autoFocus>
                      Yes
                  </Button>
              </DialogActions>
          </Dialog>
            {/*-------------- update award field popup content ------------------- */}
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
                      Edit Education Details
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
              <form className={classes.form} onSubmit={onSubmit}>
                <div>
                  <TextField
                    className={classes.field}
                    id="outlined-basic"
                    label="University/School/Institute"
                    type="text"
                    variant="outlined"
                    size="small"
                    value={education.institute}
                    onChange={onChangeInstitute}
                    required
                  />
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel className={classes.placeholder} htmlFor="outlined-age-native-simple">Select Type</InputLabel>
                    <Select
                      native
                      value={education.type}
                      onChange={onChangeType}
                      label="Select Type"
                      className={classes.select}
                      required
                      disabled
                    >
                      <option value="School">School</option>
                      <option value="Diploma">Diploma</option>
                      <option value="Graduate Diploma">Graduate Diploma</option>
                      <option value="Bachelor's">Bachelor's</option>
                      <option value="Bachelor's Honours">Bachelor's Honours</option>
                      <option value="Masters">Masters</option>
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
        </Grid>
       </Grid>
      </Paper>
      </>
  );
}

export default EduItem
