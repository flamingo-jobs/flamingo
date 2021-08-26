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
import MoreVertIcon from '@material-ui/icons/MoreVert';
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
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 25,
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
      backgroundColor: theme.palette.stateBlueHover,
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
}));

function WorkExpItem(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [styleEdit, setStyleEdit] = useState({display: 'none'});
  let workStartDate=[0,0];
  let workEndDate=[0,0];
  if(props.from !== 'null/null' && props.from !== '0/0'){
    workStartDate = props.from.split("/");
  }
  if(props.to !== 'null/null' && props.to !== '0/0'){
    workEndDate = props.to.split("/");
  }
  const [state, setState] = useState({place: props.place, description: props.description, position: props.position, startYear: workStartDate[1], startMonth: workStartDate[0], endYear: workEndDate[1], endMonth: workEndDate[0], taskAndResponsibility: props.task});

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [alertData, setAlertData] = useState({severity: "", msg: ""});
  const [loading, setLoading] = useState(true);
  const [alertShow, setAlertShow] = React.useState(false);
  const index = props.index;
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
    props.parentFunction(index)
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
    const work = {
      place: state.place,
      description: state.description,
      position: state.position,
      from: state.startMonth+"/"+state.startYear,
      to: state.endMonth+"/"+state.endYear,
      taskAndResponsibility: state.taskAndResponsibility,
  }

    axios.put(`${BACKEND_URL}/jobseeker/updateWork/${loginId}`,{index:props.index,work:work})
    .then(res => {
      if(res.data.success){
        setAlertData({
          severity: "success",
          msg: "Work updated successfully!",
        });
        handleAlert();
      } else {
        setAlertData({
          severity: "error",
          msg: "Work could not be updated!",
        });
        handleAlert();
      }
    });
    handleClose();
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
        <Grid container spacing={3}>
          <Grid item xs={3} style={{marginTop:"-2px"}}>
            <Typography variant="body2" color="textSecondary" component="p" style={{textAlign:'left',marginLeft: "5px"}}>
                {state.startYear ? state.startMonth+"/"+state.startYear+ " - " +state.endMonth+"/"+state.endYear : ""}
            </Typography>
          </Grid>
          <Grid item xs={8} style={{marginTop:"-5px"}}>
            <Typography gutterBottom style={{textAlign:'left',fontSize:'16px',fontWeight:'bold',color:'#666'}}>
                {state.position}
            </Typography>
            <Typography gutterBottom style={{color: theme.palette.stateBlue,textAlign:'left',fontSize:'14px',fontWeight:'bold',}}>
                {state.place}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{textAlign:'left',paddingTop:'10px',marginRight:"-60px"}}>
                {state.description}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{textAlign:'left',paddingTop:'10px',marginRight:"-60px"}}>
              {state.taskAndResponsibility ? "Tasks & Responsibilities : " + state.taskAndResponsibility : ""}
            </Typography>
          </Grid>
          <Grid item xs={1} style={{marginTop:"-5px",padding:"20px 0px 0px 0px"}}>
            {
            login===true ?
              <>
              <Button style={{minWidth:'25px',width:'25px'}}>
                <MoreVertIcon className={classes.editIcon} size="small" style={{color:"#999"}} />
              </Button>
            {/* <Button style={{minWidth:'25px',width:'25px',marginRight:"10px"}}>
                <EditIcon style={styleEdit} className={classes.editIcon} size="small" onClick={handleOpen} />
            </Button>
            <Button style={{minWidth:'25px',width:'25px',marginRight:'-50px'}}>
                <DeleteIcon style={styleEdit} className={classes.editIcon} size="small"  onClick={handleClickOpen} />
            </Button> */}
            </> : null
            }
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
            {/*-------------- add new volunteer field popup content ------------------- */}
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
                    <Grid container direction="row">
                      <Grid item xs={10}>
                        <Typography gutterBottom variant="h5" style={{textAlign:'center',paddingLeft:'50px',color:theme.palette.stateBlue}}>
                          Edit Work Experience
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
                  <form className={classes.form}  onSubmit={onSubmit}>
                    <div>
                      <TextField
                        className={classes.field}
                        id="outlined-basic"
                        label="Position"
                        type="text"
                        variant="outlined"
                        size="small"
                        value={state.position}
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
                        value={state.place}
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
                                value={state.startYear}
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
                                value={state.startMonth}
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
                                value={state.endYear}
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
                                value={state.endMonth}
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
                        value={state.description}
                        onChange= {onChangeDescription}
                      />
                      <TextField
                        className={classes.field}
                        id="outlined-multiline-static"
                        label="Tasks & Responsibilities"
                        multiline
                        rows={5}
                        variant="outlined"
                        value={state.taskAndResponsibility}
                        onChange= {onChangeTask}
                      />
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

export default WorkExpItem
