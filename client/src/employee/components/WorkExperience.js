import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import WorkIcon from '@material-ui/icons/Work';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FloatCard from '../../components/FloatCard';
import SnackBarAlert from "../../components/SnackBarAlert";
import BACKEND_URL from '../../Config';
import theme from '../../Theme';
import WorkExpItem from './WorkExpItem';
import Loading from "../../components/Loading";

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
  }
});

function WorkExperience(props) {
  const classes = useStyles();
  const [fetchedData, setFetchedData] = useState('');
  const [open, setOpen] = useState(false);
  const [work, setWork] = useState([]);
 // let workOrdered = null;
  const [state, setState] = useState({place: null, description: null, position: null, startYear: null, startMonth: null, endYear: null, endMonth: null, taskAndResponsibility: null});
  const [loadingData, setLoadingData] = useState(true);

  const [alertShow, setAlertShow] = React.useState(false);
  const [alertData, setAlertData] = React.useState({ severity: "", msg: "" });
  let i=0;
  let loginId=props.jobseekerID;
  let login = props.login;

  //generate year list
  function getYearsFrom(){
    let maxOffset = 25;
    let thisYear = (new Date()).getFullYear();
    let allYears = [];
    for(let x = 0; x <= maxOffset; x++) {
        allYears.push(thisYear - x)
    }

    return allYears.map((x,index) => (<option key={index} value={x}>{x}</option>));
  }

  //generate year list
  function getYearsTo(){
    let maxOffset = 30;
    let thisYear = (new Date()).getFullYear();
    let allYears = [];
    for(let x = -7; x <= maxOffset; x++) {
        allYears.push(thisYear - x)
    }

    return allYears.map((x,index) => (<option key={index} value={x}>{x}</option>));
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

    return allMonths.map((x,index) => (<option key={index} value={x}>{x}</option>));
  }

  function fetchData(){
    setLoadingData(true);
    let workData;
    axios.get(`${BACKEND_URL}/jobseeker/${loginId}`)
    .then(res => {
      if(res.data.success){
        if(res.data.jobseeker.work.length > 0){
          workData = res.data.jobseeker.work;
          if(Object.keys(workData[0]).length === 0){
            workData.splice(0,1)
            i++;
          }else if(workData[0].place === "" && workData[0].description === "" && workData[0].position === "" && workData[0].from === "" && workData[0].to === "" && workData[0].taskAndResponsibility === ""){
            workData.splice(0,1)
            i++;
          }
        }
        setWork(workData);
        setLoadingData(false);
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
        axios.get(`${BACKEND_URL}/jobs/generateJobSeekerRecommendations/${loginId}`);
      } else {
        setAlertData({
          severity: "error",
          msg: "Work could not be deleted!",
        });
        handleAlert();
      }
    });
    handleClose();
    setState({place: null, description: null, position: null, startYear: null, startMonth: null, endYear: null, endMonth: null, taskAndResponsibility: null});
    setWork(null);
    setFetchedData(1)
  }

  useEffect(()=>{
    setState({place: null, description: null, position: null, startYear: null, startMonth: null, endYear: null, endMonth: null, taskAndResponsibility: null});
    setWork(null);
    fetchData();
  },[fetchedData])

  function handleOpen(){
    setState({place: null, description: null, position: null, startYear: null, startMonth: null, endYear: null, endMonth: null, taskAndResponsibility: null});
    setOpen(true);
  }

  function handleClose(){
    setOpen(false);
    setState({place: null, description: null, position: null, startYear: null, startMonth: null, endYear: null, endMonth: null, taskAndResponsibility: null});
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
    // console.log("my work"+newWork);

    axios.put(`${BACKEND_URL}/jobseeker/addWork/${loginId}`,newWork)
    .then(res => {
      if(res.data.success){
        setAlertData({
          severity: "success",
          msg: "Work added successfully!",
        });
        handleAlert();
        axios.get(`${BACKEND_URL}/jobs/generateJobSeekerRecommendations/${loginId}`);
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
    let idx = i;
    let workTemp = [];
    work?.map(w => (
      workTemp.push({index: idx++,year: w.from.split("/")[0], month: w.from.split("/")[1], workItem: w})
    ));
    workTemp?.sort((a,b) => (a.year < b.year) ? 1 : ((b.year < a.year) ? -1 : 0));
    if(loadingData){
      return (<Loading />);
    }else if (workTemp) {
        if (workTemp.length > 0) {
        return workTemp.map((wk,j) => (
              <WorkExpItem key={j} index={wk.index} place={wk.workItem.place} description={wk.workItem.description} position={wk.workItem.position} from={wk.workItem.from} to={wk.workItem.to} task={wk.workItem.taskAndResponsibility} parentFunction={deleteData} jobseekerID={loginId} login={login} />
              ))
        }else{
          return (<Typography variant="body2" color="textSecondary" component="p" style={{paddingBottom:"10px"}}>Work experience details not added.</Typography>)
        }
    }else{
      return (<Typography variant="body2" color="textSecondary" component="p" style={{paddingBottom:"10px"}}>Work experience details not added.</Typography>)
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
          {login ? 
          <>
            <Button className={classes.defaultButton} style={{ float: 'right',marginRight: '0px',backgroundColor:'white'}}>
              <AddIcon style={{color: theme.palette.tuftsBlue,}} className={classes.editIcon} onClick={handleOpen} />
          </Button>
          </> : null}
        </Grid>

        {/*-------------- add new work popup content ------------------- */}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" style={{color:theme.palette.stateBlue}}>
          Add Work Experience
          </DialogTitle>
          <Divider variant="middle" />
          <DialogContent>
            <form className={classes.form}>
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
              </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} style={{color:"#999"}}>
              Cancel
            </Button>
            <Button onClick={onSubmit} color="primary" autoFocus>
              Save
            </Button>
          </DialogActions>
        </Dialog>         
      </Grid>
      {displayWork()}
    </FloatCard>
    </>
  );
}

export default WorkExperience
