import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FloatCard from '../../components/FloatCard';
import theme from '../../Theme';
import WorkIcon from '@material-ui/icons/Work';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import WorkExpItem from './WorkExpItem';
import BACKEND_URL from '../../Config';
import Fade from '@material-ui/core/Fade';
import Divider from '@material-ui/core/Divider';
import CloseIcon from '@material-ui/icons/Close';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
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

function WorkExperience(props) {
  const classes = useStyles();
  const [fetchedData, setFetchedData] = useState('');
  const [open, setOpen] = useState(false);
  const [work, setWork] = useState([]);
  const [state, setState] = useState({place: null, description: null, position: null, startYear: null, startMonth: null, endYear: null, endMonth: null, taskAndResponsibility: null});

  const [alertShow, setAlertShow] = React.useState(false);
  const [alertData, setAlertData] = React.useState({ severity: "", msg: "" });
  let i=0;
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

  function fetchData(){
    let workData;
    axios.get(`${BACKEND_URL}/jobseeker/${loginId}`)
    .then(res => {
      if(res.data.success){
        if(res.data.jobseeker.work.length > 0){
          workData = res.data.jobseeker.work;
          if(Object.keys(workData[0]).length === 0){
            workData.splice(0,1)
            i++;
          }else if(workData[0].place == "" && workData[0].description == "" && workData[0].position == "" && workData[0].from == "" && workData[0].to == "" && workData[0].taskAndResponsibility == ""){
            workData.splice(0,1)
            i++;
          }
        }
        setWork(workData)
        console.log(work);
      }
    })
    setFetchedData(0)
  }

  function deleteData(index){
    work.splice(index,1)
    axios.put(`${BACKEND_URL}/jobseeker/removeWork/${loginId}`,work)
    .then(res => {
      if(res.data.success){
        setAlertData({
          severity: "success",
          msg: "Work deleted successfully!",
        });
        handleAlert();
      } else {
        setAlertData({
          severity: "error",
          msg: "Work could not be deleted!",
        });
        handleAlert();
      }
    });
    handleClose();
    setFetchedData(1)
  }

  useEffect(()=>{
    setState({place: null, description: null, position: null, startYear: null, startMonth: null, endYear: null, endMonth: null, taskAndResponsibility: null});
    setWork(null);
    fetchData();
  },[fetchedData])

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


  //---------------------------- text field onChange events
  function onChangePlace(e){
    setState(prevState => {
      return {...prevState, place: e.target.value}
    })
  }

  function onChangeDescription(e){
    setState(prevState => {
      return {...prevState, description: e.target.value}
    })
  }

  function onChangePosition(e){
    setState(prevState => {
      return {...prevState, position: e.target.value}
    })
  }

  
  function onChangestartYear(e){
    setState(prevState => {
      return {...prevState, startYear: e.target.value}
    })
  }

  function onChangestartMonth(e){
    setState(prevState => {
      return {...prevState, startMonth: e.target.value}
    })
  }

  function onChangeEndYear(e){
    setState(prevState => {
      return {...prevState, endYear: e.target.value}
    })
  }

  function onChangeEndMonth(e){
    setState(prevState => {
      return {...prevState, endMonth: e.target.value}
    })
  }

  function onChangeTask(e){
    setState(prevState => {
      return {...prevState, taskAndResponsibility: e.target.value}
    })
  }

  function onSubmit(e){
    e.preventDefault();
    const newWork = {
        place: state.place,
        description: state.description,
        position: state.position,
        from: state.startMonth+"/"+state.startYear,
        to: state.endMonth+"/"+state.endYear,
        taskAndResponsibility: state.taskAndResponsibility,
    }
    console.log("my work"+newWork);

    axios.put(`${BACKEND_URL}/jobseeker/addWork/${loginId}`,newWork)
    .then(res => {
      if(res.data.success){
        setAlertData({
          severity: "success",
          msg: "Work added successfully!",
        });
        handleAlert();
      } else {
        setAlertData({
          severity: "error",
          msg: "Work could not be added!",
        });
        handleAlert();
      }
    });
    setFetchedData(1);
    handleClose();
  }

  const displayWork = () => {
    if (work) {
      if (work.length > 0) {
      return work.map(wk => (
            <WorkExpItem index={i++} place={wk.place} description={wk.description} position={wk.position} from={wk.from} to={wk.to} task={wk.taskAndResponsibility} parentFunction={deleteData} />
            ))
      }else{
        return (<Typography variant="body2" color="textSecondary" component="p">Work experience details not added.</Typography>)
      }
    }else{
      return (<Typography variant="body2" color="textSecondary" component="p">Work experience details not added.</Typography>)
    }
  }

  return (
    <>
    {displayAlert()}
    <FloatCard>
      <Grid container spacing={3}>
        <Grid item xs style={{ textAlign: 'left',}}>
            <Typography gutterBottom variant="h5" style={{color: theme.palette.tuftsBlue,padding:'10px',fontWeight:'bold'}}>
                <WorkIcon style={{color: theme.palette.turfsBlue,marginRight: '10px',marginBottom:'-5px',fontSize:'27'}}/>
                Work Experience
            </Typography>
        </Grid>
        <Grid item style={{ textAlign: 'right' }}>
            <Button className={classes.defaultButton} style={{ float: 'right',marginRight: '0px',backgroundColor:'white'}}>
                <AddIcon style={{color: theme.palette.tuftsBlue,}} className={classes.editIcon} onClick={handleOpen} />
            </Button>
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
                      Add Work Experience
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
                    label="Position"
                    type="text"
                    variant="outlined"
                    size="small"
                    onChange={onChangePosition}
                    required
                  />
                  <TextField
                  className={classes.field}
                    id="outlined-basic"
                    label="Place"
                    type="text"
                    variant="outlined"
                    size="small"
                    onChange={onChangePlace}
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
                    id="outlined-multiline-static"
                    label="Description"
                    multiline
                    rows={5}
                    variant="outlined"
                    onChange= {onChangeDescription}
                  />
                  <TextField
                    className={classes.field}
                    id="outlined-multiline-static"
                    label="Tasks & Responsibilities"
                    multiline
                    rows={5}
                    variant="outlined"
                    onChange= {onChangeTask}
                  />
                  </div>
                  <Button type="submit" className={classes.defaultButton} style={{ width:'100%',marginTop:'5%'}}>Apply Changes</Button>
              </form>
              
            </div>
          </Fade>
        </Modal>
        
      </Grid>
      <Grid container spacing={3}>
            <Grid item xs={12}>
              {displayWork()}
                {/* <WorkExpItem startYear="2019" endYear="2022" role="Intern Software Engineer" companyName="Company XYZ" description="This is a brief description on what work you have done and what responsibilities were given to you." />
                <WorkExpItem startYear="2019" endYear="2022" role="Volunteer" companyName="Programme Name" description="This is a brief description on what work you have done and what responsibilities were given to you." /> */}
            </Grid>
        </Grid>
    </FloatCard>
    </>
  );
}

export default WorkExperience
