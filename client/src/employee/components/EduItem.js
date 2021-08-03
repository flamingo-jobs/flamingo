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
  const uniStartDate = props.startDate.split("/");
  const uniEndDate = props.endDate.split("/");
  const schoolStartDate = props.startDate.split("/");
  const schoolEndDate = props.endDate.split("/");
  const [university, setUniversity] = useState({university: props.university, degree: props.degree, fieldOfStudy: props.fieldOfStudy, GPA: props.gpa, startYear: uniStartDate[1], startMonth: uniStartDate[0], endYear: uniEndDate[1], endMonth: uniEndDate[0], societiesAndActivities: props.societiesAndActivities});
  const [school, setSchool] = useState({school: props.school, startYear: schoolStartDate[1], startMonth: schoolStartDate[0], endYear: schoolEndDate[1], endMonth: schoolEndDate[0], description: props.description});

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [alertData, setAlertData] = useState({severity: "", msg: ""});
  const [loading, setLoading] = useState(true);
  const [alertShow, setAlertShow] = React.useState(false);
  
  const [form, setForm] = useState(null);
  let loginId;
  const jwt = require("jsonwebtoken");
  const token = sessionStorage.getItem("userToken");
  const header = jwt.decode(token, { complete: true });
  if (header.payload.userRole === "jobseeker") {
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

  useEffect(() => {
    if (deleteSuccess == true) {
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
  //----------------------------------

  function onSubmitUni(e){
    console.log("update function");
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

    axios.put(`${BACKEND_URL}/jobseeker/updateUniversity/${loginId}`,{index:props.index,university:uni})
    .then(res => {
      if(res.data.success){
        setAlertData({
          severity: "success",
          msg: "University updated successfully!",
        });
        handleAlert();
      } else {
        setAlertData({
          severity: "error",
          msg: "University could not be updated!",
        });
        handleAlert();
      }
    });
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

    axios.put(`${BACKEND_URL}/jobseeker/updateSchool/${loginId}`,{index:props.index,school:sch})
    .then(res => {
      if(res.data.success){
        setAlertData({
          severity: "success",
          msg: "School updated successfully!",
        });
        handleAlert();
      } else {
        setAlertData({
          severity: "error",
          msg: "School could not be updated!",
        });
        handleAlert();
      }
    });
    handleClose();
  }
  

  useEffect(()=>{
    if (props.level == "University") {
      let temp = <form className={classes.form} onSubmit={onSubmitUni}>
      <div>
      <TextField
        className={classes.field}
          id="outlined-basic"
          label="University"
          type="text"
          variant="outlined"
          size="small"
          value={university.university}
          onChange={onChangeUniversity}
          style={{marginBottom: "32px"}}
        />
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel className={classes.placeholder} htmlFor="outlined-age-native-simple">Select Degree</InputLabel>
        <Select
          native
          onChange={onChangeDegree}
          label="Select Degree"
          className={classes.select}
          value={university.degree}
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
          value={university.fieldOfStudy}
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
          value={university.GPA}
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
                  value={university.startYear}
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
                  value={university.startMonth}
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
                  value={university.endYear}
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
                  value={university.endMonth}
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
          value={university.societiesAndActivities}
          onChange={onChangeSocietiesAndActivities}
        />
        </div>
        <Button type="submit" className={classes.defaultButton} style={{ width:'100%',marginTop:'5%'}}>Apply Changes</Button>
    </form>;
      setForm(temp);
    }else if(props.level=="School"){
      let temp=<form className={classes.form} onSubmit={onSubmitSchool}>
      <div>
      <TextField
        className={classes.field}
          id="outlined-basic"
          label="School"
          type="text"
          variant="outlined"
          size="small"
          value={school.school}
          onChange={onChangeSchool}
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
                  value={school.startYear}
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
                  value={school.startMonth}
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
                  value={school.endYear}
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
                  value={school.endMonth}
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
          value={school.description}
          onChange= {onChangeDescription}
        />
        </div>
        <Button type="submit" className={classes.defaultButton} style={{ width:'100%',marginTop:'5%'}}>Apply Changes</Button>
    </form>;
    setForm(temp);
    }
  },[university,school])

  const filterFields = () => {
    if(props.level == "University"){
        return (
            <React.Fragment>
                <Grid item xs={3} style={{marginLeft:"-10px"}}>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {university.endMonth+"/"+university.endYear}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        |
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {university.startMonth+"/"+university.startYear}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" style={{fontStyle:"italic",fontWeight:"bolder"}}>
                        {props.level}
                    </Typography>
                </Grid>
                <Grid item xs={7} spacing={2}>
                    <Typography gutterBottom style={{color: theme.palette.stateBlue,textAlign:'left',fontSize:'15px',fontWeight:'bold',marginRight:"-45px"}}>
                        {university.university}
                    </Typography>
                    <Typography gutterBottom style={{color: theme.palette.stateBlue,textAlign:'left',fontSize:'15px',}}>
                    {university.degree} - {university.fieldOfStudy}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" style={{textAlign:'left',}}>
                        GPA : {university.GPA}
                    </Typography>
                    <Typography variant="body2" component="p" style={{textAlign:'left',color: '#666',marginTop:'15px'}}>
                        <b>Societies & activities : </b>{university.societiesAndActivities}
                    </Typography>
                </Grid>
            </React.Fragment>
        );
    }else if(props.level == "School"){
        return (
            <React.Fragment>
                <Grid item xs={3} style={{marginLeft:"-10px"}}>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {school.endMonth+"/"+school.endYear}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        |
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {school.startMonth+"/"+school.startYear}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" style={{fontStyle:"italic",fontWeight:"bolder"}}>
                        {props.level}
                    </Typography>
                </Grid>
                <Grid item xs={7} spacing={2}>
                    <Typography gutterBottom style={{color: theme.palette.stateBlue,textAlign:'left',fontSize:'15px',fontWeight:'bold',marginRight:"-45px"}}>
                        {school.school}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" style={{textAlign:'left',marginRight:"-45px"}}>
                        {school.description}
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
          <Button style={{minWidth:'25px',width:'25px',marginRight:"5px"}}>
              <EditIcon style={styleEdit} className={classes.editIcon} size="small" onClick={handleOpen} />
          </Button>
          <Button style={{minWidth:'25px',width:'25px',marginRight:"-45px"}}>
              <DeleteIcon style={styleEdit} className={classes.editIcon} size="small"  onClick={handleClickOpen} />
          </Button>
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
                      Edit {props.level} Details
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
        </Grid>
       </Grid>
      </Paper>
      </>
  );
}

export default EduItem
