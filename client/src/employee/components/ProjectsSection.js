import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import LaptopChromebookIcon from '@material-ui/icons/LaptopChromebook';
import Timeline from '@material-ui/lab/Timeline';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'react-vertical-timeline-component/style.min.css';
import FloatCard from '../../components/FloatCard';
import SnackBarAlert from "../../components/SnackBarAlert";
import BACKEND_URL from '../../Config';
import theme from '../../Theme';
import ProjectItem from './ProjectItem';

const useStyles = makeStyles({
  defaultButton: {
    backgroundColor: theme.palette.stateBlue,
    color: theme.palette.white,
    "&:hover": {
      backgroundColor: theme.palette.stateBlueHover,
      color: 'white',
    }
  },
  paper: {
    padding: '6px 16px',
    backgroundColor: '#D5F0F5',
    boxShadow: "0px 0px 0px 0px",
    borderRadius: 15,
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
  paperCont: {
    backgroundColor: 'MintCream',
    marginBottom: 25,
    borderRadius: 10,
    width:"100%",
    "&:hover": {
        defaultButton: {
            display: 'block'
        }
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
  form: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: '20px',
    paddingRight: '20px'
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
  },
  paperModal: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    width: '600px',
    borderRadius: 10,
    paddingBottom: "30px"
  },
});

function ProjectsSection(props) {
  const classes = useStyles();
  const [fetchedData, setFetchedData] = useState('');
  const [open, setOpen] = useState(false);
  const [project, setProject] = useState(null);
  const [state, setState] = useState({name: null, link: null, description: null, startYear: null, startMonth: null, endYear: null, endMonth: null, usedTech: null});

  const [alertShow, setAlertShow] = React.useState(false);
  const [alertData, setAlertData] = React.useState({ severity: "", msg: "" });
  let i=0;
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

  function fetchData(){
    let projectData;
    axios.get(`${BACKEND_URL}/jobseeker/${loginId}`)
    .then(res => {
      if(res.data.success){
        if(res.data.jobseeker.project.length > 0){
          projectData = res.data.jobseeker.project;
          if(Object.keys(res.data.jobseeker.project[0]).length === 0){
            res.data.jobseeker.project.splice(0,1)
            i++;
          }else if(projectData[0].name === "" && projectData[0].link === "" && projectData[0].description === "" && projectData[0].from === "" && projectData[0].to === ""){
            res.data.jobseeker.project.splice(0,1)
            i++;
          }
        }       
        setProject(projectData)
      }
    })
    setFetchedData(0)
  }

  function deleteData(index){
    project.splice(index,1)
    axios.put(`${BACKEND_URL}/jobseeker/removeProject/${loginId}`,project)
    .then(res => {
      if(res.data.success){
        setAlertData({
          severity: "success",
          msg: "Project deleted successfully!",
        });
        handleAlert();
      } else {
        setAlertData({
          severity: "error",
          msg: "Project could not be deleted!",
        });
        handleAlert();
      }
    });
    handleClose();
    setFetchedData(1)
  }

  useEffect(()=>{
    setState({name: null, link: null, description: null, startYear: null, startMonth: null, endYear: null, endMonth: null, usedTech: null});
    setProject(null);
    fetchData();
  },[fetchedData])

  function handleOpen(){
    setOpen(true);
  }

  function handleClose(){
    setOpen(false);
    setState({name: null, link: null, description: null, startYear: null, startMonth: null, endYear: null, endMonth: null, usedTech: null});
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
  function onChangeName(e){
    setState(prevState => {
      return {...prevState, name: e.target.value}
    })
  }

  function onChangeLink(e){
    setState(prevState => {
      return {...prevState, link: e.target.value}
    })
  }

  function onChangeDescription(e){
    setState(prevState => {
      return {...prevState, description: e.target.value}
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

  function onChangeUsedTech(e){
    setState(prevState => {
      return {...prevState, usedTech: e.target.value}
    })
  }

  function onSubmit(e){
    e.preventDefault();
    const newProject = {
        name: state.name,
        link: state.link,
        description: state.description,
        from: state.startMonth+"/"+state.startYear,
        to: state.endMonth+"/"+state.endYear,
        usedTech: state.usedTech
    }

    axios.put(`${BACKEND_URL}/jobseeker/addProject/${loginId}`,newProject)
    .then(res => {
      if(res.data.success){
        setAlertData({
          severity: "success",
          msg: "Project added successfully!",
        });
        handleAlert();
      } else {
        setAlertData({
          severity: "error",
          msg: "Project could not be added!",
        });
        handleAlert();
      }
    });
    setFetchedData(1);
    handleClose();
  }
  
  const displayProjectFields = () => {
    if (project) {
      if (project.length > 0) {
      return project.map(pro => (
            <ProjectItem index={i++} name={pro.name} link={pro.link} description={pro.description} from={pro.from} to={pro.to} usedTech={pro.usedTech} parentFunction={deleteData} />
            ))
      }else{
        return (<Typography variant="body2" color="textSecondary" component="p">Project details not added.</Typography>)
      }
    }else{
      return (<Typography variant="body2" color="textSecondary" component="p">Project details not added.</Typography>)
    }
  }


  return (
    <>
    {displayAlert()}
    <FloatCard>
      <Grid container spacing={3}>
        <Grid item xs style={{ textAlign: 'left',}}>
            <Typography gutterBottom variant="h5" style={{color: theme.palette.tuftsBlue,padding:'10px',fontWeight:'bold'}}>
                <LaptopChromebookIcon style={{color: theme.palette.turfsBlue,marginRight: '10px',marginBottom:'-5px',fontSize:'27'}}/>
                Projects
            </Typography>
        </Grid>
        <Grid item style={{ textAlign: 'right' }}>
        { login ? <>
            <Button className={classes.defaultButton} style={{ float: 'right',marginRight: '0px',backgroundColor:'white'}} onClick={handleOpen}>
                <AddIcon style={{color: theme.palette.tuftsBlue,}} className={classes.editIcon} />
            </Button>
            </> : null }
        </Grid>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" style={{color:theme.palette.stateBlue}}>
          Add Project
          </DialogTitle>
          <Divider variant="middle" />
          <DialogContent>
            <form className={classes.form}>
                <div>
                <TextField
                  className={classes.field}
                    id="outlined-basic"
                    label="Name"
                    type="text"
                    variant="outlined"
                    size="small"
                    onChange={onChangeName}
                    required
                  />
                  <TextField
                  className={classes.field}
                    id="outlined-basic"
                    label="Link"
                    type="text"
                    variant="outlined"
                    size="small"
                    onChange={onChangeLink}
                  />
                  <TextField
                    className={classes.field}
                    id="outlined-multiline-static"
                    label="Description"
                    multiline
                    rows={5}
                    variant="outlined"
                    onChange= {onChangeDescription}
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
                    label="Tech. Stack"
                    type="text"
                    variant="outlined"
                    size="small"
                    onChange={onChangeUsedTech}
                    required
                  />
                  </div>
              </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} style={{color:"#999"}}>
              Cancel
            </Button>
            <Button onClick={onSubmit} color="primary" autoFocus>
              Apply Changes
            </Button>
          </DialogActions>
        </Dialog>
        
      </Grid>
        <Paper elevation={0} className={classes.paperCont}>
            <Timeline align="left">
              {displayProjectFields()}
            </Timeline>
        </Paper>
    </FloatCard>
    </>
  );
}

export default ProjectsSection
