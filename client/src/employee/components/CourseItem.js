import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SnackBarAlert from "../../components/SnackBarAlert";
import BACKEND_URL from '../../Config';
import theme from '../../Theme';


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
      backgroundColor: '#0088cc',
      color: 'white',
    }
  },
  editIcon: {
    padding:'0px',
    margin:'-15px',
    color: theme.palette.tuftsBlue,
    "&:hover": {
      backgroundColor: theme.palette.lightSkyBlue,
      borderRadius: "100%"
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
  },
  item: {
    color: "#666",
    padding: "10px 20px"
  }
}));

function CourseItem(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [styleEdit, setStyleEdit] = useState({display: 'none'});
  let courseStartDate=[0,0];
  let courseEndDate=[0,0];
  if(props.startDate !== 'null/null' && props.startDate !== '0/0'){
    courseStartDate = props.startDate.split("/");
  }
  if(props.endDate !== 'null/null' && props.endDate !== '0/0'){
    courseEndDate = props.endDate.split("/");
  }
  const [state, setState] = useState({course: props.course, institute: props.institute, startYear: courseStartDate[1], startMonth: courseStartDate[0], endYear: courseEndDate[1], endMonth: courseEndDate[0]});

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [alertShow, setAlertShow] = React.useState(false);
  const [alertData, setAlertData] = React.useState({ severity: "", msg: "" });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const index = props.index;
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
    handleMenuClose();
  };

  const handleClickClose = () => {
    setConfirmDelete(false);
  };

  function handleOpen(){
    setOpen(true);
    handleMenuClose();
  }

  function handleClose(){
    setOpen(false);
  }

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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
  function onChangeCourse(e){
    setState(prevState => {
      return {...prevState, course: e.target.value}
    })
  }

  function onChangeInstitute(e){
    setState(prevState => {
      return {...prevState, institute: e.target.value}
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


  function onSubmit(e){
    e.preventDefault();
    const course = {
        course: state.course,
        institute: state.institute,
        from: state.startMonth+"/"+state.startYear,
        to: state.endMonth+"/"+state.endYear,
    }

    axios.put(`${BACKEND_URL}/jobseeker/updateCourse/${loginId}`,{index:props.index,course:course})
    .then(res => {
      if(res.data.success){
        setAlertData({
          severity: "success",
          msg: "Course updated successfully!",
        });
        handleAlert();
        axios.get(`${BACKEND_URL}/jobs/generateJobSeekerRecommendations/${loginId}`);
      } else {
        setAlertData({
          severity: "error",
          msg: "Course could not be updated!",
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
        <Grid item xs={1}>
        <ImportContactsIcon style={{color: "#cc99ff",}} />
        </Grid>
        <Grid item xs={10}>
            <Typography gutterBottom style={{textAlign:'left',fontSize:'16px',fontWeight:'bold',color:'#666'}}>
                {state.course}
            </Typography>
            <Typography gutterBottom style={{color: theme.palette.stateBlue,textAlign:'left',fontSize:'14px',fontWeight:'bold',}}>
                {state.institute}
            </Typography>
            <Typography gutterBottom color="textSecondary" style={{textAlign:'left',fontSize:'15px',marginRight:"-50px"}}>
                {state.description}
            </Typography>
            <Typography variant="body2" color="textSecondary" style={{textAlign:'left'}}>
                {state.startMonth===0 ? "" : state.startMonth+"/"+state.startYear+ " - " +state.endMonth+"/"+state.endYear}
            </Typography>
        </Grid>
        <Grid item xs={1} style={{padding:"15px 0px 0px 0px"}}>
          { login ? <>
            <Button style={{minWidth:'25px',width:'25px'}}>
              <MoreVertIcon className={classes.editIcon} size="small" style={{color:"#999"}} onClick={handleMenuClick} />
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem className={classes.item} onClick={handleOpen}><EditIcon style={{marginRight:"7px"}} />Change</MenuItem>
            <MenuItem className={classes.item} onClick={handleClickOpen}><DeleteIcon style={{marginRight:"7px"}} />Remove</MenuItem>
          </Menu>
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
            {/*-------------- update course popup content ------------------- */}
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title" style={{color:theme.palette.stateBlue}}>
              Edit Course Details
              </DialogTitle>
              <Divider variant="middle" />
              <DialogContent>
                <form className={classes.form}>
                <div>
                <TextField
                  className={classes.field}
                    id="outlined-basic"
                    label="Course Name"
                    type="text"
                    variant="outlined"
                    size="small"
                    value={state.course}
                    onChange={onChangeCourse}
                    required
                  />
                  <TextField
                  className={classes.field}
                    id="outlined-basic"
                    label="Institute"
                    type="text"
                    variant="outlined"
                    size="small"
                    value={state.institute}
                    onChange={onChangeInstitute}
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
       </Grid>
      </Paper>
      </>
  );
}

export default CourseItem
